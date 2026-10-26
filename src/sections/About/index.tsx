import { Briefcase, GraduationCap, Languages, MapPin } from "lucide-react";
import { useTranslations } from "next-intl";
import { Eyebrow, ProfilePhoto, Reveal, SectionHeading, TechList } from "@/components";
import { skillGroups } from "@/data";

const experienceItems = [
  { key: "bloco", bullets: 5, current: true },
  { key: "unipe", bullets: 4, current: false },
] as const;

const educationItems = ["unipe", "descomplica", "devquest"] as const;

const facts = [
  { labelKey: "facts.locationLabel", valueKey: "facts.location", icon: MapPin },
  { labelKey: "experience.current", valueKey: "facts.currentRole", icon: Briefcase },
  { labelKey: "facts.languagesLabel", valueKey: "facts.languages", icon: Languages },
] as const;

export function About() {
  const t = useTranslations("about");
  const th = useTranslations("hero");

  return (
    <>
      <section>
        <div className="container-page grid gap-12 py-16 sm:py-20 lg:grid-cols-12 lg:gap-10 lg:py-28">
          <div className="flex flex-col gap-8 lg:col-span-7">
            <Reveal className="flex items-center gap-4">
              <ProfilePhoto alt={th("photoAlt")} variant="avatar" className="size-16" priority />
              <Eyebrow>{t("eyebrow")}</Eyebrow>
            </Reveal>
            <Reveal delay={0.06}>
              <SectionHeading as="h1" size="page" title={t("title")} />
            </Reveal>
            <Reveal delay={0.12}>
              <p className="max-w-[62ch] text-lg leading-relaxed text-fg text-pretty">{t("lead")}</p>
            </Reveal>
            <Reveal delay={0.18} className="flex max-w-[62ch] flex-col gap-4 text-base leading-relaxed text-fg-muted">
              <p>{t("paragraphs.p1")}</p>
              <p>{t("paragraphs.p2")}</p>
              <p>{t("paragraphs.p3")}</p>
            </Reveal>
          </div>

          <Reveal delay={0.2} className="lg:col-span-4 lg:col-start-9">
            <dl className="flex flex-col divide-y divide-border rounded-2xl border border-border bg-bg-elevated">
              {facts.map(({ labelKey, valueKey, icon: Icon }) => (
                <div key={valueKey} className="relative flex flex-col gap-0.5 py-5 pr-5 pl-13">
                  <Icon size={18} aria-hidden="true" className="absolute top-5.5 left-5 text-accent" />
                  <dt className="font-mono text-xs uppercase tracking-[0.18em] text-fg-subtle">{t(labelKey)}</dt>
                  <dd className="text-sm text-fg">{t(valueKey)}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-border">
        <div className="container-page grid gap-10 py-16 sm:py-20 lg:py-24 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <SectionHeading eyebrow={t("experience.eyebrow")} title={t("experience.title")} />
          </Reveal>

          <ol className="flex flex-col lg:col-span-8">
            {experienceItems.map(({ key, bullets, current }, index) => (
              <Reveal
                key={key}
                as="li"
                delay={index * 0.08}
                className="grid gap-4 border-t border-border py-8 first:border-t-0 first:pt-0 md:grid-cols-[11rem_1fr] md:gap-8"
              >
                <div className="flex flex-col gap-1 font-mono text-xs text-fg-subtle">
                  <span>{t(`experience.items.${key}.period`)}</span>
                  {current && (
                    <span className="inline-flex w-fit items-center gap-1.5 text-success">
                      <span className="size-1.5 rounded-full bg-success" aria-hidden="true" />
                      {t("experience.current")}
                    </span>
                  )}
                </div>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1">
                    <h3 className="text-lg font-semibold tracking-tight">{t(`experience.items.${key}.role`)}</h3>
                    <p className="text-sm text-fg-muted">{t(`experience.items.${key}.company`)}</p>
                  </div>
                  <ul className="flex flex-col gap-2.5">
                    {Array.from({ length: bullets }, (_, i) => `b${i + 1}`).map((bullet) => (
                      <li key={bullet} className="flex gap-3 text-sm leading-relaxed text-fg-muted sm:text-base">
                        <span aria-hidden="true" className="mt-[11px] h-px w-3 shrink-0 bg-accent sm:mt-3" />
                        <span>{t(`experience.items.${key}.bullets.${bullet}`)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-t border-border">
        <div className="container-page grid gap-10 py-16 sm:py-20 lg:py-24 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <SectionHeading eyebrow={t("education.eyebrow")} title={t("education.title")} />
          </Reveal>

          <ul className="grid gap-4 lg:col-span-8 md:grid-cols-3">
            {educationItems.map((key, index) => (
              <Reveal
                key={key}
                as="li"
                delay={index * 0.08}
                className="flex flex-col gap-4 rounded-2xl border border-border bg-bg-elevated p-6"
              >
                <GraduationCap size={20} aria-hidden="true" className="text-accent" />
                <div className="flex flex-col gap-1">
                  <h3 className="font-semibold tracking-tight">{t(`education.items.${key}.degree`)}</h3>
                  <p className="text-sm text-fg-muted">{t(`education.items.${key}.school`)}</p>
                </div>
                <p className="mt-auto font-mono text-xs text-fg-subtle">{t(`education.items.${key}.period`)}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-border">
        <div className="container-page grid gap-10 py-16 sm:py-20 lg:py-24 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <SectionHeading
              eyebrow={t("skills.eyebrow")}
              title={t("skills.title")}
              description={t("skills.description")}
            />
          </Reveal>

          <dl className="flex flex-col lg:col-span-8">
            {skillGroups.map((group, index) => (
              <Reveal
                key={group.key}
                delay={index * 0.06}
                className="grid gap-3 border-t border-border py-6 first:border-t-0 first:pt-0 md:grid-cols-[11rem_1fr] md:gap-8"
              >
                <dt className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-fg-subtle md:pt-1.5">
                  {t(`skills.groups.${group.key}`)}
                </dt>
                <dd>
                  <TechList items={group.items} />
                </dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>
    </>
  );
}
