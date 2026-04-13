import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { About } from "@/sections";
import { routing } from "@/i18n/routing";

type AboutPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: AboutPageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    return {};
  }

  const canonicalPath = locale === "pt" ? "/pt/about" : "/about";

  return {
    alternates: {
      canonical: canonicalPath,
      languages: {
        en: "/about",
        pt: "/pt/about",
      },
    },
  };
}

export default function AboutPage() {
  return (
    <main className="w-full min-h-screen">
      <About />
    </main>
  );
}
