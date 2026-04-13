import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { Projects } from "@/sections";
import { routing } from "@/i18n/routing";

type ProjectsPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: ProjectsPageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    return {};
  }

  const canonicalPath = locale === "pt" ? "/pt/projects" : "/projects";

  return {
    alternates: {
      canonical: canonicalPath,
      languages: {
        en: "/projects",
        pt: "/pt/projects",
      },
    },
  };
}

export default function ProjectsPage() {
  return (
    <main className="w-full min-h-screen">
      <Projects />
    </main>
  );
}