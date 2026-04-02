import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Audex — AI-Powered SEC Filing Intelligence",
  description:
    "Our multi-pass verification engine reads every claim in SEC filings and cross-references them against each other. When the numbers don't add up, we flag it.",
  openGraph: {
    title: "Audex — AI-Powered SEC Filing Intelligence",
    description:
      "Multi-pass AI engine that reads SEC filings, cross-references every claim, and flags companies where the numbers don't add up.",
    url: "https://audex.tech",
    siteName: "Audex",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Audex — AI-Powered SEC Filing Intelligence",
    description:
      "Multi-pass AI engine that reads SEC filings, cross-references every claim, and flags companies where the numbers don't add up.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
