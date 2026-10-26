import { FileText, Mail, MapPin } from "lucide-react";
import { useTranslations } from "next-intl";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { Reveal, SectionHeading } from "@/components";
import { site } from "@/data";
import { ContactForm } from "./ContactForm";

const channelClass =
  "group flex items-center justify-between gap-4 border-t border-border py-4 text-sm transition-colors hover:text-fg";

export function Contact() {
  const t = useTranslations("contact");
  const tc = useTranslations("common");

  return (
    <section>
      <div className="container-page grid gap-12 py-16 sm:py-20 lg:grid-cols-12 lg:gap-16 lg:py-24">
        <div className="flex flex-col gap-10 lg:col-span-5">
          <Reveal>
            <SectionHeading
              as="h1"
              size="page"
              eyebrow={t("eyebrow")}
              title={t("title")}
              description={t("description")}
            />
          </Reveal>

          <Reveal delay={0.1} className="flex flex-col gap-3">
            <h2 className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-fg-subtle">
              {t("channelsTitle")}
            </h2>
            <ul className="flex flex-col border-b border-border text-fg-muted">
              <li>
                <a href={`mailto:${site.email}`} className={channelClass}>
                  <span className="inline-flex items-center gap-3">
                    <Mail size={16} aria-hidden="true" className="text-accent" />
                    {tc("email")}
                  </span>
                  <span className="font-mono text-xs text-fg-subtle group-hover:text-fg">{site.email}</span>
                </a>
              </li>
              <li>
                <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className={channelClass}>
                  <span className="inline-flex items-center gap-3">
                    <FaLinkedin size={16} aria-hidden="true" className="text-accent" />
                    {tc("linkedin")}
                  </span>
                  <span className="font-mono text-xs text-fg-subtle group-hover:text-fg">/in/nielsongomesdev</span>
                </a>
              </li>
              <li>
                <a href={site.github} target="_blank" rel="noopener noreferrer" className={channelClass}>
                  <span className="inline-flex items-center gap-3">
                    <FaGithub size={16} aria-hidden="true" className="text-accent" />
                    {tc("github")}
                  </span>
                  <span className="font-mono text-xs text-fg-subtle group-hover:text-fg">@nielsongomesdev</span>
                </a>
              </li>
              <li>
                <a href={site.cv} target="_blank" rel="noopener noreferrer" className={channelClass}>
                  <span className="inline-flex items-center gap-3">
                    <FileText size={16} aria-hidden="true" className="text-accent" />
                    {tc("cv")}
                    <span className="sr-only"> ({tc("newTab")})</span>
                  </span>
                  <span className="font-mono text-xs text-fg-subtle group-hover:text-fg">PDF</span>
                </a>
              </li>
              <li className="flex items-center justify-between gap-4 border-t border-border py-4 text-sm">
                <span className="inline-flex items-center gap-3">
                  <MapPin size={16} aria-hidden="true" className="text-accent" />
                  {t("locationLabel")}
                </span>
                <span className="font-mono text-xs text-fg-subtle">{tc("location")}</span>
              </li>
            </ul>
            <p className="text-sm text-fg-subtle">{t("responseTime")}</p>
          </Reveal>
        </div>

        <Reveal delay={0.15} className="lg:col-span-7">
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}
