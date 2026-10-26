export const site = {
  name: "Nielson Gomes",
  legalName: "Nielson da Silva Gomes",
  url: "https://portfolio-nielson.vercel.app",
  email: "nielsongomes16@gmail.com",
  github: "https://github.com/nielsongomesdev",
  linkedin: "https://linkedin.com/in/nielsongomesdev",
  cv: "/curriculo.pdf",
  city: "João Pessoa",
  region: "PB",
  country: "BR",
} as const;

/** Chips shown in the hero. Every item is backed by the CV. */
export const coreStack = ["TypeScript", "React", "Next.js", "Node.js", "PostgreSQL", "Supabase"];

export type SkillGroupKey = "languages" | "frontend" | "backend" | "quality" | "tools" | "learning";

/** Grouped by purpose (no proficiency bars). Source: CV + public repositories. */
export const skillGroups: { key: SkillGroupKey; items: string[] }[] = [
  { key: "languages", items: ["TypeScript", "JavaScript", "SQL", "HTML", "CSS"] },
  { key: "frontend", items: ["React", "Next.js", "Tailwind CSS", "Radix UI", "React Hook Form", "Zod", "Figma"] },
  {
    key: "backend",
    items: [
      "Node.js",
      "REST APIs",
      "Express",
      "Fastify",
      "Prisma",
      "PostgreSQL",
      "Supabase",
      "MongoDB",
      "Row Level Security",
      "Auth & permissions",
    ],
  },
  { key: "quality", items: ["Layered architecture", "Clean Code", "Testing", "Vitest", "OpenAPI"] },
  { key: "tools", items: ["Git", "GitHub", "GitLab", "Docker", "Scrum", "Trello"] },
  { key: "learning", items: ["Java", "Spring Boot", "AWS"] },
];
