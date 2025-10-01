import 'dotenv/config';

export default {
  expo: {
    name: 'RosterUp',
    slug: 'rosterup',
    extra: {
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
      supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    }
  }
};


