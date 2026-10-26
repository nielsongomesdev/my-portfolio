import { useTranslations } from "next-intl";

export function SkipLink() {
  const t = useTranslations("common");

  return (
    <a
      href="#content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-accent-fg"
    >
      {t("skipToContent")}
    </a>
  );
}
