"use client";

import { Home, User, FolderGit2, Mail } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export const Sidebar = () => {
  const t = useTranslations("sidebar");

  return (
    <nav
      className="fixed z-50 bg-black/40 backdrop-blur-md border border-white/10 rounded-full flex 
        bottom-6 left-1/2 -translate-x-1/2 flex-row w-[90%] max-w-[320px] justify-between px-6 py-4 
        md:bottom-auto md:left-auto md:translate-x-0 md:right-10 md:top-[40%] md:-translate-y-1/2 md:flex-col md:w-auto md:px-4 md:py-6 md:gap-8 md:bg-black/28 md:border-white/5 md:backdrop-blur-sm">

      <Link
        href="/"
        aria-label={t("home")}
        className="relative group text-brand-muted hover:text-brand-primary active:text-brand-primary transition active:scale-95 focus-visible:text-brand-primary focus-visible:outline-none flex items-center justify-center touch-manipulation"
      >
        <Home size={22} />
        <span className="hidden md:block absolute right-full mr-5 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-black/80 backdrop-blur-md border border-white/10 text-white text-xs font-medium rounded-md opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap">
          {t("home")}
        </span>
      </Link>

      <Link
        href="/about"
        aria-label={t("about")}
        className="relative group text-brand-muted hover:text-brand-primary active:text-brand-primary transition active:scale-95 focus-visible:text-brand-primary focus-visible:outline-none flex items-center justify-center touch-manipulation">
        <User size={22} />
        <span className="hidden md:block absolute right-full mr-5 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-black/80 backdrop-blur-md border border-white/10 text-white text-xs font-medium rounded-md opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap">
          {t("about")}
        </span>
      </Link>

      <Link
        href="/projects"
        aria-label={t("projects")}
        className="relative group text-brand-muted hover:text-brand-primary active:text-brand-primary transition active:scale-95 focus-visible:text-brand-primary focus-visible:outline-none flex items-center justify-center touch-manipulation"
      >
        <FolderGit2 size={22} />
        <span className="hidden md:block absolute right-full mr-5 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-black/80 backdrop-blur-md border border-white/10 text-white text-xs font-medium rounded-md opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap">
          {t("projects")}
        </span>
      </Link>

      <Link
        href="/contact"
        aria-label={t("contact")}
        className="relative group text-brand-muted hover:text-brand-primary active:text-brand-primary transition active:scale-95 focus-visible:text-brand-primary focus-visible:outline-none flex items-center justify-center touch-manipulation"
      >
        <Mail size={22} />
        <span className="hidden md:block absolute right-full mr-5 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-black/80 backdrop-blur-md border border-white/10 text-white text-xs font-medium rounded-md opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap">
          {t("contact")}
        </span>
      </Link>
    </nav>
  );
};