"use client";

import React, { useState } from "react";

interface ReferralModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ReferralModal({ isOpen, onClose }: ReferralModalProps) {
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
    
    const referralData = {
      referringProvider: formData.get('referringProvider') as string,
      providerEmail: formData.get('providerEmail') as string,
      providerPhone: formData.get('providerPhone') as string,
      clinicName: formData.get('clinicName') as string,
      clinicAddress: formData.get('clinicAddress') as string,
      clientName: formData.get('clientName') as string,
      clientAge: formData.get('clientAge') as string,
      clientEmail: formData.get('clientEmail') as string,
      clientPhone: formData.get('clientPhone') as string,
      primaryConcerns: formData.get('primaryConcerns') as string,
      currentServices: formData.get('currentServices') as string,
      insuranceInfo: formData.get('insuranceInfo') as string,
      urgencyLevel: formData.get('urgencyLevel') as string,
      additionalNotes: formData.get('additionalNotes') as string,
      preferredContactMethod: formData.get('preferredContactMethod') as string,
      referralDate: new Date().toISOString()
    };

    try {
      console.log('Submitting referral data:', referralData);
      
      const response = await fetch('/api/referrals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(referralData),
      });

      const result = await response.json();
      console.log('Response from server:', result);

      if (response.ok) {
        setSubmitStatus({ 
          success: true, 
          message: 'Thank you for your referral! We will contact you and the client within 24 hours to discuss next steps.' 
        });
        e.currentTarget.reset();
        // Close modal after a short delay to show success message
        setTimeout(() => {
          onClose();
          setSubmitStatus(null);
        }, 3000);
      } else {
        console.error('Server error:', result);
        setSubmitStatus({ 
          success: false, 
          error: result.error || 'There was an error submitting the referral. Please try again or contact us directly.' 
        });
      }
    } catch (error) {
      console.error('Network error:', error);
      setSubmitStatus({
        success: false,
        error: 'There was an error submitting the referral. Please try again or contact us directly.'
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
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 backdrop-blur-sm p-2 pt-8 sm:items-center sm:p-6"
      onClick={handleBackdropClick}
    >
      <div className="relative w-full max-w-4xl rounded-2xl sm:rounded-3xl border border-app-line bg-app-soft p-3 sm:p-6 md:p-8 shadow-2xl max-h-[95vh] overflow-y-auto">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-2 top-2 sm:right-4 sm:top-4 rounded-full p-2 text-app-muted hover:bg-white/50 hover:text-app-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-app-ink/20 z-10"
          aria-label={t.closeButton}
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header */}
        <div className="mb-4 sm:mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-3 sm:mb-4">
            <h2 className="text-lg font-semibold tracking-tight sm:text-2xl md:text-3xl pr-12 sm:pr-0">{t.form.title}</h2>
            <LangToggle lang={lang} setLang={setLang} />
          </div>
          <p className="text-xs sm:text-sm text-app-muted">{t.form.lead}</p>
        </div>

        {/* Form */}
        <form className="space-y-4 sm:space-y-6" onSubmit={handleSubmit}>
          {/* Referring Provider Information */}
          <div className="space-y-3 sm:space-y-4">
            <h3 className="text-base font-semibold sm:text-lg">{t.form.sections.provider.title}</h3>
            <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2">
              <Field 
                label={t.form.sections.provider.name} 
                id="referringProvider" 
                required 
                autoComplete="name"
              />
              <Field 
                label={t.form.sections.provider.email} 
                id="providerEmail" 
                type="email" 
                required 
                autoComplete="email"
              />
              <Field 
                label={t.form.sections.provider.phone} 
                id="providerPhone" 
                type="tel" 
                autoComplete="tel"
              />
              <Field 
                label={t.form.sections.provider.clinicName} 
                id="clinicName" 
                required 
              />
            </div>
            <Field 
              label={t.form.sections.provider.clinicAddress} 
              id="clinicAddress" 
              as="textarea" 
              rows={2}
            />
          </div>

          {/* Client Information */}
          <div className="space-y-3 sm:space-y-4">
            <h3 className="text-base font-semibold sm:text-lg">{t.form.sections.client.title}</h3>
            <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2">
              <Field 
                label={t.form.sections.client.name} 
                id="clientName" 
                required 
                autoComplete="name"
              />
              <Field 
                label={t.form.sections.client.age} 
                id="clientAge" 
                inputMode="numeric"
              />
              <Field 
                label={t.form.sections.client.email} 
                id="clientEmail" 
                type="email" 
                autoComplete="email"
              />
              <Field 
                label={t.form.sections.client.phone} 
                id="clientPhone" 
                type="tel" 
                autoComplete="tel"
              />
            </div>
          </div>

          {/* Clinical Information */}
          <div className="space-y-3 sm:space-y-4">
            <h3 className="text-base font-semibold sm:text-lg">{t.form.sections.clinical.title}</h3>
            <div className="space-y-3 sm:space-y-4">
              <Field 
                label={t.form.sections.clinical.primaryConcerns} 
                id="primaryConcerns" 
                as="textarea" 
                rows={3}
                required
              />
              <Field 
                label={t.form.sections.clinical.currentServices} 
                id="currentServices" 
                as="textarea" 
                rows={2}
              />
              <Field 
                label={t.form.sections.clinical.insuranceInfo} 
                id="insuranceInfo" 
                as="textarea" 
                rows={2}
              />
              <div>
                <label className="block text-sm font-medium text-app-ink/90 mb-2">
                  {t.form.sections.clinical.urgencyLevel}
                </label>
                <select 
                  name="urgencyLevel" 
                  id="urgencyLevel"
                  className="w-full rounded-lg sm:rounded-xl border border-app-line bg-white/70 px-3 py-3 sm:py-2 text-app-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-app-ink/20 text-base sm:text-sm"
                >
                  <option value="">Select urgency level</option>
                  <option value="routine">{t.form.sections.clinical.urgencyOptions.routine}</option>
                  <option value="moderate">{t.form.sections.clinical.urgencyOptions.moderate}</option>
                  <option value="urgent">{t.form.sections.clinical.urgencyOptions.urgent}</option>
                </select>
              </div>
              <Field 
                label={t.form.sections.clinical.additionalNotes} 
                id="additionalNotes" 
                as="textarea" 
                rows={3}
              />
            </div>
          </div>

          {/* Contact Preferences */}
          <div className="space-y-3 sm:space-y-4">
            <h3 className="text-base font-semibold sm:text-lg">{t.form.sections.contact.title}</h3>
            <div>
              <label className="block text-sm font-medium text-app-ink/90 mb-2">
                {t.form.sections.contact.preferredMethod}
              </label>
              <select 
                name="preferredContactMethod" 
                id="preferredContactMethod"
                className="w-full rounded-lg sm:rounded-xl border border-app-line bg-white/70 px-3 py-3 sm:py-2 text-app-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-app-ink/20 text-base sm:text-sm"
              >
                <option value="">Select preferred method</option>
                <option value="email">{t.form.sections.contact.methods.email}</option>
                <option value="phone">{t.form.sections.contact.methods.phone}</option>
                <option value="either">{t.form.sections.contact.methods.either}</option>
              </select>
            </div>
            <div className="text-sm text-app-muted bg-app-soft/50 p-3 rounded-lg">
              <p>{t.form.sections.contact.faxInfo}</p>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-2">
            <p className="text-xs sm:text-sm text-app-muted order-2 sm:order-1">{t.form.notice}</p>
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full sm:w-auto rounded-xl sm:rounded-2xl bg-app-ink px-4 py-3 sm:px-5 sm:py-2.5 text-sm font-medium text-app hover:bg-app-ink/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-app-ink/40 disabled:opacity-50 disabled:cursor-not-allowed order-1 sm:order-2"
            >
              {isSubmitting ? t.form.submitting : t.form.submit}
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
    form: {
      title: "Submit a Referral",
      lead: "Please provide the following information to help us serve your client effectively. All information will be kept confidential and used only for care coordination purposes.",
      submitting: "Submitting referral...",
      submit: "Submit Referral",
      notice: "By submitting, you agree to be contacted by Higher Ground Care regarding this referral.",
      sections: {
        provider: {
          title: "Referring Provider Information",
          name: "Provider Name",
          email: "Provider Email",
          phone: "Provider Phone",
          clinicName: "Clinic/Practice Name",
          clinicAddress: "Clinic Address"
        },
        client: {
          title: "Client Information",
          name: "Client Name",
          age: "Client Age",
          email: "Client Email (if available)",
          phone: "Client Phone (if available)"
        },
        clinical: {
          title: "Clinical Information",
          primaryConcerns: "Primary Speech/Language Concerns",
          currentServices: "Current Services Being Received",
          insuranceInfo: "Insurance Information",
          urgencyLevel: "Urgency Level",
          urgencyOptions: {
            routine: "Routine - Can wait 2-4 weeks",
            moderate: "Moderate - Needs services within 1-2 weeks",
            urgent: "Urgent - Needs immediate attention"
          },
          additionalNotes: "Additional Notes or Recommendations"
        },
        contact: {
          title: "Contact Preferences",
          preferredMethod: "Preferred Contact Method",
          methods: {
            email: "Email",
            phone: "Phone",
            either: "Either email or phone"
          },
          faxInfo: "Referral fax number available upon request by phone or through our Higher Ground Guide."
        }
      }
    },
    closeButton: "Close referral form"
  },
  es: {
    form: {
      title: "Enviar una Referencia",
      lead: "Por favor proporciona la siguiente información para ayudarnos a servir a tu cliente de manera efectiva. Toda la información se mantendrá confidencial y se usará solo para propósitos de coordinación de atención.",
      submitting: "Enviando referencia...",
      submit: "Enviar Referencia",
      notice: "Al enviar, aceptas que Higher Ground Care se comunique contigo respecto a esta referencia.",
      sections: {
        provider: {
          title: "Información del Proveedor que Refiere",
          name: "Nombre del Proveedor",
          email: "Correo del Proveedor",
          phone: "Teléfono del Proveedor",
          clinicName: "Nombre de la Clínica/Práctica",
          clinicAddress: "Dirección de la Clínica"
        },
        client: {
          title: "Información del Cliente",
          name: "Nombre del Cliente",
          age: "Edad del Cliente",
          email: "Correo del Cliente (si está disponible)",
          phone: "Teléfono del Cliente (si está disponible)"
        },
        clinical: {
          title: "Información Clínica",
          primaryConcerns: "Preocupaciones Principales de Habla/Lenguaje",
          currentServices: "Servicios Actuales que Recibe",
          insuranceInfo: "Información del Seguro",
          urgencyLevel: "Nivel de Urgencia",
          urgencyOptions: {
            routine: "Rutina - Puede esperar 2-4 semanas",
            moderate: "Moderada - Necesita servicios en 1-2 semanas",
            urgent: "Urgente - Necesita atención inmediata"
          },
          additionalNotes: "Notas Adicionales o Recomendaciones"
        },
        contact: {
          title: "Preferencias de Contacto",
          preferredMethod: "Método de Contacto Preferido",
          methods: {
            email: "Correo electrónico",
            phone: "Teléfono",
            either: "Correo electrónico o teléfono"
          },
          faxInfo: "Número de fax para referencias disponible bajo solicitud por teléfono o a través de nuestra Guía Higher Ground."
        }
      }
    },
    closeButton: "Cerrar formulario de referencia"
  }
} as const;

