export type ProjectKey =
  | "techstation"
  | "mfrp"
  | "githubSearch"
  | "psybookings"
  | "techstationApi"
  | "monitorAns"
  | "projetoFilmes";

export type ProjectType = "product" | "test" | "landing" | "api" | "academic";

/**
 * `featured`: full-width card with screenshot, highlights and stack (home + projects page).
 * `secondary`: medium card with screenshot (projects page).
 * `compact`: text-only row, no screenshot available (projects page).
 */
export type ProjectTier = "featured" | "secondary" | "compact";

export type Project = {
  key: ProjectKey;
  type: ProjectType;
  tier: ProjectTier;
  techs: string[];
  /** Number of `highlights.hN` entries available in the messages file. */
  highlights: number;
  liveUrl?: string;
  githubUrl?: string;
  apiGithubUrl?: string;
  image?: { src: string; width: number; height: number };
  demoCredentials?: string;
};

// Ordered by professional relevance, not chronology.
export const projects: Project[] = [
  {
    key: "techstation",
    type: "product",
    tier: "featured",
    techs: [
      "React 19",
      "TypeScript",
      "Vite",
      "TanStack Router",
      "Tailwind CSS v4",
      "React Hook Form",
      "Zod",
      "Fastify",
      "Prisma",
      "PostgreSQL",
    ],
    highlights: 4,
    liveUrl: "https://techstation-ecommerce.vercel.app/",
    githubUrl: "https://github.com/nielsongomesdev/techstation-ecommerce",
    apiGithubUrl: "https://github.com/nielsongomesdev/techstation-api",
    image: { src: "/techstation.png", width: 1342, height: 622 },
  },
  {
    key: "mfrp",
    type: "product",
    tier: "featured",
    techs: ["Next.js", "React", "TypeScript", "Radix UI", "MongoDB", "Resend"],
    highlights: 3,
    liveUrl: "https://mfrp-ten.vercel.app/login",
    image: { src: "/mfrp.png", width: 1341, height: 622 },
    demoCredentials: "admin / Admin123@",
  },
  {
    key: "githubSearch",
    type: "test",
    tier: "secondary",
    techs: ["React 19", "TypeScript", "Chakra UI", "React Router", "i18next", "Zod", "Axios", "Vite"],
    highlights: 3,
    liveUrl: "https://github-search-test-three.vercel.app/",
    githubUrl: "https://github.com/nielsongomesdev/github-search-test",
    image: { src: "/github-search.png", width: 1349, height: 623 },
  },
  {
    key: "psybookings",
    type: "landing",
    tier: "secondary",
    techs: ["HTML5", "CSS3", "JavaScript"],
    highlights: 3,
    liveUrl: "https://sm-psybookings.com/",
    githubUrl: "https://github.com/nielsongomesdev/SM-PsyBookings",
    image: { src: "/psybookings.png", width: 1342, height: 628 },
  },
  {
    key: "techstationApi",
    type: "api",
    tier: "compact",
    techs: ["Node.js", "TypeScript", "Fastify", "Prisma", "PostgreSQL", "JWT", "Zod", "OpenAPI", "Vitest"],
    highlights: 0,
    githubUrl: "https://github.com/nielsongomesdev/techstation-api",
  },
  {
    key: "monitorAns",
    type: "test",
    tier: "compact",
    techs: ["Java 17", "Spring Boot", "Vue 3", "MySQL", "JUnit 5"],
    highlights: 0,
    githubUrl: "https://github.com/nielsongomesdev/monitor-ans-teste-tecnico",
  },
  {
    key: "projetoFilmes",
    type: "academic",
    tier: "compact",
    techs: ["React", "Vite", "TypeScript", "Express", "Prisma", "SQLite"],
    highlights: 0,
    liveUrl: "https://projeto-filmes-web.vercel.app",
    githubUrl: "https://github.com/nielsongomesdev/projeto-filmes-web",
  },
];

export const featuredProjects = projects.filter((p) => p.tier === "featured");
export const secondaryProjects = projects.filter((p) => p.tier === "secondary");
export const compactProjects = projects.filter((p) => p.tier === "compact");
