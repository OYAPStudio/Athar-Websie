import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Athar | Coming Soon",
  description: "Athar - Something amazing is coming. Stay tuned!",
  keywords: ["Athar", "Coming Soon", "athariq.co"],
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "Athar | Coming Soon",
    description: "Something amazing is coming. Stay tuned!",
    url: "https://athariq.co",
    siteName: "Athar",
    type: "website",
  },
};

import SmoothScrolling from "@/components/SmoothScrolling";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} antialiased`}
      >
        <SmoothScrolling>
          {children}
        </SmoothScrolling>
      </body>
    </html>
  );
}
