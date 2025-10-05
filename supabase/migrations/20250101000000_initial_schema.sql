-- RosterUp Database Schema v1
-- Run this in Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Profiles (extends auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT CHECK (role IN ('parent', 'coach', 'admin', 'super_admin')) DEFAULT 'parent',
  full_name TEXT,
  avatar_url TEXT,
  city TEXT,
  state TEXT,
  postal_code TEXT,
  quiet_hours_start TIME,
  quiet_hours_end TIME,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Sports master data
CREATE TABLE IF NOT EXISTS public.sports (
  id BIGSERIAL PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  icon_url TEXT
);

-- Positions per sport
CREATE TABLE IF NOT EXISTS public.positions (
  id BIGSERIAL PRIMARY KEY,
  sport_id BIGINT NOT NULL REFERENCES public.sports(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  abbreviation TEXT,
  sort_order INT DEFAULT 0
);

-- Kids
CREATE TABLE IF NOT EXISTS public.kids (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  parent_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  birthdate DATE,
  grade INT,
  bio TEXT,
  photo_url TEXT,
  jersey_size TEXT,
  show_last_name BOOLEAN DEFAULT true,
  show_birthdate BOOLEAN DEFAULT false,
  show_grade BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Kid sports and positions
CREATE TABLE IF NOT EXISTS public.kid_sports (
  kid_id UUID REFERENCES public.kids(id) ON DELETE CASCADE,
  sport_id BIGINT REFERENCES public.sports(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (kid_id, sport_id)
);

CREATE TABLE IF NOT EXISTS public.kid_positions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  kid_id UUID NOT NULL REFERENCES public.kids(id) ON DELETE CASCADE,
  sport_id BIGINT NOT NULL REFERENCES public.sports(id) ON DELETE CASCADE,
  position_id BIGINT NOT NULL REFERENCES public.positions(id) ON DELETE CASCADE,
  preference_order INT DEFAULT 1,
  UNIQUE(kid_id, sport_id, position_id)
);

-- Organizations
CREATE TABLE IF NOT EXISTS public.orgs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE,
  logo_url TEXT,
  website_url TEXT,
  refund_window_days INT DEFAULT 7,
  refund_policy_text TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Teams
CREATE TABLE IF NOT EXISTS public.teams (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID NOT NULL REFERENCES public.orgs(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  sport_id BIGINT NOT NULL REFERENCES public.sports(id) ON DELETE CASCADE,
  city TEXT,
  state TEXT,
  home_field_address TEXT,
  logo_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Seasons
CREATE TABLE IF NOT EXISTS public.seasons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id UUID NOT NULL REFERENCES public.teams(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  starts_on DATE,
  ends_on DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Team admins and roles
CREATE TABLE IF NOT EXISTS public.team_admins (
  team_id UUID REFERENCES public.teams(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  role TEXT CHECK (role IN ('coach', 'admin', 'editor', 'finance')) DEFAULT 'coach',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (team_id, user_id)
);

-- Roster spots / listings
CREATE TABLE IF NOT EXISTS public.roster_spots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id UUID NOT NULL REFERENCES public.teams(id) ON DELETE CASCADE,
  season_id UUID REFERENCES public.seasons(id) ON DELETE CASCADE,
  position_id BIGINT REFERENCES public.positions(id),
  title TEXT NOT NULL,
  description TEXT,
  min_age INT,
  max_age INT,
  min_grade INT,
  max_grade INT,
  capacity INT,
  deadline TIMESTAMPTZ,
  visibility TEXT CHECK (visibility IN ('public', 'invite')) DEFAULT 'public',
  status TEXT CHECK (status IN ('open', 'closed')) DEFAULT 'open',
  fee_cents INT CHECK (fee_cents IS NULL OR fee_cents >= 0),
  currency TEXT DEFAULT 'usd',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Applications
CREATE TABLE IF NOT EXISTS public.applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  roster_spot_id UUID NOT NULL REFERENCES public.roster_spots(id) ON DELETE CASCADE,
  kid_id UUID NOT NULL REFERENCES public.kids(id) ON DELETE CASCADE,
  parent_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  note TEXT,
  status TEXT CHECK (status IN ('draft', 'submitted', 'in_review', 'accepted', 'waitlisted', 'rejected', 'withdrawn')) DEFAULT 'submitted',
  payment_status TEXT CHECK (payment_status IN ('not_required', 'pending', 'paid', 'refunded')),
  stripe_payment_intent_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Offers
CREATE TABLE IF NOT EXISTS public.offers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id UUID UNIQUE NOT NULL REFERENCES public.applications(id) ON DELETE CASCADE,
  status TEXT CHECK (status IN ('pending', 'accepted', 'declined', 'expired')) DEFAULT 'pending',
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  accepted_at TIMESTAMPTZ,
  declined_at TIMESTAMPTZ
);

-- Conversations
CREATE TABLE IF NOT EXISTS public.conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id UUID UNIQUE NOT NULL REFERENCES public.applications(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Messages
CREATE TABLE IF NOT EXISTS public.messages (
  id BIGSERIAL PRIMARY KEY,
  conversation_id UUID NOT NULL REFERENCES public.conversations(id) ON DELETE CASCADE,
  sender_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  attachments JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Mini-sites
CREATE TABLE IF NOT EXISTS public.team_sites (
  team_id UUID PRIMARY KEY REFERENCES public.teams(id) ON DELETE CASCADE,
  custom_domain TEXT,
  primary_color TEXT DEFAULT '#3B82F6',
  secondary_color TEXT DEFAULT '#1E40AF',
  font_family TEXT DEFAULT 'Inter',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.site_pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id UUID NOT NULL REFERENCES public.teams(id) ON DELETE CASCADE,
  slug TEXT NOT NULL,
  title TEXT NOT NULL,
  status TEXT CHECK (status IN ('draft', 'published')) DEFAULT 'draft',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(team_id, slug)
);

CREATE TABLE IF NOT EXISTS public.page_blocks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_id UUID NOT NULL REFERENCES public.site_pages(id) ON DELETE CASCADE,
  idx INT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('hero', 'roster', 'schedule', 'achievements', 'shop', 'text', 'image', 'cta')),
  data JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Stripe accounts (org-level)
CREATE TABLE IF NOT EXISTS public.org_stripe_accounts (
  org_id UUID PRIMARY KEY REFERENCES public.orgs(id) ON DELETE CASCADE,
  account_id TEXT NOT NULL UNIQUE,
  details_submitted BOOLEAN DEFAULT false,
  charges_enabled BOOLEAN DEFAULT false,
  payouts_enabled BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Products (for merch/donations later)
CREATE TABLE IF NOT EXISTS public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID NOT NULL REFERENCES public.orgs(id) ON DELETE CASCADE,
  team_id UUID REFERENCES public.teams(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  price_cents INT NOT NULL CHECK (price_cents >= 0),
  currency TEXT DEFAULT 'usd',
  image_url TEXT,
  type TEXT CHECK (type IN ('merch', 'donation', 'registration')) DEFAULT 'merch',
  active BOOLEAN DEFAULT true,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Orders
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID NOT NULL REFERENCES public.orgs(id) ON DELETE CASCADE,
  buyer_id UUID REFERENCES public.profiles(id),
  buyer_email TEXT,
  amount_cents INT NOT NULL,
  fee_cents INT DEFAULT 0,
  currency TEXT DEFAULT 'usd',
  stripe_payment_intent_id TEXT UNIQUE,
  status TEXT CHECK (status IN ('created', 'processing', 'paid', 'failed', 'refunded', 'partial_refund')) DEFAULT 'created',
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Analytics events
CREATE TABLE IF NOT EXISTS public.analytics_events (
  id BIGSERIAL PRIMARY KEY,
  team_id UUID REFERENCES public.teams(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.profiles(id),
  session_id TEXT,
  event TEXT NOT NULL,
  payload JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_kids_parent_id ON public.kids(parent_id);
CREATE INDEX IF NOT EXISTS idx_teams_org_id ON public.teams(org_id);
CREATE INDEX IF NOT EXISTS idx_roster_spots_team_id ON public.roster_spots(team_id);
CREATE INDEX IF NOT EXISTS idx_roster_spots_status ON public.roster_spots(status);
CREATE INDEX IF NOT EXISTS idx_applications_roster_spot_id ON public.applications(roster_spot_id);
CREATE INDEX IF NOT EXISTS idx_applications_kid_id ON public.applications(kid_id);
CREATE INDEX IF NOT EXISTS idx_applications_status ON public.applications(status);
CREATE INDEX IF NOT EXISTS idx_messages_conversation_id ON public.messages(conversation_id);
CREATE INDEX IF NOT EXISTS idx_analytics_events_team_id ON public.analytics_events(team_id);
CREATE INDEX IF NOT EXISTS idx_analytics_events_created_at ON public.analytics_events(created_at);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.kids ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.kid_sports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.kid_positions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orgs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.seasons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_admins ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.roster_spots ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.offers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_sites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.page_blocks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.org_stripe_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Profiles: users can read their own, coaches/admins can read team members
CREATE POLICY "profiles_read_own" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "profiles_update_own" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Kids: parents manage their own
CREATE POLICY "kids_parent_all" ON public.kids
  FOR ALL USING (auth.uid() = parent_id)
  WITH CHECK (auth.uid() = parent_id);

-- Teams: public read
CREATE POLICY "teams_public_read" ON public.teams
  FOR SELECT USING (true);

-- Team admins: team admins can manage
CREATE POLICY "team_admins_read" ON public.team_admins
  FOR SELECT USING (
    auth.uid() = user_id OR
    EXISTS (
      SELECT 1 FROM public.team_admins ta
      WHERE ta.user_id = auth.uid() AND ta.team_id = team_admins.team_id
    )
  );

CREATE POLICY "team_admins_manage" ON public.team_admins
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.team_admins ta
      WHERE ta.user_id = auth.uid() 
      AND ta.team_id = team_admins.team_id
      AND ta.role IN ('admin', 'coach')
    )
  );

-- Roster spots: public read
CREATE POLICY "roster_spots_public_read" ON public.roster_spots
  FOR SELECT USING (status = 'open' AND visibility = 'public');

CREATE POLICY "roster_spots_team_manage" ON public.roster_spots
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.team_admins ta
      WHERE ta.user_id = auth.uid() 
      AND ta.team_id = roster_spots.team_id
    )
  );

-- Applications: parents create/read own, coaches read team's
CREATE POLICY "applications_parent_create" ON public.applications
  FOR INSERT WITH CHECK (auth.uid() = parent_id);

CREATE POLICY "applications_read" ON public.applications
  FOR SELECT USING (
    auth.uid() = parent_id OR
    EXISTS (
      SELECT 1 FROM public.team_admins ta
      JOIN public.roster_spots rs ON rs.team_id = ta.team_id
      WHERE ta.user_id = auth.uid() AND rs.id = applications.roster_spot_id
    )
  );

CREATE POLICY "applications_coaches_update" ON public.applications
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.team_admins ta
      JOIN public.roster_spots rs ON rs.team_id = ta.team_id
      WHERE ta.user_id = auth.uid() AND rs.id = applications.roster_spot_id
    )
  );

-- Messages: participants only
CREATE POLICY "messages_participants" ON public.messages
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.conversations c
      JOIN public.applications a ON a.id = c.application_id
      JOIN public.roster_spots rs ON rs.id = a.roster_spot_id
      LEFT JOIN public.team_admins ta ON ta.team_id = rs.team_id AND ta.user_id = auth.uid()
      WHERE c.id = messages.conversation_id
      AND (a.parent_id = auth.uid() OR ta.user_id IS NOT NULL)
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.conversations c
      JOIN public.applications a ON a.id = c.application_id
      JOIN public.roster_spots rs ON rs.id = a.roster_spot_id
      LEFT JOIN public.team_admins ta ON ta.team_id = rs.team_id AND ta.user_id = auth.uid()
      WHERE c.id = messages.conversation_id
      AND (a.parent_id = auth.uid() OR ta.user_id IS NOT NULL)
    )
  );

-- Analytics: teams write their own
CREATE POLICY "analytics_team_write" ON public.analytics_events
  FOR INSERT WITH CHECK (
    team_id IS NULL OR
    EXISTS (
      SELECT 1 FROM public.team_admins ta
      WHERE ta.user_id = auth.uid() AND ta.team_id = analytics_events.team_id
    )
  );

-- Functions and Triggers

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Auto-create conversation on application
CREATE OR REPLACE FUNCTION public.handle_new_application()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'submitted' THEN
    INSERT INTO public.conversations (application_id)
    VALUES (NEW.id)
    ON CONFLICT (application_id) DO NOTHING;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS on_application_submitted ON public.applications;
CREATE TRIGGER on_application_submitted
  AFTER INSERT OR UPDATE OF status ON public.applications
  FOR EACH ROW
  WHEN (NEW.status = 'submitted')
  EXECUTE FUNCTION public.handle_new_application();

-- Handle offer acceptance (withdraw other offers)
CREATE OR REPLACE FUNCTION public.handle_offer_accept()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'accepted' AND OLD.status != 'accepted' THEN
    -- Mark other pending offers for same kid in same season as declined
    UPDATE public.offers o
    SET status = 'declined', declined_at = NOW()
    FROM public.applications a2
    JOIN public.applications a1 ON a1.id = NEW.application_id
    JOIN public.roster_spots rs1 ON rs1.id = a1.roster_spot_id
    JOIN public.roster_spots rs2 ON rs2.id = a2.roster_spot_id
    WHERE o.application_id = a2.id
      AND a2.kid_id = a1.kid_id
      AND o.status = 'pending'
      AND a2.id != a1.id
      AND rs2.season_id = rs1.season_id;
    
    -- Withdraw applications with declined offers
    UPDATE public.applications a
    SET status = 'withdrawn', updated_at = NOW()
    FROM public.offers o
    WHERE o.application_id = a.id
      AND o.status = 'declined'
      AND a.status = 'accepted';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_offer_accept ON public.offers;
CREATE TRIGGER trg_offer_accept
  AFTER UPDATE OF status ON public.offers
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_offer_accept();

-- Auto-close listings function (to be called by cron)
CREATE OR REPLACE FUNCTION public.auto_close_listings()
RETURNS void AS $$
BEGIN
  -- Close listings past deadline
  UPDATE public.roster_spots
  SET status = 'closed', updated_at = NOW()
  WHERE status = 'open'
    AND deadline IS NOT NULL 
    AND NOW() > deadline;
  
  -- Close listings at capacity
  UPDATE public.roster_spots rs
  SET status = 'closed', updated_at = NOW()
  WHERE status = 'open'
    AND capacity IS NOT NULL
    AND (
      SELECT COUNT(*) 
      FROM public.applications a
      JOIN public.offers o ON o.application_id = a.id
      WHERE a.roster_spot_id = rs.id
        AND o.status = 'accepted'
    ) >= capacity;
END;
$$ LANGUAGE plpgsql;

-- Expire offers function (to be called by cron)
CREATE OR REPLACE FUNCTION public.expire_offers()
RETURNS void AS $$
BEGIN
  UPDATE public.offers
  SET status = 'expired'
  WHERE status = 'pending'
    AND NOW() > expires_at;
END;
$$ LANGUAGE plpgsql;

-- Seed initial sports data
INSERT INTO public.sports (slug, name) VALUES
  ('baseball', 'Baseball'),
  ('softball', 'Softball'),
  ('soccer', 'Soccer'),
  ('basketball', 'Basketball'),
  ('volleyball', 'Volleyball'),
  ('lacrosse', 'Lacrosse'),
  ('hockey', 'Hockey'),
  ('football', 'Football')
ON CONFLICT (slug) DO NOTHING;

-- Seed some common positions
INSERT INTO public.positions (sport_id, name, abbreviation, sort_order)
SELECT s.id, p.name, p.abbr, p.sort
FROM public.sports s
CROSS JOIN LATERAL (
  VALUES 
    -- Baseball/Softball
    ('baseball', 'Pitcher', 'P', 1),
    ('baseball', 'Catcher', 'C', 2),
    ('baseball', 'First Base', '1B', 3),
    ('baseball', 'Second Base', '2B', 4),
    ('baseball', 'Third Base', '3B', 5),
    ('baseball', 'Shortstop', 'SS', 6),
    ('baseball', 'Left Field', 'LF', 7),
    ('baseball', 'Center Field', 'CF', 8),
    ('baseball', 'Right Field', 'RF', 9),
    ('softball', 'Pitcher', 'P', 1),
    ('softball', 'Catcher', 'C', 2),
    ('softball', 'First Base', '1B', 3),
    ('softball', 'Second Base', '2B', 4),
    ('softball', 'Third Base', '3B', 5),
    ('softball', 'Shortstop', 'SS', 6),
    ('softball', 'Left Field', 'LF', 7),
    ('softball', 'Center Field', 'CF', 8),
    ('softball', 'Right Field', 'RF', 9),
    -- Soccer
    ('soccer', 'Goalkeeper', 'GK', 1),
    ('soccer', 'Defender', 'DEF', 2),
    ('soccer', 'Midfielder', 'MID', 3),
    ('soccer', 'Forward', 'FWD', 4),
    -- Basketball
    ('basketball', 'Point Guard', 'PG', 1),
    ('basketball', 'Shooting Guard', 'SG', 2),
    ('basketball', 'Small Forward', 'SF', 3),
    ('basketball', 'Power Forward', 'PF', 4),
    ('basketball', 'Center', 'C', 5)
) AS p(sport, name, abbr, sort)
WHERE s.slug = p.sport
ON CONFLICT DO NOTHING;
