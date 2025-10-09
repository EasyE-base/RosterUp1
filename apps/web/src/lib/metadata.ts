import { Metadata } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://roster-up1-web.vercel.app';

export const defaultMetadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'RosterUp - Where Elite Athletes Meet Their Teams',
    template: '%s | RosterUp'
  },
  description: 'The premier marketplace connecting exceptional talent with championship-caliber travel sports programs. Find teams, showcase your skills, and compete at the highest level.',
  keywords: ['travel sports', 'youth sports', 'sports recruiting', 'travel teams', 'AAU', 'club sports', 'elite athletes', 'sports marketplace'],
  authors: [{ name: 'RosterUp' }],
  creator: 'RosterUp',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: baseUrl,
    siteName: 'RosterUp',
    title: 'RosterUp - Where Elite Athletes Meet Their Teams',
    description: 'The premier marketplace connecting exceptional talent with championship-caliber travel sports programs.',
    images: [
      {
        url: '/hero-baseball-field.jpg',
        width: 1200,
        height: 630,
        alt: 'RosterUp - Elite Sports Recruiting Platform'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RosterUp - Where Elite Athletes Meet Their Teams',
    description: 'The premier marketplace connecting exceptional talent with championship-caliber travel sports programs.',
    images: ['/hero-baseball-field.jpg'],
    creator: '@rosterup'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export const pageMetadata = {
  home: {
    title: 'RosterUp - Connect Players With Organizations',
    description: 'The premier marketplace for youth sports. Organizations manage multiple teams. Players build profiles and find their perfect fit.',
  },
  teams: {
    title: 'Browse Elite Travel Sports Teams',
    description: 'Discover elite travel sports teams across the nation. Filter by sport, location, age group, and skill level to find your perfect team match.',
  },
  players: {
    title: 'For Players - Create Your Athlete Profile',
    description: 'Showcase your stats, achievements, and highlight videos. Get discovered by elite organizations actively recruiting talented athletes.',
  },
  organizations: {
    title: 'For Organizations - Manage Multiple Teams',
    description: 'Manage all your teams in one place. From 10U to 18U, streamline recruiting, tryouts, and roster management across your entire program.',
  },
  coaches: {
    title: 'For Organizations - Manage Multiple Teams',
    description: 'Manage all your teams in one place. From 10U to 18U, streamline recruiting, tryouts, and roster management across your entire program.',
  },
  howItWorks: {
    title: 'How It Works - RosterUp Guide',
    description: 'Learn how RosterUp connects youth sports organizations with talented players. A simple two-sided marketplace for travel sports.',
  },
  login: {
    title: 'Sign In to RosterUp',
    description: 'Access your RosterUp account to manage your profile, applications, and team roster.',
  },
  signup: {
    title: 'Join RosterUp - Get Started Free',
    description: 'Create your free RosterUp account and start connecting with elite travel sports teams and talented athletes.',
  },
};
