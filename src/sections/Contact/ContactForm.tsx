import React, { useState } from "react";
import { useTranslations } from "next-intl";

interface ContactFormProps {
  onSuccess: () => void;
}

export const ContactForm = ({ onSuccess }: ContactFormProps) => {
  const t = useTranslations("contact.form");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);

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

  const sendEmail = async (e: Parameters<NonNullable<React.ComponentProps<"form">["onSubmit"]>>[0]) => {
    e.preventDefault();
    if (isSubmitting) return;

    const formElement = e.currentTarget;
    const formData = new FormData(formElement);
    const newErrors: Record<string, string> = {};

    const email = formData.get("user_email") as string;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.get("user_name")) newErrors.user_name = t("errors.nameRequired");

    if (!email) {
      newErrors.user_email = t("errors.emailRequired");
    } else if (!emailRegex.test(email)) {
      newErrors.user_email = t("errors.emailInvalid");
    }

    if (!formData.get("subject")) newErrors.subject = t("errors.subjectRequired");
    if (!formData.get("message")) newErrors.message = t("errors.messageRequired");

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setSubmitError(null);
    setIsSubmitting(true);
    try {
      const payload = {
        name: String(formData.get("user_name") || "").trim(),
        email: String(formData.get("user_email") || "").trim(),
        message: String(formData.get("message") || "").trim(),
        subject: String(formData.get("subject") || "").trim(),
      };

      const response = await fetch("/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = (await response.json().catch(() => null)) as { message?: string } | null;

      if (!response.ok) {
        throw new Error(data?.message || t("errors.submit"));
      }

      onSuccess();
      formElement.reset();
    } catch (error) {
      console.error("Falha ao enviar contato:", error);
      const message = error instanceof Error ? error.message : t("errors.submitLater");
      setSubmitError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={sendEmail} noValidate className="w-full flex flex-col gap-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full flex flex-col gap-1">
          <input
            type="text"
            name="user_name"
            placeholder={t("placeholders.name")}
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
            placeholder={t("placeholders.email")}
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
          placeholder={t("placeholders.subject")}
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
          placeholder={t("placeholders.message")}
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
        {isSubmitting ? t("sending") : t("send")}
      </button>

      {submitError && (
        <p aria-live="polite" className="text-sm text-brand-primary mt-1">
          {submitError}
        </p>
      )}
    </form>
  );
};