import { ArrowRight, FileText } from "lucide-react";
import { useTranslations } from "next-intl";
import { ButtonLink, Reveal } from "@/components";
import { site } from "@/data";

export function ContactCta() {
  const t = useTranslations("home.contactCta");
  const tc = useTranslations("common");

  return (
    <section className="border-t border-border">
      <div className="container-page py-16 sm:py-20 lg:py-24">
        <Reveal className="flex flex-col gap-8 rounded-2xl border border-border bg-bg-elevated p-8 sm:p-10 md:flex-row md:items-center md:justify-between lg:p-14">
          <div className="flex max-w-xl flex-col gap-3">
            <h2 className="text-2xl font-semibold tracking-tight text-balance sm:text-3xl">{t("title")}</h2>
            <p className="text-fg-muted">{t("description")}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href="/contact" size="lg" className="group">
              {t("primary")}
              <ArrowRight
                size={18}
                aria-hidden="true"
                className="transition-transform duration-200 ease-out-expo group-hover:translate-x-0.5"
              />
            </ButtonLink>
            <ButtonLink href={site.cv} variant="secondary" size="lg">
              <FileText size={16} aria-hidden="true" />
              {t("secondary")}
              <span className="sr-only"> ({tc("newTab")})</span>
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
