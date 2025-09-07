"use client";

import React, { useState } from "react";
import { submitContactForm, ContactFormData } from "@/lib/supabase";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [lang, setLang] = React.useState<"en" | "es">("en");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    success?: boolean;
    message?: string;
    error?: string;
  } | null>(null);
  
  const t = translations[lang];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    const formData = new FormData(e.currentTarget);
    
    // Debug: Log all form data
    console.log('Form data collected:');
    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });
    
    const contactData: ContactFormData = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      childAge: formData.get('age') as string,
      message: formData.get('message') as string,
    };
    
    console.log('Contact data object:', contactData);

    try {
      console.log('About to call submitContactForm...');
      const result = await submitContactForm(contactData);
      console.log('submitContactForm returned:', result);
      
      if (result.success) {
        console.log('Form submission successful!');
        setSubmitStatus({ success: true, message: 'Thanks! We\'ll reply within 1–2 business days.' });
        // Reset form on success
        e.currentTarget.reset();
        // Close modal after a short delay to show success message
        setTimeout(() => {
          onClose();
          setSubmitStatus(null);
        }, 2000);
      } else {
        console.log('Form submission failed with result:', result);
        const errorMessage = result.error || 'We couldn\'t submit the form. Email us at highergroundslp@gmail.com';
        setSubmitStatus({ success: false, error: errorMessage });
      }
    } catch (error) {
      console.error('Contact form error:', error);
      const errorMessage = error instanceof Error ? error.message : 'We couldn\'t submit the form. Email us at highergroundslp@gmail.com';
      setSubmitStatus({
        success: false,
        error: errorMessage
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 backdrop-blur-sm p-4 pt-16 sm:items-center sm:p-6"
      onClick={handleBackdropClick}
    >
      <div className="relative w-full max-w-lg sm:max-w-2xl rounded-2xl sm:rounded-3xl border border-app-line bg-app-soft p-4 sm:p-6 md:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-3 top-3 sm:right-4 sm:top-4 rounded-full p-2 text-app-muted hover:bg-white/50 hover:text-app-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-app-ink/20 z-10"
          aria-label={t.closeButton}
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header */}
        <div className="mb-4 sm:mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-3 sm:mb-4">
            <h2 className="text-xl font-semibold tracking-tight sm:text-2xl md:text-3xl pr-12 sm:pr-0">{t.title}</h2>
            <LangToggle lang={lang} setLang={setLang} />
          </div>
          <p className="text-sm sm:text-base text-app-muted">{t.lead}</p>
        </div>

        {/* Form */}
        <form className="space-y-3 sm:space-y-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2">
            <Field label={t.fields.name} id="name" autoComplete="name" required />
            <Field label={t.fields.email} id="email" type="email" autoComplete="email" required />
            <Field label={t.fields.phone} id="phone" autoComplete="tel" />
            <Field label={t.fields.childAge} id="age" inputMode="numeric" />
          </div>
          
          <div>
            <Field label={t.fields.message} id="message" as="textarea" rows={4} required />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-2">
            <p className="text-xs sm:text-sm text-app-muted order-2 sm:order-1">{t.notice}</p>
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full sm:w-auto rounded-xl sm:rounded-2xl bg-app-ink px-4 py-3 sm:px-5 sm:py-2.5 text-sm font-medium text-app hover:bg-app-ink/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-app-ink/40 disabled:opacity-50 disabled:cursor-not-allowed order-1 sm:order-2"
            >
              {isSubmitting ? t.submitting : t.submit}
            </button>
          </div>
          
          {/* Status Messages */}
          {submitStatus && (
            <div className="mt-4 p-3 sm:p-4 rounded-xl border text-sm">
              {submitStatus.success ? (
                <div className="text-green-700 bg-green-50 border-green-200">
                  {submitStatus.message}
                </div>
              ) : (
                <div className="text-red-700 bg-red-50 border-red-200">
                  {submitStatus.error}
                </div>
              )}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

function Field({ 
  label, 
  id, 
  as, 
  rows, 
  type = "text", 
  inputMode, 
  autoComplete, 
  required = false 
}: { 
  label: string; 
  id: string; 
  as?: "textarea"; 
  rows?: number; 
  type?: string; 
  inputMode?: React.InputHTMLAttributes<HTMLInputElement>["inputMode"]; 
  autoComplete?: string; 
  required?: boolean;
}) {
  const shared = "mt-2 w-full rounded-lg sm:rounded-xl border border-app-line bg-white/70 px-3 py-3 sm:py-2 text-app-ink placeholder:text-app-muted/70 shadow-[inset_0_1px_0_rgba(0,0,0,0.02)] focus:outline-none focus-visible:ring-2 focus-visible:ring-app-ink/20 text-base sm:text-sm";
  
  return (
    <label className="block">
      <span className="text-sm font-medium text-app-ink/90">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </span>
      {as === "textarea" ? (
        <textarea name={id} id={id} rows={rows} className={shared} required={required} />
      ) : (
        <input 
          name={id}
          id={id} 
          type={type} 
          inputMode={inputMode} 
          autoComplete={autoComplete} 
          className={shared} 
          required={required}
        />
      )}
    </label>
  );
}

function LangToggle({ lang, setLang, }: { lang: "en" | "es"; setLang: React.Dispatch<React.SetStateAction<"en" | "es">>; }) {
  return (
    <div className="inline-flex items-center rounded-lg sm:rounded-xl border border-app-line bg-app-soft p-1" role="group" aria-label="Language toggle">
      <button onClick={() => setLang("en")} className={`rounded-md sm:rounded-lg px-2.5 sm:px-3 py-1.5 text-xs font-medium ${lang === "en" ? "bg-white shadow-sm" : "opacity-70 hover:opacity-100"}`} aria-pressed={lang === "en"}>EN</button>
      <button onClick={() => setLang("es")} className={`rounded-md sm:rounded-lg px-2.5 sm:px-3 py-1.5 text-xs font-medium ${lang === "es" ? "bg-white shadow-sm" : "opacity-70 hover:opacity-100"}`} aria-pressed={lang === "es"}>ES</button>
    </div>
  );
}

const translations = {
  en: {
    title: "Contact & Booking",
    lead: "Have questions or ready to begin? Send a note and we'll reply with next steps and a link to schedule.",
    closeButton: "Close contact form",
    fields: {
      name: "Your name",
      email: "Email",
      phone: "Phone",
      childAge: "Child's age",
      message: "How can we help?"
    },
    notice: "By submitting, you agree to be contacted by Higher Ground Speech Therapy.",
    submit: "Send message",
    submitting: "Sending...",
    errors: {
      unexpected: "An unexpected error occurred. Please try again."
    }
  },
  es: {
    title: "Contacto y Citas",
    lead: "¿Tienes preguntas o estás listo para comenzar? Envíanos un mensaje y te responderemos con los siguientes pasos y un enlace para agendar.",
    closeButton: "Cerrar formulario de contacto",
    fields: {
      name: "Tu nombre",
      email: "Correo electrónico",
      phone: "Teléfono",
      childAge: "Edad del/de la niñ@",
      message: "¿Cómo podemos ayudar?"
    },
    notice: "Al enviar, aceptas que Higher Ground Speech Therapy se comunique contigo.",
    submit: "Enviar mensaje",
    submitting: "Enviando...",
    errors: {
      unexpected: "Ocurrió un error inesperado. Por favor, inténtalo de nuevo."
    }
  },
} as const;
