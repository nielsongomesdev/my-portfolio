import { useTranslations } from "next-intl";
import { ProjectCard, ProjectRow, Reveal, Rise, SectionHeading } from "@/components";
import { compactProjects, featuredProjects, secondaryProjects } from "@/data";

export function Projects() {
  const t = useTranslations("projects");

  return (
    <section>
      <div className="container-page flex flex-col gap-14 py-16 sm:py-20 lg:py-24">
        <Rise>
          <SectionHeading
            as="h1"
            size="page"
            eyebrow={t("eyebrow")}
            title={t("title")}
            description={t("description")}
            className="max-w-3xl"
          />
        </Rise>

        <div className="flex flex-col gap-6">
          {featuredProjects.map((project, index) => (
            <Rise key={project.key} step={index + 1}>
              <ProjectCard project={project} layout="featured" headingLevel="h2" priority={index === 0} />
            </Rise>
          ))}
        </div>

        <div className="flex flex-col gap-8">
          <Reveal>
            <h2 className="text-2xl font-semibold tracking-tight">{t("othersTitle")}</h2>
          </Reveal>
          <div className="grid gap-6 lg:grid-cols-2">
            {secondaryProjects.map((project, index) => (
              <Reveal key={project.key} delay={index * 0.08} y={20} className="flex">
                <ProjectCard project={project} layout="secondary" className="flex-1" />
              </Reveal>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <Reveal className="flex flex-col gap-2">
            <h2 className="text-2xl font-semibold tracking-tight">{t("moreTitle")}</h2>
            <p className="text-fg-muted">{t("moreDescription")}</p>
          </Reveal>
          <div className="border-b border-border">
            {compactProjects.map((project, index) => (
              <Reveal key={project.key} delay={index * 0.06}>
                <ProjectRow project={project} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
