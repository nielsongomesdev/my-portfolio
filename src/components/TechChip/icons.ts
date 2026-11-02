import { createElement, type ComponentType, type ReactElement } from "react";
import { FaAws, FaJava } from "react-icons/fa6";
import {
  SiAxios,
  SiChakraui,
  SiCss,
  SiDocker,
  SiExpress,
  SiFastify,
  SiFigma,
  SiGit,
  SiGithub,
  SiGitlab,
  SiHtml5,
  SiJavascript,
  SiJsonwebtokens,
  SiJunit5,
  SiMongodb,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiOpenapiinitiative,
  SiPostgresql,
  SiPrisma,
  SiPwa,
  SiRadixui,
  SiReact,
  SiReacthookform,
  SiReactrouter,
  SiResend,
  SiSpringboot,
  SiSqlite,
  SiSupabase,
  SiTailwindcss,
  SiTrello,
  SiTypescript,
  SiVite,
  SiVitest,
  SiVuedotjs,
  SiZod,
} from "react-icons/si";

type IconComponent = ComponentType<{ size?: number; color?: string; "aria-hidden"?: boolean }>;

const LIGHT = "#f4f4f5";

const icons: Record<string, { icon: IconComponent; color: string }> = {
  typescript: { icon: SiTypescript, color: "#3178C6" },
  javascript: { icon: SiJavascript, color: "#F7DF1E" },
  html: { icon: SiHtml5, color: "#E34F26" },
  html5: { icon: SiHtml5, color: "#E34F26" },
  css: { icon: SiCss, color: "#8B5CF6" },
  css3: { icon: SiCss, color: "#8B5CF6" },
  react: { icon: SiReact, color: "#61DAFB" },
  "next.js": { icon: SiNextdotjs, color: LIGHT },
  "tailwind css": { icon: SiTailwindcss, color: "#06B6D4" },
  pwa: { icon: SiPwa, color: "#A78BFA" },
  "radix ui": { icon: SiRadixui, color: LIGHT },
  "react hook form": { icon: SiReacthookform, color: "#F472B6" },
  zod: { icon: SiZod, color: "#5B8DEF" },
  figma: { icon: SiFigma, color: "#F24E1E" },
  "node.js": { icon: SiNodedotjs, color: "#5FA04E" },
  express: { icon: SiExpress, color: LIGHT },
  fastify: { icon: SiFastify, color: LIGHT },
  prisma: { icon: SiPrisma, color: LIGHT },
  postgresql: { icon: SiPostgresql, color: "#7AA7FF" },
  supabase: { icon: SiSupabase, color: "#3FCF8E" },
  mongodb: { icon: SiMongodb, color: "#47A248" },
  vitest: { icon: SiVitest, color: "#729B1B" },
  openapi: { icon: SiOpenapiinitiative, color: "#6BA539" },
  git: { icon: SiGit, color: "#F05032" },
  github: { icon: SiGithub, color: LIGHT },
  gitlab: { icon: SiGitlab, color: "#FC6D26" },
  docker: { icon: SiDocker, color: "#2496ED" },
  trello: { icon: SiTrello, color: "#4C9AFF" },
  aws: { icon: FaAws, color: "#FF9900" },
  vite: { icon: SiVite, color: "#9499FF" },
  "react router": { icon: SiReactrouter, color: "#E85B5E" },
  axios: { icon: SiAxios, color: "#8B6CF0" },
  "chakra ui": { icon: SiChakraui, color: "#319795" },
  resend: { icon: SiResend, color: LIGHT },
  jwt: { icon: SiJsonwebtokens, color: LIGHT },
  java: { icon: FaJava, color: "#ED8B00" },
  "spring boot": { icon: SiSpringboot, color: "#6DB33F" },
  vue: { icon: SiVuedotjs, color: "#4FC08D" },
  mysql: { icon: SiMysql, color: "#4E8CC2" },
  "junit 5": { icon: SiJunit5, color: "#25A162" },
  sqlite: { icon: SiSqlite, color: "#4FA3D1" },
};

const normalize = (name: string) =>
  name
    .toLowerCase()
    .replace(/\s+v?\d+(\.\d+)*$/, "")
    .trim();

const lookup = (name: string) => icons[name.toLowerCase()] ?? icons[normalize(name)];

export function hasTechIcon(name: string): boolean {
  return Boolean(lookup(name));
}

export function renderTechIcon(name: string, size = 22): ReactElement | null {
  const entry = lookup(name);
  return entry ? createElement(entry.icon, { size, color: entry.color, "aria-hidden": true }) : null;
}
