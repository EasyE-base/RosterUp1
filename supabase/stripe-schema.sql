-- Stripe Connect Schema Updates
-- Run this in Supabase SQL Editor after the main schema

-- Update org_stripe_accounts table with additional fields
ALTER TABLE public.org_stripe_accounts 
  ADD COLUMN IF NOT EXISTS charges_enabled BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS payouts_enabled BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS requirements_due JSONB DEFAULT '[]',
  ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT NOW(),
  ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

-- Update orders table with Stripe fields
ALTER TABLE public.orders 
  ADD COLUMN IF NOT EXISTS application_id UUID REFERENCES public.applications(id),
  ADD COLUMN IF NOT EXISTS order_type TEXT CHECK (order_type IN ('application_fee', 'product', 'donation')) DEFAULT 'application_fee';

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_orders_application_id ON public.orders(application_id);
CREATE INDEX IF NOT EXISTS idx_orders_stripe_payment_intent_id ON public.orders(stripe_payment_intent_id);
CREATE INDEX IF NOT EXISTS idx_org_stripe_accounts_account_id ON public.org_stripe_accounts(account_id);

-- RLS Policies for Stripe tables
-- Org admins can view their stripe account
CREATE POLICY "org_stripe_accounts_admin_read" ON public.org_stripe_accounts
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.teams t
      JOIN public.team_admins ta ON ta.team_id = t.id
      WHERE t.org_id = org_stripe_accounts.org_id
      AND ta.user_id = auth.uid()
      AND ta.role IN ('admin', 'finance')
    )
  );

-- Org admins can update their stripe account
CREATE POLICY "org_stripe_accounts_admin_update" ON public.org_stripe_accounts
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.teams t
      JOIN public.team_admins ta ON ta.team_id = t.id
      WHERE t.org_id = org_stripe_accounts.org_id
      AND ta.user_id = auth.uid()
      AND ta.role = 'admin'
    )
  );

-- Orders: parents can view their own, org admins can view org's orders
CREATE POLICY "orders_read" ON public.orders
  FOR SELECT USING (
    buyer_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM public.teams t
      JOIN public.team_admins ta ON ta.team_id = t.id
      WHERE t.org_id = orders.org_id
      AND ta.user_id = auth.uid()
      AND ta.role IN ('admin', 'finance')
    )
  );

-- Only system can create orders (via API)
CREATE POLICY "orders_create_system" ON public.orders
  FOR INSERT WITH CHECK (false);

-- Function to update timestamps
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add triggers for updated_at
DROP TRIGGER IF EXISTS update_org_stripe_accounts_updated_at ON public.org_stripe_accounts;
CREATE TRIGGER update_org_stripe_accounts_updated_at
  BEFORE UPDATE ON public.org_stripe_accounts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS update_orders_updated_at ON public.orders;
CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON public.orders
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();
