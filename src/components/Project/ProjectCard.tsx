import Image from "next/image";
import { useTranslations } from "next-intl";
import { TechList } from "@/components/TechChip";
import type { Project } from "@/data";
import { cn } from "@/utils/cn";
import { ProjectLinks } from "./ProjectLinks";

type ProjectCardProps = {
  project: Project;
  /** `featured` spans the full width; `secondary` fits a two-column grid. */
  layout?: "featured" | "secondary";
  /** Heading level for the project title, so the page outline stays in order. */
  headingLevel?: "h2" | "h3";
  className?: string;
};

const labelClass = "font-mono text-xs font-medium uppercase tracking-[0.18em] text-fg-subtle";

export function ProjectCard({ project, layout = "featured", headingLevel = "h3", className }: ProjectCardProps) {
  const t = useTranslations("projects");
  const item = `items.${project.key}` as const;
  const title = t(`${item}.title`);
  const highlightKeys = Array.from({ length: project.highlights }, (_, i) => `h${i + 1}`);
  const isFeatured = layout === "featured";
  const Heading = headingLevel;

  return (
    <article
      className={cn(
        "group flex flex-col overflow-hidden rounded-2xl border border-border bg-bg-elevated transition-colors duration-300 hover:border-border-strong",
        className
      )}
    >
      {project.image && (
        <a
          href={project.liveUrl ?? project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={-1}
          aria-hidden="true"
          className="relative block aspect-[2.15/1] overflow-hidden border-b border-border bg-bg-subtle"
        >
          <Image
            src={project.image.src}
            alt={t("labels.imageAlt", { name: title })}
            fill
            sizes={isFeatured ? "(min-width: 1152px) 1120px, 100vw" : "(min-width: 1024px) 560px, 100vw"}
            className="object-cover object-top transition-transform duration-700 ease-out-expo group-hover:scale-[1.02]"
          />
        </a>
      )}

      <div
        className={cn(
          "flex flex-col gap-6 p-6 sm:p-8",
          isFeatured && "lg:grid lg:grid-cols-[1.15fr_1fr] lg:gap-10"
        )}
      >
        <div className="flex flex-col gap-4">
          <p className={labelClass}>
            {t(`types.${project.type}`)}
            {isFeatured && (
              <>
                <span aria-hidden="true"> · </span>
                <span className="text-accent">{t("featuredLabel")}</span>
              </>
            )}
          </p>

          <div className="flex flex-col gap-2">
            <Heading className={cn("font-semibold tracking-tight", isFeatured ? "text-2xl sm:text-3xl" : "text-xl")}>
              {title}
            </Heading>
            <p className="text-fg-muted">{t(`${item}.tagline`)}</p>
          </div>

          <p className="text-sm leading-relaxed text-fg-muted sm:text-base">{t(`${item}.description`)}</p>

          <ProjectLinks project={project} title={title} size={isFeatured ? "md" : "sm"} className="mt-1" />
        </div>

        <div className="flex flex-col gap-6 lg:border-l lg:border-border lg:pl-10">
          {highlightKeys.length > 0 && (
            <div className="flex flex-col gap-3">
              <p className={labelClass}>{t("labels.highlights")}</p>
              <ul className="flex flex-col gap-2.5">
                {highlightKeys.map((key) => (
                  <li key={key} className="flex gap-3 text-sm leading-relaxed text-fg-muted">
                    <span aria-hidden="true" className="mt-[11px] h-px w-3 shrink-0 bg-accent" />
                    <span>{t(`${item}.highlights.${key}`)}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex flex-col gap-3">
            <p className={labelClass}>{t("labels.stack")}</p>
            <TechList items={project.techs} />
          </div>
        </div>
      </div>
    </article>
  );
}
