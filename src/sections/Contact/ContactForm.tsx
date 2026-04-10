import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

interface ContactFormProps {
  onSuccess: () => void;
}

export const ContactForm = ({ onSuccess }: ContactFormProps) => {
  const form = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const getInputClasses = (fieldName: string) => {
    const baseClasses =
      "w-full bg-transparent border rounded-lg p-4 text-white placeholder:text-white/40 focus:outline-none transition-all duration-300 focus:ring-1 [&:-webkit-autofill]:[transition:background-color_9999s_ease-in-out_0s] [&:-webkit-autofill]:[-webkit-text-fill-color:white]";

    const borderClasses = errors[fieldName]
      ? "border-brand-primary focus:border-brand-primary focus:ring-brand-primary"
      : "border-white/10 focus:border-brand-primary focus:ring-brand-primary";

    return `${baseClasses} ${borderClasses}`;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const fieldName = e.target.name;
    if (errors[fieldName]) {
      setErrors((prev) => ({ ...prev, [fieldName]: "" }));
    }
  };

  const sendEmail = (e: Parameters<NonNullable<React.ComponentProps<"form">["onSubmit"]>>[0]) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const newErrors: Record<string, string> = {};

    const email = formData.get("user_email") as string;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.get("user_name")) newErrors.user_name = "Por favor, informe seu nome.";

    if (!email) {
      newErrors.user_email = "Por favor, informe seu e-mail.";
    } else if (!emailRegex.test(email)) {
      newErrors.user_email = "Informe um e-mail válido.";
    }

    if (!formData.get("subject")) newErrors.subject = "Por favor, informe o assunto.";
    if (!formData.get("message")) newErrors.message = "A mensagem não pode estar vazia.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    if (!form.current) return;

    setIsSubmitting(true);

    const SERVICE_ID = "service_7t2smgc";
    const TEMPLATE_ID = "template_8f70oiq";
    const PUBLIC_KEY = "yMJ7ieaIhjPizDjb7";

    emailjs
      .sendForm(SERVICE_ID, TEMPLATE_ID, form.current, { publicKey: PUBLIC_KEY })
      .then(
        () => {
          onSuccess();
          form.current?.reset();
        },
        (error) => {
          console.error("FAILED...", error.text);
          alert("Erro ao enviar mensagem. Tente novamente mais tarde.");
        }
      )
      .finally(() => setIsSubmitting(false));
  };

  return (
    <form ref={form} onSubmit={sendEmail} noValidate className="w-full flex flex-col gap-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full flex flex-col gap-1">
          <input
            type="text"
            name="user_name"
            placeholder="Nome"
            onChange={handleInputChange}
            aria-invalid={Boolean(errors.user_name)}
            aria-describedby={errors.user_name ? "user_name-error" : undefined}
            className={getInputClasses("user_name")}
          />
          {errors.user_name && (
            <span id="user_name-error" aria-live="polite" className="text-brand-primary text-xs pl-2">
              {errors.user_name}
            </span>
          )}
        </div>

        <div className="w-full flex flex-col gap-1">
          <input
            type="email"
            name="user_email"
            placeholder="Email"
            onChange={handleInputChange}
            aria-invalid={Boolean(errors.user_email)}
            aria-describedby={errors.user_email ? "user_email-error" : undefined}
            className={getInputClasses("user_email")}
          />
          {errors.user_email && (
            <span id="user_email-error" aria-live="polite" className="text-brand-primary text-xs pl-2">
              {errors.user_email}
            </span>
          )}
        </div>
      </div>

      <div className="w-full flex flex-col gap-1">
        <input
          type="text"
          name="subject"
          placeholder="Assunto"
          onChange={handleInputChange}
          aria-invalid={Boolean(errors.subject)}
          aria-describedby={errors.subject ? "subject-error" : undefined}
          className={getInputClasses("subject")}
        />
        {errors.subject && (
          <span id="subject-error" aria-live="polite" className="text-brand-primary text-xs pl-2">
            {errors.subject}
          </span>
        )}
      </div>

      <div className="w-full flex flex-col gap-1">
        <textarea
          name="message"
          rows={6}
          placeholder="Mensagem"
          onChange={handleInputChange}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={`${getInputClasses("message")} resize-none`}
        />
        {errors.message && (
          <span id="message-error" aria-live="polite" className="text-brand-primary text-xs pl-2">
            {errors.message}
          </span>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-2 self-start px-10 py-3 rounded-full border border-white/20 text-white hover:bg-brand-primary hover:border-brand-primary transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Enviando..." : "Enviar"}
      </button>
    </form>
  );
};