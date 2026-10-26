import { FolderGit2, Home, Mail, User, type LucideIcon } from "lucide-react";

export type NavKey = "home" | "about" | "projects" | "contact";

export const navItems: { key: NavKey; href: "/" | "/about" | "/projects" | "/contact"; icon: LucideIcon }[] = [
  { key: "home", href: "/", icon: Home },
  { key: "about", href: "/about", icon: User },
  { key: "projects", href: "/projects", icon: FolderGit2 },
  { key: "contact", href: "/contact", icon: Mail },
];
