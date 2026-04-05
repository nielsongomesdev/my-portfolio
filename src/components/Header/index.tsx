import { FaGithub, FaLinkedin } from "react-icons/fa";
import Link from "next/link";

export const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full p-6 md:px-12 flex justify-between items-center z-50 bg-black/40 backdrop-blur-md border-b border-white/5 md:bg-transparent md:backdrop-blur-none md:border-none">
      <div className="text-xl font-bold tracking-wide text-white">
        Nielson Gomes
      </div>

      <nav className="flex items-center gap-5">
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
