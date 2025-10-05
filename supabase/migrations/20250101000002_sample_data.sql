-- Insert sample data for testing

-- Create a sample organization
INSERT INTO public.orgs (id, name, slug, logo_url) VALUES
  ('00000000-0000-0000-0000-000000000001', 'Elite Youth Sports', 'elite-youth-sports', NULL)
ON CONFLICT DO NOTHING;

-- Create sample teams
INSERT INTO public.teams (id, org_id, name, sport_id, city, state, logo_url)
SELECT
  '00000000-0000-0000-0000-000000000011',
  '00000000-0000-0000-0000-000000000001',
  'Elite Thunder Baseball',
  s.id,
  'Los Angeles',
  'CA',
  NULL
FROM public.sports s WHERE s.slug = 'baseball'
ON CONFLICT DO NOTHING;

INSERT INTO public.teams (id, org_id, name, sport_id, city, state, logo_url)
SELECT
  '00000000-0000-0000-0000-000000000012',
  '00000000-0000-0000-0000-000000000001',
  'Thunder Basketball Academy',
  s.id,
  'Los Angeles',
  'CA',
  NULL
FROM public.sports s WHERE s.slug = 'basketball'
ON CONFLICT DO NOTHING;

INSERT INTO public.teams (id, org_id, name, sport_id, city, state, logo_url)
SELECT
  '00000000-0000-0000-0000-000000000013',
  '00000000-0000-0000-0000-000000000001',
  'LA Elite Soccer Club',
  s.id,
  'Los Angeles',
  'CA',
  NULL
FROM public.sports s WHERE s.slug = 'soccer'
ON CONFLICT DO NOTHING;

-- Create sample roster spots (open positions)
INSERT INTO public.roster_spots (id, team_id, position_id, title, description, min_age, max_age, capacity, status, visibility, fee_cents, currency)
SELECT
  '00000000-0000-0000-0000-000000000021',
  '00000000-0000-0000-0000-000000000011',
  p.id,
  'Starting Pitcher - 12U Travel Team',
  'Looking for a skilled pitcher to join our competitive 12U travel baseball team. We compete in tournaments across Southern California and have a winning tradition.',
  10,
  12,
  2,
  'open',
  'public',
  150000,
  'usd'
FROM public.positions p
JOIN public.sports s ON s.id = p.sport_id
WHERE s.slug = 'baseball' AND p.abbreviation = 'P'
LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO public.roster_spots (id, team_id, position_id, title, description, min_age, max_age, capacity, status, visibility, fee_cents, currency)
SELECT
  '00000000-0000-0000-0000-000000000022',
  '00000000-0000-0000-0000-000000000011',
  p.id,
  'Infielders Needed - 14U Elite Squad',
  'Elite 14U baseball team seeking talented infielders (2B, SS, 3B). High-level competition with college showcase opportunities.',
  12,
  14,
  3,
  'open',
  'public',
  200000,
  'usd'
FROM public.positions p
JOIN public.sports s ON s.id = p.sport_id
WHERE s.slug = 'baseball' AND p.abbreviation = 'SS'
LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO public.roster_spots (id, team_id, position_id, title, description, min_age, max_age, capacity, status, visibility, fee_cents, currency)
SELECT
  '00000000-0000-0000-0000-000000000023',
  '00000000-0000-0000-0000-000000000012',
  p.id,
  'Point Guard - 15U AAU Team',
  'Competitive AAU basketball team looking for a skilled point guard. We play in top-tier tournaments and focus on player development.',
  13,
  15,
  1,
  'open',
  'public',
  175000,
  'usd'
FROM public.positions p
JOIN public.sports s ON s.id = p.sport_id
WHERE s.slug = 'basketball' AND p.abbreviation = 'PG'
LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO public.roster_spots (id, team_id, position_id, title, description, min_age, max_age, capacity, status, visibility, fee_cents, currency)
SELECT
  '00000000-0000-0000-0000-000000000024',
  '00000000-0000-0000-0000-000000000013',
  p.id,
  'Midfielder - U14 Select Team',
  'Premier soccer club seeking creative midfielders for our U14 select team. Year-round training and competitive league play.',
  12,
  14,
  2,
  'open',
  'public',
  225000,
  'usd'
FROM public.positions p
JOIN public.sports s ON s.id = p.sport_id
WHERE s.slug = 'soccer' AND p.abbreviation = 'MID'
LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO public.roster_spots (id, team_id, position_id, title, description, min_age, max_age, capacity, status, visibility, fee_cents, currency)
SELECT
  '00000000-0000-0000-0000-000000000025',
  '00000000-0000-0000-0000-000000000013',
  p.id,
  'Goalkeeper - U16 Academy',
  'Top-tier soccer academy looking for dedicated goalkeeper. Professional coaching and pathway to college recruitment.',
  14,
  16,
  1,
  'open',
  'public',
  250000,
  'usd'
FROM public.positions p
JOIN public.sports s ON s.id = p.sport_id
WHERE s.slug = 'soccer' AND p.abbreviation = 'GK'
LIMIT 1
ON CONFLICT DO NOTHING;
