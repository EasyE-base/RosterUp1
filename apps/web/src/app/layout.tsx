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
  title: "RosterUp - Find Your Perfect Travel Sports Team",
  description: "The marketplace connecting talented players with elite travel sports teams. Browse teams, showcase your skills, and get recruited.",
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
