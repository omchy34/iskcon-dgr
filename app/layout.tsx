import type { Metadata } from "next";
import { Cinzel, Poppins } from "next/font/google";
import "./globals.css";

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  // ── Basic SEO ──────────────────────────────────────────────
  title: {
    default: "ISKCON Durgapur | Hare Krishna Temple",
    template: "%s | ISKCON Durgapur",   // page titles become "Darshan | ISKCON Durgapur"
  },
  description:
    "Welcome to ISKCON Durgapur — a sanctuary of devotion, spiritual wisdom, and Krishna consciousness in the heart of Durgapur, West Bengal. Visit Sri Sri Radha Madanmohan Temple.",
  keywords: [
    "ISKCON Durgapur",
    "Hare Krishna Temple Durgapur",
    "ISKCON West Bengal",
    "Radha Madanmohan Temple",
    "Krishna temple Durgapur",
    "spiritual center Durgapur",
  ],
  authors: [{ name: "ISKCON Durgapur" }],
  creator: "ISKCON Durgapur",
  metadataBase: new URL("https://www.iskcondurgapur.org"), // 🔁 replace with your real domain

  // ── Favicon & Icons ────────────────────────────────────────
  icons: {
    icon: [
      { url: "/iskcon_logo.png", type: "image/png" },
    ],
    apple: "/iskcon_logo.png",         // iOS home screen icon
    shortcut: "/iskcon_logo.png",      // browser shortcut icon
  },

  // ── Open Graph — Facebook, WhatsApp, LinkedIn ──────────────
  openGraph: {
    title: "ISKCON Durgapur | Hare Krishna Temple",
    description:
      "A sanctuary of devotion and spiritual wisdom in Durgapur, West Bengal. Experience the mercy of Sri Sri Radha Madanmohan.",
    url: "https://www.iskcondurgapur.org",
    siteName: "ISKCON Durgapur",
    images: [
      {
        url: "/iskcon_logo.png",        // ideally use a 1200×630 banner image here
        width: 1200,
        height: 630,
        alt: "ISKCON Durgapur — Hare Krishna Temple",
      },
    ],
    locale: "en_IN",
    type: "website",
  },

  // ── Twitter / X card ──────────────────────────────────────
  twitter: {
    card: "summary_large_image",
    title: "ISKCON Durgapur | Hare Krishna Temple",
    description:
      "Experience devotion and Krishna consciousness at ISKCON Durgapur, West Bengal.",
    images: ["/iskcon_logo.png"],
  },

  // ── Robots ────────────────────────────────────────────────
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },

  // ── Canonical ─────────────────────────────────────────────
  alternates: {
    canonical: "https://www.iskcondurgapur.org",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cinzel.variable} ${poppins.variable}`}>
      <body
        className="min-h-full flex flex-col"
        style={{ fontFamily: "var(--font-poppins)" }}
      >
        {children}
      </body>
    </html>
  );
}