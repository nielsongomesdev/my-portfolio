import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { Contact } from "@/sections";
import { routing } from "@/i18n/routing";

type ContactPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: ContactPageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    return {};
  }

  const canonicalPath = locale === "pt" ? "/pt/contact" : "/contact";

  return {
    alternates: {
      canonical: canonicalPath,
      languages: {
        en: "/contact",
        pt: "/pt/contact",
      },
    },
  };
}

export default function ContactPage() {
  return (
    <main className="w-full min-h-screen">
      <Contact />
    </main>
  );
}
