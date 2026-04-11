import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
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
  title: "Audex — Neurosymbolic Verification for SEC Filings",
  description:
    "A verification engine that converts AI-extracted financial claims into formally verified assertions with traceable audit trails. Not a signal tool — trust infrastructure.",
  metadataBase: new URL("https://audex.tech"),
  icons: {
    icon: "/icon.svg",
  },
  openGraph: {
    title: "Audex — Neurosymbolic Verification for SEC Filings",
    description:
      "Formally verified financial assertions with traceable audit trails. Every claim checked against XBRL ground truth, mathematical consistency, and Z3 constraint solving.",
    url: "https://audex.tech",
    siteName: "Audex",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Audex — Neurosymbolic Verification for SEC Filings",
    description:
      "Formally verified financial assertions with traceable audit trails.",
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
        <Analytics />
      </body>
    </html>
  );
}
