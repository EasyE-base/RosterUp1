import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email, page } = await request.json();

    // Validate email
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // TODO: Add to database or email service (Mailchimp, ConvertKit, etc.)
    // For now, just log it
    console.log('Waitlist signup:', { email, page, timestamp: new Date().toISOString() });

    // You can add to Supabase here:
    // const { data, error } = await supabase
    //   .from('waitlist')
    //   .insert({ email, page, created_at: new Date().toISOString() });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Waitlist error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
