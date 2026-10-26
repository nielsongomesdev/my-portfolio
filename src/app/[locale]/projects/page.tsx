import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ContactCta, Projects } from "@/sections";
import { routing } from "@/i18n/routing";

type ProjectsPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: ProjectsPageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    return {};
  }

  const t = await getTranslations({ locale, namespace: "metadata" });
  const path = locale === "pt" ? "/pt/projects" : "/projects";

  return {
    title: t("projects.title"),
    description: t("projects.description"),
    alternates: {
      canonical: path,
      languages: { en: "/projects", pt: "/pt/projects", "x-default": "/projects" },
    },
    openGraph: {
      title: t("projects.title"),
      description: t("projects.description"),
      url: path,
    },
  };
}

export default async function ProjectsPage({ params }: ProjectsPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Projects />
      <ContactCta />
    </>
  );
}
