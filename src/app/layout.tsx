import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";

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
      <body className="bg-brand-bg text-brand-text antialiased">
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
