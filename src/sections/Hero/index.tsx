import { ArrowRight, Download } from "lucide-react";
import { useTranslations } from "next-intl";
import { ButtonLink, ParticleField, ProfilePhoto } from "@/components";
import { site } from "@/data";

const rise = (step: number) => ({ animationDelay: `${step * 70}ms` });

export function Hero() {
  const t = useTranslations("hero");
  const tc = useTranslations("common");

  return (
    <section className="relative overflow-hidden">
      <ParticleField className="[mask-image:linear-gradient(to_bottom,black_60%,transparent_100%)]" />
      <div className="container-page relative grid items-end gap-10 pt-14 pb-16 sm:pt-20 lg:min-h-[calc(100svh-4rem)] lg:grid-cols-12 lg:gap-8 lg:pt-0 lg:pb-0">
        <div className="flex flex-col gap-7 lg:col-span-7 lg:py-28">
          <div className="animate-rise flex flex-wrap items-center gap-4" style={rise(0)}>
            <ProfilePhoto alt={t("photoAlt")} variant="avatar" className="size-14 lg:hidden" priority />
            <p className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-border bg-bg-elevated/80 py-1.5 pr-3.5 pl-2.5 font-mono text-xs font-medium tracking-wide text-fg-muted">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-pulse-dot rounded-full bg-success/70 motion-reduce:hidden" />
                <span className="relative inline-flex size-2 rounded-full bg-success" />
              </span>
              {t("available")}
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <p
              className="animate-rise text-xl font-semibold tracking-tight text-accent sm:text-2xl"
              style={rise(1)}
            >
              {t("eyebrow")}
            </p>
            <h1
              className="animate-rise-solid max-w-[16ch] text-4xl font-semibold leading-[1.06] tracking-tight text-balance sm:text-5xl lg:text-6xl"
              style={rise(2)}
            >
              {t("title")}
            </h1>
            <p
              className="animate-rise max-w-[58ch] text-base leading-relaxed text-fg-muted text-pretty sm:text-lg"
              style={rise(3)}
            >
              {t("description")}
            </p>
          </div>

          <div className="animate-rise flex flex-col gap-3 sm:flex-row sm:items-center" style={rise(4)}>
            <ButtonLink href="/contact" size="lg" magnetic className="group w-full sm:w-auto">
              {t("contactCta")}
              <ArrowRight
                size={18}
                aria-hidden="true"
                className="transition-transform duration-200 ease-out-expo group-hover:translate-x-0.5"
              />
            </ButtonLink>
            <ButtonLink href={site.cv} variant="secondary" size="lg" magnetic className="w-full sm:w-auto">
              <Download size={16} aria-hidden="true" />
              {t("cvCta")}
              <span className="sr-only"> ({tc("newTab")})</span>
            </ButtonLink>
          </div>
        </div>

        <div
          className="animate-rise relative hidden h-[36rem] self-end lg:col-span-5 lg:block xl:h-[40rem]"
          style={rise(3)}
        >
          <ProfilePhoto alt={t("photoAlt")} variant="cutout" className="h-full w-full" priority />
        </div>
      </div>
    </section>
  );
}
