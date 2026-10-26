import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Axcelasia | Executive Leadership Roundtable RSVP",
  description: "Reserve your seat for The Digital, AI & ESG Revolution. 1 December 2026, 2–5 PM at The Majestic Hotel Kuala Lumpur. By invitation only.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
