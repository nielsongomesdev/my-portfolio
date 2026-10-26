import { GitBranch, Layers, ShieldCheck, type LucideIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { Reveal, SectionHeading } from "@/components";

const items: { key: "endToEnd" | "architecture" | "security"; icon: LucideIcon }[] = [
  { key: "endToEnd", icon: GitBranch },
  { key: "architecture", icon: Layers },
  { key: "security", icon: ShieldCheck },
];

export function Approach() {
  const t = useTranslations("home.approach");

  return (
    <section className="border-t border-border">
      <div className="container-page flex flex-col gap-12 py-16 sm:py-20 lg:py-24">
        <Reveal>
          <SectionHeading eyebrow={t("eyebrow")} title={t("title")} />
        </Reveal>

        <ul className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-3">
          {items.map(({ key, icon: Icon }, index) => (
            <Reveal key={key} as="li" delay={index * 0.08} className="flex flex-col gap-4 bg-bg-elevated p-7 sm:p-8">
              <span className="inline-flex size-10 items-center justify-center rounded-lg bg-accent-soft text-accent">
                <Icon size={20} aria-hidden="true" />
              </span>
              <h3 className="text-lg font-semibold tracking-tight">{t(`items.${key}.title`)}</h3>
              <p className="text-sm leading-relaxed text-fg-muted sm:text-base">{t(`items.${key}.description`)}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
