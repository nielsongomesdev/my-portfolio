"use client";

import { Check, Send } from "lucide-react";
import { useTranslations } from "next-intl";
import { useId, useState, type FormEvent } from "react";
import { Button } from "@/components";
import { cn } from "@/utils/cn";

type FieldName = "user_name" | "user_email" | "subject" | "message";
type FieldErrors = Partial<Record<FieldName, string>>;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const inputClass =
  "w-full rounded-lg border border-border bg-bg/60 px-4 py-3 text-fg placeholder:text-fg-subtle transition-[border-color,box-shadow] duration-200 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/25 aria-[invalid=true]:border-accent [&:-webkit-autofill]:[-webkit-text-fill-color:var(--color-fg)] [&:-webkit-autofill]:[transition:background-color_9999s_ease-in-out_0s]";

const labelClass = "text-sm font-medium text-fg";

export function ContactForm() {
  const t = useTranslations("contact.form");
  const id = useId();
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitError, setSubmitError] = useState<string | null>(null);

  const fieldId = (name: FieldName) => `${id}-${name}`;
  const errorId = (name: FieldName) => `${id}-${name}-error`;

  const clearError = (name: FieldName) => {
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "submitting") return;

    const form = event.currentTarget;
    const data = new FormData(form);
    const values = {
      name: String(data.get("user_name") ?? "").trim(),
      email: String(data.get("user_email") ?? "").trim(),
      subject: String(data.get("subject") ?? "").trim(),
      message: String(data.get("message") ?? "").trim(),
      website: String(data.get("website") ?? ""),
    };

    const nextErrors: FieldErrors = {};
    if (!values.name) nextErrors.user_name = t("errors.nameRequired");
    if (!values.email) nextErrors.user_email = t("errors.emailRequired");
    else if (!EMAIL_REGEX.test(values.email)) nextErrors.user_email = t("errors.emailInvalid");
    if (!values.subject) nextErrors.subject = t("errors.subjectRequired");
    if (!values.message) nextErrors.message = t("errors.messageRequired");

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      const firstInvalid = (Object.keys(nextErrors) as FieldName[])[0];
      form.querySelector<HTMLElement>(`#${CSS.escape(fieldId(firstInvalid))}`)?.focus();
      return;
    }

    setErrors({});
    setSubmitError(null);
    setStatus("submitting");

    try {
      const response = await fetch("/api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const payload = (await response.json().catch(() => null)) as { message?: string } | null;

      if (!response.ok) {
        throw new Error(payload?.message || t("errors.submit"));
      }

      form.reset();
      setStatus("success");
    } catch (error) {
      console.error("Contact form error:", error);
      setSubmitError(error instanceof Error ? error.message : t("errors.submitLater"));
      setStatus("idle");
    }
  };

  if (status === "success") {
    return (
      <div
        role="status"
        className="flex flex-col items-start gap-4 rounded-2xl border border-border bg-bg-elevated p-8 sm:p-10"
      >
        <span className="inline-flex size-11 items-center justify-center rounded-full bg-accent-soft text-accent">
          <Check size={22} aria-hidden="true" />
        </span>
        <h2 className="text-2xl font-semibold tracking-tight">{t("success.title")}</h2>
        <p className="text-fg-muted">{t("success.description")}</p>
        <Button variant="secondary" onClick={() => setStatus("idle")} className="mt-2">
          {t("success.again")}
        </Button>
      </div>
    );
  }

  const renderError = (name: FieldName) =>
    errors[name] ? (
      <p id={errorId(name)} className="text-xs text-accent">
        {errors[name]}
      </p>
    ) : null;

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="flex flex-col gap-5 rounded-2xl border border-border bg-bg-elevated p-6 sm:p-8"
      aria-label={t("legend")}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor={fieldId("user_name")} className={labelClass}>
            {t("name")}
          </label>
          <input
            id={fieldId("user_name")}
            name="user_name"
            type="text"
            autoComplete="name"
            placeholder={t("placeholders.name")}
            onChange={() => clearError("user_name")}
            aria-invalid={Boolean(errors.user_name)}
            aria-describedby={errors.user_name ? errorId("user_name") : undefined}
            className={inputClass}
          />
          {renderError("user_name")}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor={fieldId("user_email")} className={labelClass}>
            {t("email")}
          </label>
          <input
            id={fieldId("user_email")}
            name="user_email"
            type="email"
            autoComplete="email"
            inputMode="email"
            placeholder={t("placeholders.email")}
            onChange={() => clearError("user_email")}
            aria-invalid={Boolean(errors.user_email)}
            aria-describedby={errors.user_email ? errorId("user_email") : undefined}
            className={inputClass}
          />
          {renderError("user_email")}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor={fieldId("subject")} className={labelClass}>
          {t("subject")}
        </label>
        <input
          id={fieldId("subject")}
          name="subject"
          type="text"
          placeholder={t("placeholders.subject")}
          onChange={() => clearError("subject")}
          aria-invalid={Boolean(errors.subject)}
          aria-describedby={errors.subject ? errorId("subject") : undefined}
          className={inputClass}
        />
        {renderError("subject")}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor={fieldId("message")} className={labelClass}>
          {t("message")}
        </label>
        <textarea
          id={fieldId("message")}
          name="message"
          rows={6}
          placeholder={t("placeholders.message")}
          onChange={() => clearError("message")}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? errorId("message") : undefined}
          className={cn(inputClass, "resize-y min-h-32")}
        />
        {renderError("message")}
      </div>

      {/* Honeypot: hidden from people, filled by naive bots. */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor={`${id}-website`}>Website</label>
        <input id={`${id}-website`} name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Button type="submit" size="lg" disabled={status === "submitting"} className="group self-start">
          {status === "submitting" ? t("sending") : t("send")}
          <Send
            size={16}
            aria-hidden="true"
            className="transition-transform duration-200 ease-out-expo group-hover:translate-x-0.5"
          />
        </Button>
        {submitError && (
          <p role="alert" className="text-sm text-accent">
            {submitError}
          </p>
        )}
      </div>
    </form>
  );
}
