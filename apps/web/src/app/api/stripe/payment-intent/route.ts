import { NextRequest, NextResponse } from 'next/server';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { stripe, PLATFORM_FEE_BPS } from '@/lib/stripe';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const supabase = createServerComponentClient({ cookies });
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { listingId, applicationId } = await req.json();

    // Get listing details
    const { data: listing, error: listingError } = await supabase
      .from('roster_spots')
      .select(`
        *,
        seasons!inner(
          *,
          teams!inner(
            *,
            orgs!inner(
              *,
              org_stripe_accounts!inner(*)
            )
          )
        )
      `)
      .eq('id', listingId)
      .single();

    if (listingError || !listing) {
      return NextResponse.json({ error: 'Listing not found' }, { status: 404 });
    }

    // Check if fee is required
    if (!listing.fee || listing.fee <= 0) {
      return NextResponse.json({ error: 'No fee required' }, { status: 400 });
    }

    // Get Stripe account
    const stripeAccount = listing.seasons.teams.orgs.org_stripe_accounts[0];
    if (!stripeAccount?.account_id || !stripeAccount.charges_enabled) {
      return NextResponse.json(
        { error: 'Organization is not set up to accept payments' },
        { status: 400 }
      );
    }

    // Calculate fees
    const amountInCents = Math.round(listing.fee * 100);
    const platformFee = Math.round(amountInCents * PLATFORM_FEE_BPS / 10000);

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency: 'usd',
      application_fee_amount: platformFee,
      transfer_data: {
        destination: stripeAccount.account_id,
      },
      metadata: {
        listing_id: listingId,
        application_id: applicationId,
        user_id: user.id,
        org_id: listing.seasons.teams.orgs.id,
        team_id: listing.seasons.teams.id,
        season_id: listing.seasons.id
      }
    });

    // Create order record
    const { error: orderError } = await supabase
      .from('orders')
      .insert({
        org_id: listing.seasons.teams.orgs.id,
        buyer_id: user.id,
        amount: listing.fee,
        currency: 'usd',
        stripe_payment_intent_id: paymentIntent.id,
        status: 'requires_payment_method',
        application_id: applicationId,
        order_type: 'application_fee',
        metadata: {
          listing_title: listing.title,
          team_name: listing.seasons.teams.name,
          season_name: listing.seasons.name
        }
      });

    if (orderError) {
      // Cancel payment intent if order creation fails
      await stripe.paymentIntents.cancel(paymentIntent.id);
      throw orderError;
    }

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      amount: listing.fee,
      platformFee: platformFee / 100
    });
  } catch (error: any) {
    console.error('Payment intent error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create payment intent' },
      { status: 500 }
    );
  }
}

// Get payment status
export async function GET(req: NextRequest) {
  try {
    const supabase = createServerComponentClient({ cookies });
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const applicationId = searchParams.get('applicationId');

    if (!applicationId) {
      return NextResponse.json({ error: 'Application ID required' }, { status: 400 });
    }

    // Check if payment exists for this application
    const { data: order } = await supabase
      .from('orders')
      .select('*')
      .eq('application_id', applicationId)
      .eq('buyer_id', user.id)
      .maybeSingle();

    return NextResponse.json({
      paid: order?.status === 'succeeded',
      order
    });
  } catch (error: any) {
    console.error('Payment status error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to get payment status' },
      { status: 500 }
    );
  }
}
