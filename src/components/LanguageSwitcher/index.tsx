"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";

export function LanguageSwitcher() {
  const t = useTranslations("common");
  const locale = useLocale();
  const pathname = usePathname();
  const nextLocale = locale === "en" ? "pt" : "en";

  return (
    <Link
      href={pathname}
      locale={nextLocale}
      hrefLang={nextLocale}
      className="inline-flex h-10 items-center rounded-md border border-border px-3 font-mono text-xs font-medium tracking-wide text-fg-muted transition-colors hover:border-border-strong hover:text-fg"
    >
      {t("switchLocale")}
      <span className="sr-only">: {t("switchLocaleAria")}</span>
    </Link>
  );
}
