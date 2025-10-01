// Database types (manually defined for now, can generate from Supabase later)

export type Profile = {
  id: string;
  role: 'parent' | 'coach' | 'admin' | 'super_admin';
  full_name: string | null;
  avatar_url: string | null;
  city: string | null;
  state: string | null;
  postal_code: string | null;
  quiet_hours_start: string | null;
  quiet_hours_end: string | null;
  created_at: string;
  updated_at: string;
};

export type Kid = {
  id: string;
  parent_id: string;
  first_name: string;
  last_name: string;
  birthdate: string | null;
  grade: number | null;
  bio: string | null;
  photo_url: string | null;
  jersey_size: string | null;
  show_last_name: boolean;
  show_birthdate: boolean;
  show_grade: boolean;
  created_at: string;
  updated_at: string;
};

export type Sport = {
  id: number;
  slug: string;
  name: string;
  icon_url: string | null;
};

export type Position = {
  id: number;
  sport_id: number;
  name: string;
  abbreviation: string | null;
  sort_order: number;
};

export type Org = {
  id: string;
  name: string;
  slug: string | null;
  logo_url: string | null;
  website_url: string | null;
  refund_window_days: number;
  refund_policy_text: string | null;
  created_at: string;
  updated_at: string;
};

export type Team = {
  id: string;
  org_id: string;
  name: string;
  sport_id: number;
  city: string | null;
  state: string | null;
  home_field_address: string | null;
  logo_url: string | null;
  created_at: string;
  updated_at: string;
};

export type Season = {
  id: string;
  team_id: string;
  name: string;
  starts_on: string | null;
  ends_on: string | null;
  created_at: string;
};

export type RosterSpot = {
  id: string;
  team_id: string;
  season_id: string | null;
  position_id: number | null;
  title: string;
  description: string | null;
  min_age: number | null;
  max_age: number | null;
  min_grade: number | null;
  max_grade: number | null;
  capacity: number | null;
  deadline: string | null;
  visibility: 'public' | 'invite';
  status: 'open' | 'closed';
  fee_cents: number | null;
  currency: string;
  created_at: string;
  updated_at: string;
};

export type Application = {
  id: string;
  roster_spot_id: string;
  kid_id: string;
  parent_id: string;
  note: string | null;
  status: 'draft' | 'submitted' | 'in_review' | 'accepted' | 'waitlisted' | 'rejected' | 'withdrawn';
  payment_status: 'not_required' | 'pending' | 'paid' | 'refunded' | null;
  stripe_payment_intent_id: string | null;
  created_at: string;
  updated_at: string;
};

export type Offer = {
  id: string;
  application_id: string;
  status: 'pending' | 'accepted' | 'declined' | 'expired';
  expires_at: string;
  created_at: string;
  accepted_at: string | null;
  declined_at: string | null;
};

export type Message = {
  id: number;
  conversation_id: string;
  sender_id: string;
  content: string;
  attachments: any[];
  created_at: string;
};
