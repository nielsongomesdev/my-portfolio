import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
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

  const t = await getTranslations({ locale, namespace: "metadata" });
  const path = locale === "pt" ? "/pt/contact" : "/contact";

  return {
    title: t("contact.title"),
    description: t("contact.description"),
    alternates: {
      canonical: path,
      languages: { en: "/contact", pt: "/pt/contact", "x-default": "/contact" },
    },
    openGraph: {
      title: t("contact.title"),
      description: t("contact.description"),
      url: path,
    },
  };
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <Contact />;
}
