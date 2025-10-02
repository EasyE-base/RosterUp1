import { NextRequest, NextResponse } from 'next/server';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { stripe } from '@/lib/stripe';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const supabase = createServerComponentClient({ cookies });
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { orgId } = await req.json();

    // Verify user is admin of this org
    const { data: isAdmin } = await supabase
      .from('team_admins')
      .select('teams!inner(org_id)')
      .eq('user_id', user.id)
      .eq('teams.org_id', orgId)
      .eq('role', 'admin')
      .limit(1)
      .single();

    if (!isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    // Check if org already has a Stripe account
    const { data: existingAccount } = await supabase
      .from('org_stripe_accounts')
      .select('*')
      .eq('org_id', orgId)
      .maybeSingle();

    let account;
    if (existingAccount?.account_id) {
      // Retrieve existing account
      account = await stripe.accounts.retrieve(existingAccount.account_id);
    } else {
      // Get org details
      const { data: org } = await supabase
        .from('orgs')
        .select('name')
        .eq('id', orgId)
        .single();

      // Get user profile
      const { data: profile } = await supabase
        .from('profiles')
        .select('full_name')
        .eq('id', user.id)
        .single();

      // Create new Express account
      account = await stripe.accounts.create({
        type: 'express',
        country: 'US',
        email: user.email,
        capabilities: {
          card_payments: { requested: true },
          transfers: { requested: true }
        },
        business_profile: {
          name: org?.name || 'Sports Organization',
        },
        metadata: {
          org_id: orgId,
          created_by: user.id
        }
      });

      // Save account to database
      await supabase
        .from('org_stripe_accounts')
        .upsert({
          org_id: orgId,
          account_id: account.id,
          details_submitted: false,
          charges_enabled: false,
          payouts_enabled: false
        });
    }

    // Create account link for onboarding
    const accountLink = await stripe.accountLinks.create({
      account: account.id,
      refresh_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/orgs/${orgId}?tab=settings&stripe=refresh`,
      return_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/orgs/${orgId}?tab=settings&stripe=success`,
      type: 'account_onboarding'
    });

    return NextResponse.json({ url: accountLink.url });
  } catch (error: any) {
    console.error('Stripe Connect error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create Stripe account' },
      { status: 500 }
    );
  }
}

// Get account status
export async function GET(req: NextRequest) {
  try {
    const supabase = createServerComponentClient({ cookies });
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const orgId = searchParams.get('orgId');

    if (!orgId) {
      return NextResponse.json({ error: 'Org ID required' }, { status: 400 });
    }

    // Get Stripe account
    const { data: stripeAccount } = await supabase
      .from('org_stripe_accounts')
      .select('*')
      .eq('org_id', orgId)
      .maybeSingle();

    if (!stripeAccount?.account_id) {
      return NextResponse.json({ connected: false });
    }

    // Get latest status from Stripe
    const account = await stripe.accounts.retrieve(stripeAccount.account_id);

    // Update database with latest status
    await supabase
      .from('org_stripe_accounts')
      .update({
        details_submitted: account.details_submitted,
        charges_enabled: account.charges_enabled,
        payouts_enabled: account.payouts_enabled,
        requirements_due: account.requirements?.currently_due || []
      })
      .eq('org_id', orgId);

    return NextResponse.json({
      connected: true,
      account: {
        id: account.id,
        details_submitted: account.details_submitted,
        charges_enabled: account.charges_enabled,
        payouts_enabled: account.payouts_enabled,
        requirements_due: account.requirements?.currently_due || []
      }
    });
  } catch (error: any) {
    console.error('Stripe status error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to get account status' },
      { status: 500 }
    );
  }
}
