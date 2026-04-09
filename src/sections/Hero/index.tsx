import { ProfilePhoto } from "@/components";

export const Hero = () => {
  return (
    <section className="relative w-full h-screen flex items-center bg-brand-bg text-brand-text overflow-hidden">
      <div className="absolute inset-0 z-1 bg-linear-to-b from-black/45 via-black/20 to-transparent md:hidden pointer-events-none" />

      <div className="relative z-10 max-w-7xl w-full mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between">
        <div className="flex-1 flex flex-col gap-6 text-center md:text-left max-w-2xl mt-16 md:mt-0">
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            Desenvolvedor <br />
            Full <span className="text-brand-primary">Stack</span>
          </h1>

          <p className="text-base md:text-lg text-brand-muted leading-relaxed mt-2">
            Focado em criar soluções escaláveis, performáticas e com uma
            excelente experiência de usuário. Transformo ideias em soluções
            digitais.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 mt-4">
            <button className="w-full sm:w-auto bg-brand-primary text-brand-text px-8 py-3 rounded-md font-semibold hover:opacity-80 transition-opacity">
              Entrar em contato
            </button>
            <button className="w-full sm:w-auto border border-brand-muted text-brand-text px-8 py-3 rounded-md font-semibold hover:border-brand-primary hover:text-brand-primary transition-colors">
              Download CV
            </button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 right-0 z-0 h-[65%] md:h-[85%] lg:h-[95%] flex items-end justify-end pointer-events-none opacity-20 md:opacity-100">
        <ProfilePhoto
          wrapperClassName="h-full"
          imageClassName="left-auto right-0 object-bottom-right drop-shadow-xl"
        />

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-brand-primary/6 blur-2xl -z-10 rounded-full mix-blend-screen" />
      </div>
    </section>
  );
};
