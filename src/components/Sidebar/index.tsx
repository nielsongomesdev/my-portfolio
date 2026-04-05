import { Home, User, FolderGit2, Mail } from "lucide-react";
import Link from "next/link";

export const Sidebar = () => {
  return (
    <nav
      className="fixed z-50 bg-black/40 backdrop-blur-md border border-white/10 rounded-full flex 
        bottom-6 left-1/2 -translate-x-1/2 flex-row w-[90%] max-w-[320px] justify-between px-6 py-4 
        md:bottom-auto md:left-auto md:translate-x-0 md:right-4 md:top-[1/2] md:-translate-y-1/2 md:flex-col md:w-auto md:px-4 md:py-6 md:gap-8">

      <Link
        href="/"
        aria-label="Home"
        className="relative group text-brand-muted hover:text-brand-primary active:text-brand-primary transition active:scale-95 focus-visible:text-brand-primary focus-visible:outline-none flex items-center justify-center touch-manipulation" >
        <Home size={22} />
        <span className="hidden md:block absolute right-full mr-5 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-black/80 backdrop-blur-md border border-white/10 text-white text-xs font-medium rounded-md opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Home
        </span>
      </Link>

      <Link
        href="/about"
        aria-label="Sobre Mim"
        className="relative group text-brand-muted hover:text-brand-primary active:text-brand-primary transition active:scale-95 focus-visible:text-brand-primary focus-visible:outline-none flex items-center justify-center touch-manipulation">
        <User size={22} />
        <span className="hidden md:block absolute right-full mr-5 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-black/80 backdrop-blur-md border border-white/10 text-white text-xs font-medium rounded-md opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Sobre Mim
        </span>
      </Link>

      <Link
        href="/projects"
        aria-label="Projetos"
        className="relative group text-brand-muted hover:text-brand-primary active:text-brand-primary transition active:scale-95 focus-visible:text-brand-primary focus-visible:outline-none flex items-center justify-center touch-manipulation"
        >
        <FolderGit2 size={22} />
        <span className="hidden md:block absolute right-full mr-5 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-black/80 backdrop-blur-md border border-white/10 text-white text-xs font-medium rounded-md opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Projetos
        </span>
      </Link>

      <Link
        href="/contact"
        aria-label="Contato"
        className="relative group text-brand-muted hover:text-brand-primary active:text-brand-primary transition active:scale-95 focus-visible:text-brand-primary focus-visible:outline-none flex items-center justify-center touch-manipulation">
          
        <Mail size={22} />
        <span className="hidden md:block absolute right-full mr-5 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-black/80 backdrop-blur-md border border-white/10 text-white text-xs font-medium rounded-md opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Contato
        </span>
      </Link>
    </nav>
  );
};
