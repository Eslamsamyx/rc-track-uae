import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Inter, IBM_Plex_Sans_Arabic } from "next/font/google";
import type { ReactNode } from "react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const inter_display = Inter({
  subsets: ["latin"],
  variable: "--font-inter-display",
  weight: ["600", "700", "800"],
  display: "swap",
});

const ibm_arabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  variable: "--font-ibm-arabic",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0B2447",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://rctrack.ae"),
  title: {
    default: "RC Track UAE",
    template: "%s | RC Track UAE",
  },
  description: "The UAE's home for RC car racing, open practice, and motorsport-themed events.",
  applicationName: "RC Track UAE",
  manifest: "/manifest.webmanifest",
  formatDetection: { telephone: false },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      dir="ltr"
      suppressHydrationWarning
      className={`${inter.variable} ${inter_display.variable} ${ibm_arabic.variable}`}
    >
      <body className="min-h-screen bg-[color:var(--color-background)] text-[color:var(--color-foreground)] antialiased">
        {children}
      </body>
    </html>
  );
}
