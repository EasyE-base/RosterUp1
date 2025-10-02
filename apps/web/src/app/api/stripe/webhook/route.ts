import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { stripe } from '@/lib/stripe';
import { createClient } from '@supabase/supabase-js';

// Force dynamic rendering - don't try to prerender this API route
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// Helper to get Supabase admin client
function getSupabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { auth: { persistSession: false } }
  );
}

export async function POST(req: NextRequest) {
  const supabaseAdmin = getSupabaseAdmin();
  const body = await req.text();
  const signature = headers().get('stripe-signature');

  if (!signature) {
    return NextResponse.json({ error: 'No signature' }, { status: 400 });
  }

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  try {
    switch (event.type) {
      case 'account.updated': {
        const account = event.data.object as any;
        
        // Update account status in database
        await supabaseAdmin
          .from('org_stripe_accounts')
          .update({
            details_submitted: account.details_submitted,
            charges_enabled: account.charges_enabled,
            payouts_enabled: account.payouts_enabled,
            requirements_due: account.requirements?.currently_due || []
          })
          .eq('account_id', account.id);
        
        console.log('Updated Stripe account:', account.id);
        break;
      }

      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object as any;
        
        // Update order status
        await supabaseAdmin
          .from('orders')
          .update({
            status: 'succeeded',
            stripe_metadata: paymentIntent
          })
          .eq('stripe_payment_intent_id', paymentIntent.id);

        // If this is an application fee, update the application
        const applicationId = paymentIntent.metadata?.application_id;
        if (applicationId) {
          await supabaseAdmin
            .from('applications')
            .update({ fee_paid: true })
            .eq('id', applicationId);
        }
        
        console.log('Payment succeeded:', paymentIntent.id);
        break;
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as any;
        
        await supabaseAdmin
          .from('orders')
          .update({
            status: 'failed',
            stripe_metadata: paymentIntent
          })
          .eq('stripe_payment_intent_id', paymentIntent.id);
        
        console.log('Payment failed:', paymentIntent.id);
        break;
      }

      case 'charge.refunded': {
        const charge = event.data.object as any;
        
        // Find order by payment intent
        const { data: order } = await supabaseAdmin
          .from('orders')
          .select('id')
          .eq('stripe_payment_intent_id', charge.payment_intent)
          .single();

        if (order) {
          await supabaseAdmin
            .from('orders')
            .update({
              status: 'refunded',
              refunded_at: new Date().toISOString()
            })
            .eq('id', order.id);
        }
        
        console.log('Charge refunded:', charge.id);
        break;
      }

      case 'transfer.created':
      case 'transfer.updated': {
        // Log transfers for debugging
        const transfer = event.data.object as any;
        console.log('Transfer event:', transfer.id, transfer.amount);
        break;
      }

      case 'payout.created':
      case 'payout.updated':
      case 'payout.paid':
      case 'payout.failed': {
        // Log payouts for monitoring
        const payout = event.data.object as any;
        console.log('Payout event:', event.type, payout.id, payout.amount);
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error('Webhook processing error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
}

// Stripe requires raw body for webhook verification
export const runtime = 'nodejs';
