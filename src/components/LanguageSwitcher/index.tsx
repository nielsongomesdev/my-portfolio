"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";

export const LanguageSwitcher = () => {
  const t = useTranslations("header");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const nextLocale = locale === "en" ? "pt" : "en";

  const handleSwitchLanguage = () => {
    router.replace(pathname, { locale: nextLocale });
  };


  return (
    <button
      type="button"
      onClick={handleSwitchLanguage}
      className="text-brand-muted hover:text-white transition-colors text-xs md:text-sm font-semibold tracking-wide"
      aria-label={t("switchAria")}
    >
      {t("switch")}
    </button>
  );
};
