-- Allow public reads for teams, orgs, and roster spots so listings page works

-- Update teams policy to allow public reads
DROP POLICY IF EXISTS "teams_public_read" ON public.teams;
CREATE POLICY "teams_public_read" ON public.teams
  FOR SELECT USING (true);

-- Update roster spots policy
DROP POLICY IF EXISTS "roster_spots_public_read" ON public.roster_spots;
CREATE POLICY "roster_spots_public_read" ON public.roster_spots
  FOR SELECT USING (true);

-- Allow public reads for orgs
DROP POLICY IF EXISTS "orgs_public_read" ON public.orgs;
CREATE POLICY "orgs_public_read" ON public.orgs
  FOR SELECT USING (true);

-- Sports and positions should also be publicly readable (they're reference data)
ALTER TABLE public.sports DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.positions DISABLE ROW LEVEL SECURITY;
