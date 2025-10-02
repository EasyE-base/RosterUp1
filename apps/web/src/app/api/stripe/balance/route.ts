import { NextRequest, NextResponse } from 'next/server';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { stripe } from '@/lib/stripe';

export const dynamic = 'force-dynamic';

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

    // Verify user is admin/finance of this org
    const { data: isAuthorized } = await supabase
      .from('team_admins')
      .select('teams!inner(org_id)')
      .eq('user_id', user.id)
      .eq('teams.org_id', orgId)
      .in('role', ['admin', 'finance'])
      .limit(1)
      .single();

    if (!isAuthorized) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    // Get Stripe account
    const { data: stripeAccount } = await supabase
      .from('org_stripe_accounts')
      .select('account_id')
      .eq('org_id', orgId)
      .single();

    if (!stripeAccount?.account_id) {
      return NextResponse.json({ 
        balance: { available: 0, pending: 0 },
        payouts: [],
        transactions: []
      });
    }

    // Get balance
    const balance = await stripe.balance.retrieve({
      stripeAccount: stripeAccount.account_id
    });

    // Get recent payouts
    const payouts = await stripe.payouts.list(
      { limit: 10 },
      { stripeAccount: stripeAccount.account_id }
    );

    // Get recent transactions from orders
    const { data: transactions } = await supabase
      .from('orders')
      .select('*')
      .eq('org_id', orgId)
      .eq('status', 'succeeded')
      .order('created_at', { ascending: false })
      .limit(20);

    // Format balance amounts
    const formattedBalance = {
      available: balance.available.reduce((sum, b) => sum + b.amount, 0) / 100,
      pending: balance.pending.reduce((sum, b) => sum + b.amount, 0) / 100,
      currency: 'usd'
    };

    // Format payouts
    const formattedPayouts = payouts.data.map(payout => ({
      id: payout.id,
      amount: payout.amount / 100,
      currency: payout.currency,
      arrival_date: new Date(payout.arrival_date * 1000).toISOString(),
      status: payout.status,
      type: payout.type
    }));

    return NextResponse.json({
      balance: formattedBalance,
      payouts: formattedPayouts,
      transactions: transactions || []
    });
  } catch (error: any) {
    console.error('Balance error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to get balance' },
      { status: 500 }
    );
  }
}
