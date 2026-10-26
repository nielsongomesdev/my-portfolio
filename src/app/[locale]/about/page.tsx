import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { About, ContactCta } from "@/sections";
import { routing } from "@/i18n/routing";

type AboutPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: AboutPageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    return {};
  }

  const t = await getTranslations({ locale, namespace: "metadata" });
  const path = locale === "pt" ? "/pt/about" : "/about";

  return {
    title: t("about.title"),
    description: t("about.description"),
    alternates: {
      canonical: path,
      languages: { en: "/about", pt: "/pt/about", "x-default": "/about" },
    },
    openGraph: {
      title: t("about.title"),
      description: t("about.description"),
      url: path,
    },
  };
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <About />
      <ContactCta />
    </>
  );
}
