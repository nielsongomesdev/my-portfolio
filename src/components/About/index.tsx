import { ProfilePhoto } from "@/components/ProfilePhoto";
import { FaReact, FaNodeJs, FaGitAlt, FaHtml5, FaCss3Alt, FaJava, FaFigma, FaDocker } from "react-icons/fa";
import { SiNextdotjs, SiTailwindcss, SiTypescript, SiJavascript, SiExpress, SiFastify, SiPrisma, SiPostgresql, SiMongodb, SiSpring } from "react-icons/si";

const SkillRow = ({
  title,
  icons,
}: {
  title: string;
  icons: { label: string; icon: React.ReactNode }[];
}) => (
  <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-4 w-full">
    <span className="text-brand-muted text-sm md:text-base font-medium min-w-28 md:min-w-28.75 text-left sm:text-right">
      {title}
    </span>
    <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-white/80">
      {icons.map(({ label, icon }) => (
        <div
          key={label}
          className="group relative text-white/75 hover:text-white hover:scale-110 transition-all duration-300"
          aria-label={label}
        >
          {icon}
          <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md border border-white/15 bg-black/85 px-2 py-1 text-[11px] text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            {label}
          </span>
        </div>
      ))}
    </div>
  </div>
);

const SoftSkillTag = ({ text }: { text: string }) => (
  <div className="px-2 sm:px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-brand-muted text-[11px] sm:text-sm hover:text-white hover:bg-white/10 transition-all cursor-default text-center whitespace-nowrap">
    {text}
  </div>
);

export const About = () => {
  return (
    <section className="relative min-h-screen w-full flex items-start lg:items-center overflow-x-hidden pt-28 pb-28 lg:py-20">
      <div className="absolute bottom-0 left-0 z-0 h-[40%] sm:h-[50%] md:h-[60%] lg:h-[75%] xl:h-[85%] hidden md:flex items-end opacity-[0.04] lg:opacity-100 pointer-events-none transition-opacity duration-500">
        <ProfilePhoto 
          wrapperClassName="h-full" 
          imageClassName="object-left-bottom scale-x-[-1] drop-shadow-2xl" 
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-brand-primary/5 blur-3xl -z-10 rounded-full mix-blend-screen" />
      </div>

      <div className="relative z-10 max-w-7xl w-full mx-auto px-6 md:px-12 flex justify-end">
        <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-16 xl:gap-24 w-full md:w-[90%] lg:w-[85%] xl:w-[80%]">
          <div className="flex-1 flex flex-col gap-6 lg:mt-16 w-full">
            <h2 className="text-3xl md:text-5xl font-bold text-white text-left">
              Sobre <span className="text-brand-primary">mim</span>
            </h2>
            
            <div className="flex flex-col gap-4 text-brand-muted text-base md:text-lg leading-relaxed">
              <p>
                Mais do que linhas de código, construo soluções focadas em
                 arquitetura escalabilidade e clareza.
              </p>
              <p>
                Integro a IA como parceira estratégica no dia a dia para acelerar testes, refatorações e debugs, mantendo qualidade e consistência na entrega.
              </p>
              <p>
                Fora das telas, sou movido pela calma. É no silêncio da natureza ou acompanhando um bom anime que recarrego minha energia.
              </p>
            </div>
          </div>

          <div className="flex-1 flex flex-col gap-10 lg:mt-16 w-full">
              <h3 className="text-white font-semibold mb-1 sm:-mb-2 sm:ml-32.5 text-left">Hard Skills</h3>
              <SkillRow 
                title="Front-End:" 
                icons={[
                  { label: "HTML5", icon: <FaHtml5 size={26} key="html" /> },
                  { label: "CSS3", icon: <FaCss3Alt size={26} key="css" /> },
                  { label: "JavaScript", icon: <SiJavascript size={24} key="js" /> },
                  { label: "TypeScript", icon: <SiTypescript size={22} key="ts" /> },
                  { label: "React", icon: <FaReact size={26} key="react" /> },
                  { label: "Next.js", icon: <SiNextdotjs size={25} key="next" /> },
                  { label: "Tailwind", icon: <SiTailwindcss size={25} key="tailwind" /> }
                ]} 
              />
              <SkillRow 
                title="Design UI/UX:" 
                icons={[
                  { label: "Figma", icon: <FaFigma size={26} key="figma" /> }
                ]} 
              />
              <SkillRow 
                title="Back-End:" 
                icons={[
                  { label: "Node.js", icon: <FaNodeJs size={26} key="node" /> },
                  { label: "Express", icon: <SiExpress size={25} key="express" /> },
                  { label: "Fastify", icon: <SiFastify size={25} key="fastify" /> },
                  { label: "Prisma", icon: <SiPrisma size={25} key="prisma" /> },
                  { label: "PostgreSQL", icon: <SiPostgresql size={25} key="pg" /> },
                  { label: "MongoDB", icon: <SiMongodb size={25} key="mongo" /> },
                  { label: "Java", icon: <FaJava size={26} key="java" /> },
                  { label: "Spring", icon: <SiSpring size={25} key="spring" /> }
                ]} 
              />
              <SkillRow 
                title="Ferramentas:" 
                icons={[
                  { label: "Git", icon: <FaGitAlt size={26} key="git" /> },
                  { label: "Docker", icon: <FaDocker size={26} key="docker" /> }
                ]} 
              />

            <div className="flex flex-col gap-3 sm:gap-4">
              <h3 className="text-white font-semibold sm:ml-32.5 text-left">Soft Skills</h3>
              <div className="grid grid-cols-2 gap-2 sm:gap-3 sm:ml-32.5 w-full max-w-75 sm:max-w-none sm:w-max">
                <SoftSkillTag text="Trabalho em Equipe" />
                <SoftSkillTag text="Pensamento Crítico" />
                <SoftSkillTag text="Aprendizado Rápido" />
                <SoftSkillTag text="Empatia" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
};