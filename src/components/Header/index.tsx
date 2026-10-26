"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { navItems } from "@/components/Nav/items";
import { site } from "@/data";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/utils/cn";

const iconButton =
  "inline-flex size-10 items-center justify-center rounded-md text-fg-muted transition-colors hover:bg-bg-subtle hover:text-fg";

export function Header() {
  const t = useTranslations("nav");
  const tc = useTranslations("common");
  const pathname = usePathname();

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-bg/80 backdrop-blur-md">
      <div className="container-page flex h-16 items-center justify-between gap-6">
        <Link
          href="/"
          className="group flex items-baseline gap-2 text-[15px] font-semibold tracking-tight text-fg"
        >
          <span>{tc("name")}</span>
          <span className="hidden font-mono text-xs font-medium uppercase tracking-[0.18em] text-fg-subtle transition-colors group-hover:text-accent sm:inline">
            / full stack
          </span>
        </Link>

        <nav aria-label={t("label")} className="hidden md:block">
          <ul className="flex items-center gap-1">
            {navItems.map((item) => {
              const active = pathname === item.href;

              return (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative inline-flex h-9 items-center rounded-md px-3 text-sm font-medium transition-colors",
                      active ? "text-fg" : "text-fg-muted hover:text-fg"
                    )}
                  >
                    {t(item.key)}
                    {active && (
                      <motion.span
                        layoutId="header-nav-indicator"
                        className="absolute inset-x-3 -bottom-3.5 h-px bg-accent"
                        transition={{ type: "spring", stiffness: 500, damping: 40 }}
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-1">
          <LanguageSwitcher />
          <a
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            className={iconButton}
            aria-label={`${tc("github")} (${tc("newTab")})`}
          >
            <FaGithub size={18} aria-hidden="true" />
          </a>
          <a
            href={site.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className={iconButton}
            aria-label={`${tc("linkedin")} (${tc("newTab")})`}
          >
            <FaLinkedin size={18} aria-hidden="true" />
          </a>
        </div>
      </div>
    </header>
  );
}
