import { ArrowUpRight, KeyRound, Lock } from "lucide-react";
import { useTranslations } from "next-intl";
import { FaGithub } from "react-icons/fa6";
import { buttonClasses } from "@/components/Button";
import type { Project } from "@/data";
import { cn } from "@/utils/cn";

type ProjectLinksProps = {
  project: Project;
  title: string;
  size?: "sm" | "md";
  className?: string;
};

/**
 * Visible labels stay short ("Ver projeto"); the project name and the
 * new-tab hint go into visually hidden text so screen readers get a
 * complete, unambiguous name that still contains the visible label.
 */
export function ProjectLinks({ project, title, size = "md", className }: ProjectLinksProps) {
  const t = useTranslations("projects.labels");
  const tc = useTranslations("common");
  const isPrivate = !project.githubUrl;
  const hidden = (text: string) => <span className="sr-only">: {text} ({tc("newTab")})</span>;

  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      {project.liveUrl && (
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(buttonClasses({ variant: "primary", size }), "group/link")}
        >
          {t("live")}
          {hidden(title)}
          <ArrowUpRight
            size={16}
            aria-hidden="true"
            className="transition-transform duration-200 ease-out-expo group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
          />
        </a>
      )}

      {project.githubUrl && (
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonClasses({ variant: "secondary", size })}
        >
          <FaGithub size={15} aria-hidden="true" />
          {t("code")}
          {hidden(`${title} · GitHub`)}
        </a>
      )}

      {project.apiGithubUrl && (
        <a
          href={project.apiGithubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonClasses({ variant: "secondary", size })}
        >
          <FaGithub size={15} aria-hidden="true" />
          {t("apiCode")}
          {hidden(`${title} · GitHub`)}
        </a>
      )}

      {isPrivate && (
        <span
          className={cn(
            buttonClasses({ variant: "secondary", size }),
            "cursor-default border-dashed text-fg-subtle hover:border-border-strong hover:bg-transparent active:scale-100"
          )}
        >
          <Lock size={14} aria-hidden="true" />
          {t("private")}
        </span>
      )}

      {project.demoCredentials && (
        <p className="inline-flex items-center gap-2 rounded-md bg-bg-subtle px-2.5 py-1.5 font-mono text-xs text-fg-muted">
          <KeyRound size={13} aria-hidden="true" className="text-accent" />
          <span>
            {t("demoAccess")}: <span className="text-fg">{project.demoCredentials}</span>
          </span>
        </p>
      )}
    </div>
  );
}
