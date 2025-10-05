import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  try {
    // Debug: Check environment variables
    const hasUrl = !!process.env.NEXT_PUBLIC_SUPABASE_URL;
    const hasKey = !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!hasUrl || !hasKey) {
      console.error('Missing env vars:', { hasUrl, hasKey });
      return NextResponse.json(
        { error: 'Server configuration error - missing environment variables', debug: { hasUrl, hasKey } },
        { status: 500 }
      );
    }

    const supabase = createRouteHandlerClient({ cookies });
    const searchParams = request.nextUrl.searchParams;
    const sport = searchParams.get('sport');
    const state = searchParams.get('state');
    const city = searchParams.get('city');
    const minAge = searchParams.get('minAge');
    const maxAge = searchParams.get('maxAge');
    const search = searchParams.get('search');

    // Start query
    let query = supabase
      .from('roster_spots')
      .select(`
        *,
        positions (
          id,
          name,
          abbreviation
        ),
        teams (
          id,
          name,
          city,
          state,
          logo_url,
          sports (
            id,
            name,
            slug
          ),
          orgs (
            id,
            name,
            logo_url
          )
        )
      `)
      .eq('status', 'open')
      .eq('visibility', 'public')
      .order('created_at', { ascending: false });

    // Apply filters
    if (sport) {
      query = query.eq('teams.sports.slug', sport);
    }

    if (state) {
      query = query.eq('teams.state', state);
    }

    if (city) {
      query = query.ilike('teams.city', `%${city}%`);
    }

    if (minAge) {
      query = query.gte('min_age', parseInt(minAge));
    }

    if (maxAge) {
      query = query.lte('max_age', parseInt(maxAge));
    }

    if (search) {
      query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%`);
    }

    const { data: rosterSpots, error } = await query;

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      listings: rosterSpots || [],
      total: rosterSpots?.length || 0,
    });
  } catch (error: any) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
