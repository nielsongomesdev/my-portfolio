export type Project = {
  id: number;
  title: string;
  description: string;
  techs: string[];
  githubUrl: string;
  liveUrl: string;
  image: string;
  isPrivate: boolean;
  credentials?: string;
};

export const projectsData: Project[] = [
  {
    id: 1,
    title: "TechStation E-commerce",
    description:
      "Plataforma de vendas completa com carrinho de compras, integração de pagamentos e painel de administração.",
    techs: ["React", "TypeScript", "TanStack Router", "Node", "Tailwind", "Supabase"],
    githubUrl: "https://github.com/nielsongomesdev/techstation-ecommerce",
    liveUrl: "https://techstation-ecommerce.vercel.app/",
    image: "/techstation.png",
    isPrivate: false,
  },
  {
    id: 2,
    title: "MFRP (Gestão de Lanchonete)",
    description:
      "Sistema completo para gerenciamento de pedidos, controle de caixa e painel administrativo.",
    techs: ["Next.js", "React", "TypeScript", "Radix UI", "MongoDB", "Resend"],
    githubUrl: "",
    liveUrl: "https://mfrp-ten.vercel.app/login",
    image: "/mfrp.png",
    isPrivate: true,
    credentials: "User: admin | Senha: Admin123@",
  },
  {
    id: 3,
    title: "GitHub Search",
    description: "Aplicação construída como teste técnico para consumir a API pública do GitHub.",
    techs: ["React", "TypeScript", "i18next", "Chakra UI"],
    githubUrl: "https://github.com/nielsongomesdev/github-search-test",
    liveUrl: "https://github-search-test-three.vercel.app/",
    image: "/github-search.png",
    isPrivate: false,
  },
  {
    id: 4,
    title: "S&M PsyBookings",
    description: "Landing Page otimizada para alta conversão, focada em performance e design responsivo.",
    techs: ["HTML", "CSS", "JavaScript"],
    githubUrl: "https://github.com/nielsongomesdev/SM-PsyBookings",
    liveUrl: "https://sm-psybookings.com/",
    image: "/psybookings.png",
    isPrivate: false,
  },
];
