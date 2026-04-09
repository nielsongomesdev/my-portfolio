export const Contact = () => {
  const inputClasses =
    "w-full bg-transparent border border-white/10 rounded-lg p-4 text-white placeholder:text-white/40 focus:outline-none transition-all duration-300 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary";

  return (
    <section
      id="contact"
      className="relative w-full flex items-center justify-center min-h-dvh pt-20 pb-4 lg:min-h-screen lg:pt-28 lg:pb-12 overflow-hidden z-10"
    >
      <div className="max-w-3xl w-full mx-auto px-6 flex flex-col items-center z-20">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 lg:mb-12">
          Fale <span className="text-brand-primary">comigo</span>
        </h2>

        <form className="w-full flex flex-col gap-4">
          <div className="flex flex-col md:flex-row gap-4">
            <input type="text" placeholder="Nome" className={inputClasses} />
            <input type="email" placeholder="Email" className={inputClasses} />
          </div>

          <input type="text" placeholder="Assunto" className={inputClasses} />

          <textarea
            rows={6}
            placeholder="Mensagem"
            className={`${inputClasses} resize-none`}
          />

          <button
            type="button"
            className="mt-2 self-start px-10 py-3 rounded-full border border-white/20 text-white hover:bg-brand-primary hover:border-brand-primary transition-all duration-300 active:scale-95"
          >
            Enviar
          </button>
        </form>
      </div>
    </section>
  );
};
