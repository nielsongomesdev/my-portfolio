import { useTranslations } from "next-intl";
import { ArrowLeft } from "lucide-react";
import { ButtonLink } from "@/components";

export default function NotFound() {
  const t = useTranslations("notFound");

  return (
    <section className="container-page flex min-h-[70svh] flex-col items-start justify-center gap-5 py-24">
      <p className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-accent">{t("eyebrow")}</p>
      <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">{t("title")}</h1>
      <p className="max-w-md text-lg text-fg-muted">{t("description")}</p>
      <ButtonLink href="/" variant="secondary" className="mt-2">
        <ArrowLeft size={16} aria-hidden="true" />
        {t("cta")}
      </ButtonLink>
    </section>
  );
}
