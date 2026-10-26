import { useTranslations } from "next-intl";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { FileText, Mail } from "lucide-react";
import { site } from "@/data";

const linkClass =
  "inline-flex items-center gap-2 text-sm text-fg-muted transition-colors hover:text-fg";

export function Footer() {
  const t = useTranslations("footer");
  const tc = useTranslations("common");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border pb-20 md:pb-0">
      <div className="container-page flex flex-col gap-8 py-10 md:flex-row md:items-end md:justify-between">
        <div className="flex flex-col gap-1">
          <p className="font-semibold tracking-tight">{tc("name")}</p>
          <p className="text-sm text-fg-muted">{t("tagline")}</p>
        </div>

        <nav aria-label={t("linksLabel")}>
          <ul className="flex flex-wrap gap-x-6 gap-y-3">
            <li>
              <a href={`mailto:${site.email}`} className={linkClass}>
                <Mail size={15} aria-hidden="true" />
                {tc("email")}
              </a>
            </li>
            <li>
              <a href={site.github} target="_blank" rel="noopener noreferrer" className={linkClass}>
                <FaGithub size={15} aria-hidden="true" />
                {tc("github")}
              </a>
            </li>
            <li>
              <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className={linkClass}>
                <FaLinkedin size={15} aria-hidden="true" />
                {tc("linkedin")}
              </a>
            </li>
            <li>
              <a href={site.cv} target="_blank" rel="noopener noreferrer" className={linkClass}>
                <FileText size={15} aria-hidden="true" />
                {tc("cv")}
                <span className="sr-only"> ({tc("newTab")})</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>

      <div className="container-page flex flex-col gap-2 border-t border-border py-5 font-mono text-xs text-fg-subtle sm:flex-row sm:justify-between">
        <p>{t("rights", { year })}</p>
        <p>{t("builtWith")}</p>
      </div>
    </footer>
  );
}
