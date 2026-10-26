import { useTranslations } from "next-intl";
import type { Project } from "@/data";
import { ProjectLinks } from "./ProjectLinks";

/** Compact, text-only presentation for projects without a screenshot. */
export function ProjectRow({ project }: { project: Project }) {
  const t = useTranslations("projects");
  const item = `items.${project.key}` as const;
  const title = t(`${item}.title`);

  return (
    <article className="grid gap-4 border-t border-border py-7 md:grid-cols-[1fr_auto] md:items-start md:gap-10">
      <div className="flex flex-col gap-2">
        <p className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-fg-subtle">
          {t(`types.${project.type}`)}
        </p>
        <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
        <p className="text-sm leading-relaxed text-fg-muted sm:text-base">{t(`${item}.description`)}</p>
        <p className="font-mono text-xs tracking-wide text-fg-subtle">{project.techs.join(" · ")}</p>
      </div>

      <ProjectLinks project={project} title={title} size="sm" className="md:justify-end" />
    </article>
  );
}
