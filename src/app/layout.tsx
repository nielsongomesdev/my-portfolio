import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "Portfolio | Full-Stack Developer",
  description: "Full-Stack Developer focused on scalable solutions.",
};

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