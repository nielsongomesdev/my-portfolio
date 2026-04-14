import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export function generateMetadata(): Metadata {
  return {
    metadataBase: new URL("https://portfolio-nielson.vercel.app"),
    alternates: {
      canonical: "/",
      languages: {
        en: "/",
        pt: "/pt",
      },
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <body
        className={`${outfit.variable} bg-cosmic-bg-near-black text-brand-text antialiased relative overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  );
}