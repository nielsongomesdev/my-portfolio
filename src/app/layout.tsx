import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "My Portfolio | Full-Stack Developer",
  description: "Portfolio of a Full-Stack Developer focused on scalable solutions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="bg-zinc-950 text-zinc-50 antialiased">
        {children}
      </body>
    </html>
  );
}