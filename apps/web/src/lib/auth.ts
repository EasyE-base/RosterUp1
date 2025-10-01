import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import type { Profile } from '@rosterup/lib';

export async function getUser() {
  const supabase = createServerComponentClient({ cookies });
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

export async function requireAuth() {
  const user = await getUser();
  if (!user) {
    redirect('/login');
  }
  return user;
}

export async function getProfile() {
  const user = await requireAuth();
  const supabase = createServerComponentClient({ cookies });
  
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();
    
  return profile as Profile;
}

export async function requireCoachOrAdmin() {
  const profile = await getProfile();
  if (!profile || !['coach', 'admin', 'super_admin'].includes(profile.role)) {
    redirect('/unauthorized');
  }
  return profile;
}
