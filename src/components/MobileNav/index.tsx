"use client";

import { useTranslations } from "next-intl";
import { navItems } from "@/components/Nav/items";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/utils/cn";

/** Bottom tab bar for small screens. Labels are visible, not hover-only. */
export function MobileNav() {
  const t = useTranslations("nav");
  const pathname = usePathname();

  return (
    <nav
      aria-label={t("label")}
      className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-bg/90 backdrop-blur-md md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <ul className="grid h-16 grid-cols-4">
        {navItems.map(({ key, href, icon: Icon }) => {
          const active = pathname === href;

          return (
            <li key={key} className="flex">
              <Link
                href={href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex flex-1 flex-col items-center justify-center gap-1 text-xs font-medium transition-colors",
                  active ? "text-accent" : "text-fg-muted active:text-fg"
                )}
              >
                <Icon size={20} strokeWidth={active ? 2.25 : 1.75} aria-hidden="true" />
                <span>{t(key)}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
