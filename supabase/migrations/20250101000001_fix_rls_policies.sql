-- Fix infinite recursion in team_admins RLS policies

-- Drop the problematic policy
DROP POLICY IF EXISTS "team_admins_read" ON public.team_admins;

-- Create a simpler policy without recursion
CREATE POLICY "team_admins_read" ON public.team_admins
  FOR SELECT USING (
    -- Users can see their own team admin records
    auth.uid() = user_id
  );

-- Also update the manage policy to be simpler
DROP POLICY IF EXISTS "team_admins_manage" ON public.team_admins;

CREATE POLICY "team_admins_manage" ON public.team_admins
  FOR ALL USING (
    -- Only allow managing if user is already an admin (checked at app level)
    auth.uid() = user_id
  );
