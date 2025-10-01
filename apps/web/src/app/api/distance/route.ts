import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
	const { origin, destinations } = (await req.json()) as { origin: string; destinations: string[] };
	if (!origin || !destinations?.length) {
		return NextResponse.json({ error: 'Bad request' }, { status: 400 });
	}

	const params = new URLSearchParams({
		origins: origin,
		destinations: destinations.join('|'),
		key: process.env.GOOGLE_MAPS_API_KEY as string
	});

	const response = await fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?${params.toString()}`);
	const data = await response.json();
	return NextResponse.json(data);
}
