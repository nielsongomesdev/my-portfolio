import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";

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
    <html lang="pt-BR">
      <body
        className={`${outfit.variable} bg-brand-bg text-brand-text antialiased`}
      >
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
