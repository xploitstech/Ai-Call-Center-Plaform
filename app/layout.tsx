import type { Metadata } from "next";
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { Outfit } from 'next/font/google';
import "./globals.css";
import { Toaster } from 'sonner';

// For headings and display text
const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-display',
});

export const metadata: Metadata = {
  title: "AI Call Center",
  description: "AI-powered customer support solution",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${GeistSans.variable} ${GeistMono.variable} ${outfit.variable} antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
