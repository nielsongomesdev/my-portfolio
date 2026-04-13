import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SuccessModal = ({ isOpen, onClose }: SuccessModalProps) => {
  const t = useTranslations("contact.successModal");
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const lastFocusedElementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    lastFocusedElementRef.current = document.activeElement as HTMLElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    closeButtonRef.current?.focus();

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = previousOverflow;
      lastFocusedElementRef.current?.focus();
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center px-4 bg-black/70 backdrop-blur-sm transition-opacity">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-success-title"
        aria-describedby="contact-success-description"
        className="bg-[#121212] border border-white/10 p-8 rounded-2xl w-full max-w-sm flex flex-col items-center text-center shadow-2xl animate-in fade-in zoom-in duration-300"
      >
        <div className="w-16 h-16 rounded-full bg-brand-primary/20 flex items-center justify-center mb-6">
          <svg className="w-8 h-8 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <h3 id="contact-success-title" className="text-2xl font-bold text-white mb-2">{t("title")}</h3>
        <p id="contact-success-description" className="text-white/60 mb-8">
          {t("description")}
        </p>
        <button
          ref={closeButtonRef}
          onClick={onClose}
          className="w-full py-3 px-6 bg-brand-primary text-white rounded-full font-medium hover:brightness-110 transition-all duration-300 active:scale-95"
        >
          {t("close")}
        </button>
      </div>
    </div>
  );
};