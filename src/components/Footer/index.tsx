import { useTranslations } from "next-intl";

export function Footer() {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border pb-20 md:pb-0">
      <div className="container-page flex flex-col gap-1 py-8 font-mono text-xs text-fg-subtle sm:flex-row sm:justify-between">
        <p>{t("rights", { year })}</p>
        <p>{t("builtWith")}</p>
      </div>
    </footer>
  );
}
