export const site = {
  name: "Nielson Gomes",
  legalName: "Nielson da Silva Gomes",
  url: "https://portfolio-nielson.vercel.app",
  email: "nielsongomes16@gmail.com",
  github: "https://github.com/nielsongomesdev",
  linkedin: "https://linkedin.com/in/nielsongomesdev",
  certificates: "https://www.linkedin.com/in/nielsongomesdev/details/certifications/",
  cv: "/curriculo.pdf",
  city: "João Pessoa",
  region: "PB",
  country: "BR",
  employer: "Bloco Construções",
  almaMater: "Centro Universitário de João Pessoa (Unipê)",
} as const;

export type SkillGroupKey = "languages" | "frontend" | "backend" | "quality" | "tools" | "learning";

export const skillGroups: { key: SkillGroupKey; items: string[] }[] = [
  { key: "languages", items: ["TypeScript", "JavaScript", "SQL", "HTML", "CSS"] },
  { key: "frontend", items: ["React", "Next.js", "Tailwind CSS", "PWA", "Radix UI", "React Hook Form", "Zod", "Figma"] },
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
      "LLMs",
    ],
  },
  { key: "quality", items: ["Layered architecture", "Clean Code", "Testing", "Vitest", "OpenAPI"] },
  { key: "tools", items: ["Git", "GitHub", "GitLab", "Docker", "Scrum", "Trello"] },
  { key: "learning", items: ["AWS"] },
];
