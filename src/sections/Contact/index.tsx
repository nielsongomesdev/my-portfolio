"use client";
import { useState } from "react";
import { ContactForm } from "./ContactForm";
import { SuccessModal } from "./SuccessModal";

export const Contact = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <section
      id="contact"
      className="relative w-full flex items-center justify-center min-h-dvh pt-20 pb-4 lg:min-h-screen lg:pt-28 lg:pb-12 overflow-hidden z-10"
    >
      <div className="max-w-3xl w-full mx-auto px-6 flex flex-col items-center z-20">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 lg:mb-12">
          Fale <span className="text-brand-primary">comigo</span>
        </h2>

        <ContactForm onSuccess={() => setShowModal(true)} />
      </div>

      <SuccessModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </section>
  );
};
