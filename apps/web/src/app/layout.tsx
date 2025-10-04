import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Force all pages to be dynamic (no static generation)
export const dynamic = 'force-dynamic';
export const revalidate = 0;

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: 'swap',
});

export const metadata: Metadata = {
  title: "RosterUp - Where Elite Athletes Meet Their Teams",
  description: "The premier marketplace connecting exceptional talent with championship-caliber travel sports programs. Discover teams, showcase your skills, compete at the highest level.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
