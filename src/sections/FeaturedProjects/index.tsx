import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { ButtonLink, ProjectCard, Reveal, SectionHeading } from "@/components";
import { featuredProjects } from "@/data";

export function FeaturedProjects() {
  const t = useTranslations("home.featured");

  return (
    <section className="border-t border-border">
      <div className="container-page flex flex-col gap-10 py-16 sm:py-20 lg:py-24">
        <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading eyebrow={t("eyebrow")} title={t("title")} description={t("description")} />
          <ButtonLink href="/projects" variant="ghost" className="group -ml-4 self-start md:ml-0 md:self-auto">
            {t("cta")}
            <ArrowRight
              size={16}
              aria-hidden="true"
              className="transition-transform duration-200 ease-out-expo group-hover:translate-x-0.5"
            />
          </ButtonLink>
        </Reveal>

        <div className="flex flex-col gap-6">
          {featuredProjects.map((project, index) => (
            <Reveal key={project.key} delay={index * 0.08} y={20}>
              <ProjectCard project={project} layout="featured" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
