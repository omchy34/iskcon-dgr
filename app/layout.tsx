
//root layout 
import type { Metadata } from "next";
import { Cinzel, Poppins } from "next/font/google";
import "./globals.css";

// Keep whatever fonts you had before
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
  title: "ISKCON Durgapur",
  description: "ISKCON Durgapur - Hare Krishna Temple",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cinzel.variable} ${poppins.variable}`}>
      <body className="min-h-full flex flex-col" style={{ fontFamily: "var(--font-poppins)" }}>
        {children}
      </body>
    </html>
  );
}