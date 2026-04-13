"use client";

import { FaGithub, FaLinkedin } from "react-icons/fa";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export const Header = () => {
  const t = useTranslations("header");

  return (
    <header className="fixed top-0 left-0 w-full p-6 md:px-12 flex justify-between items-center z-50 bg-white/5 backdrop-blur-lg border-b border-white/10 md:bg-transparent md:backdrop-blur-none md:border-transparent transition-all duration-300">
      <div className="text-xl font-bold tracking-wide text-white">{t("name")}</div>

      <nav className="flex items-center gap-5">
        <LanguageSwitcher />

        <Link
          href="https://github.com/nielsongomesdev"
          target="_blank"
          rel="noopener noreferrer"
          className="text-brand-muted hover:text-white hover:scale-110 transition-all duration-300"
        >
          <FaGithub size={24} />
        </Link>

        <Link
          href="https://linkedin.com/in/nielsongomesdev"
          target="_blank"
          rel="noopener noreferrer"
          className="text-brand-muted hover:text-white hover:scale-110 transition-all duration-300"
        >
          <FaLinkedin size={24} />
        </Link>
      </nav>
    </header>
  );
};