import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { Header, Sidebar, CosmicBackground } from "@/components";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "Meu Portfólio | Desenvolvedor Full-Stack",
  description: "Desenvolvedor Full-Stack focado em soluções escaláveis.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="overflow-x-hidden">
      <body
        className={`${outfit.variable} bg-cosmic-bg-near-black text-brand-text antialiased relative overflow-x-hidden`}
      >
        <CosmicBackground />

        <Header />
        <Sidebar />
        <main>{children}</main>
      </body>
    </html>
  );
}