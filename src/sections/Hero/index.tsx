import { ProfilePhoto, ParticlesBackground } from "@/components";
import { Download } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative w-full h-screen flex flex-col justify-center md:flex-row md:items-center text-brand-text overflow-hidden">
      <ParticlesBackground />

      <div className="absolute inset-0 z-1 bg-linear-to-b md:bg-linear-to-r from-brand-bg/95 via-brand-bg/80 to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-7xl w-full mx-auto px-6 md:px-12 flex flex-col md:flex-row items-start md:items-center justify-between">
        <div className="flex-1 flex flex-col gap-5 text-left max-w-2xl z-20 mb-[15vh] md:mb-0 mt-20 md:mt-0">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold leading-tight drop-shadow-lg">
            Desenvolvedor <br />
            Full <span className="text-brand-primary">Stack</span>
          </h1>

          <p className="text-base md:text-lg text-white/90 leading-relaxed max-w-[90%] md:max-w-xl drop-shadow-md">
            Focado em criar soluções escaláveis, performáticas e com uma
            excelente experiência de usuário. Transformo ideias em soluções
            digitais.
          </p>

          <div className="mt-4 md:mt-8 flex justify-start">
            <a
              href="/curriculo.pdf"
              download="SeuNome_CV_FullStack.pdf"
              className="inline-flex items-center justify-center gap-2 bg-brand-primary text-brand-text px-6 py-3 sm:px-10 sm:py-3.5 rounded-md border border-white/10 ring-1 ring-white/10 ring-inset font-semibold tracking-wide shadow-lg shadow-brand-primary/30 hover:brightness-110 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-brand-primary/40 active:translate-y-0 active:scale-[0.99] transition-all duration-300"
            >
              <Download size={18} aria-hidden="true" />
              <span>Baixar CV</span>
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 right-[-10%] sm:right-0 z-0 h-[50%] sm:h-[65%] md:h-[85%] lg:h-[95%] flex items-end justify-end pointer-events-none opacity-65 md:opacity-100 md:brightness-100 transition-all duration-500">
        <ProfilePhoto
          wrapperClassName="h-full"
          imageClassName="left-auto right-0 object-bottom-right drop-shadow-2xl"
        />

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-brand-primary/10 blur-3xl -z-10 rounded-full mix-blend-screen" />
      </div>
    </section>
  );
};