"use client";

import React from "react";
import { BRAND } from "../config";
import { useContactModal } from "@/components/ContactModalProvider";
import { useReferralModal } from "@/components/ReferralModalProvider";
import Header from "@/components/Header";
import InsuranceLogos from "@/components/InsuranceLogos";


export default function ReferralsPage() {
  const [lang, setLang] = React.useState<"en" | "es">("en");
  const { openContactModal } = useContactModal();
  const { openReferralModal } = useReferralModal();

  const t = translations[lang];

  return (
    <main className="min-h-dvh bg-app text-app-ink antialiased">
      <StyleTokens />
      
      {/* Skip link */}
      <a href="#content" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded-xl focus:bg-app-ink focus:px-3 focus:py-2 focus:text-app">
        {t.skip}
      </a>

      {/* Header */}
      <Header lang={lang} setLang={setLang} openContactModal={openContactModal} />

      {/* Hero Section */}
      <section className="border-b border-app-line bg-[linear-gradient(180deg,rgba(255,255,255,.6),rgba(255,255,255,.4))]">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-20 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
              {t.hero.title}
            </h1>
            <p className="mt-4 text-lg text-app-muted max-w-3xl mx-auto">
              {t.hero.lead}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section id="content" className="border-b border-app-line">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-20 lg:px-8">
          <div className="mx-auto max-w-4xl">
            
            {/* Benefits Section */}
            <div className="mb-12">
              <h2 className="text-2xl font-semibold tracking-tight mb-6">{t.benefits.title}</h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {t.benefits.items.map((benefit, index) => (
                  <div key={index} className="rounded-2xl border border-app-line bg-app-soft p-6">
                    <h3 className="text-lg font-semibold mb-3">{benefit.title}</h3>
                    <p className="text-app-muted">{benefit.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Referral Form CTA */}
            <div className="rounded-2xl border border-app-line bg-app-soft p-6 sm:p-8 text-center">
              <h2 className="text-2xl font-semibold tracking-tight mb-4">{t.form.title}</h2>
              <p className="text-app-muted mb-8 max-w-2xl mx-auto">{t.form.lead}</p>
              
              <div className="space-y-4">
                <button 
                  onClick={openReferralModal}
                  className="w-full sm:w-auto rounded-2xl bg-app-ink px-8 py-4 text-base font-medium text-app hover:bg-app-ink/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-app-ink/40 transition-colors"
                >
                  {t.form.submit}
                </button>
                
                <div className="text-sm text-app-muted">
                  <p>{t.form.notice}</p>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="mt-12 text-center">
              <h2 className="text-2xl font-semibold tracking-tight mb-4">{t.contact.title}</h2>
              <p className="text-app-muted mb-6">{t.contact.lead}</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="mailto:info@highergroundcare.com"
                  className="inline-block rounded-2xl bg-[color:var(--green)] px-6 py-3 text-sm font-medium text-app-ink/90 hover:opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--green)]/40"
                >
                  Email Us
                </a>
                <a 
                  href="tel:+15551234567"
                  className="inline-block rounded-2xl border border-app-line bg-white/70 px-6 py-3 text-sm font-medium text-app-ink hover:bg-white/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-app-ink/20"
                >
                  Call Us
                </a>
              </div>
              <div className="mt-4 text-sm text-app-muted">
                <p>{t.contact.faxInfo}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-app-line">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Insurance Logos Section */}
          <div className="mb-8">
            <InsuranceLogos size="md" showTitle={true} title="We work with these insurance providers:" />
          </div>
          
          <div className="flex flex-col items-center justify-center gap-4 text-center">
            <p className="text-sm text-app-muted">© {new Date().getFullYear()} {BRAND}. All rights reserved.</p>
            <ul className="flex flex-wrap items-center justify-center gap-4 text-sm text-app-muted">
              <li><a className="hover:underline" href="/">Home</a></li>
              <li><a className="hover:underline" href="/services">Services</a></li>
              <li><a className="hover:underline" href="/about">About</a></li>
              <li><a className="hover:underline" href="/privacy">Privacy</a></li>
            </ul>
            
            {/* Website Credit */}
            <div className="pt-4 border-t border-app-line">
              <p className="text-xs text-app-muted">
                Website created by{' '}
                <a 
                  href="https://www.claritybridgecx.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:underline hover:text-app-ink transition-colors"
                >
                  ClarityBridge CX
                </a>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}


function StyleTokens() {
  return (
    <style>{`
      :root{
        --app:  hsl(180 33% 98%);
        --ink:  hsl(210 25% 12%);
        --muted:hsl(210 10% 35%);
        --line: hsl(200 20% 90%);
        --soft: hsl(180 33% 96%);
        --pink:   hsl(340 70% 78%);
        --orange: hsl(28 80% 76%);
        --green:  hsl(142 45% 68%);
        --shadow-soft: 0 6px 16px rgba(0,0,0,.06);
      }
      .dark:root{
        --app:  hsl(210 15% 10%);
        --ink:  hsl(0 0% 98%);
        --muted:hsl(210 10% 70%);
        --line: hsl(210 10% 20%);
        --soft: hsl(210 15% 14%);
        --pink:   hsl(340 70% 64%);
        --orange: hsl(28 80% 62%);
        --green:  hsl(142 45% 58%);
      }
      .bg-app{ background: var(--app); }
      .text-app{ color: var(--app); }
      .text-app-ink{ color: var(--ink); }
      .text-app-muted{ color: var(--muted); }
      .border-app-line{ border-color: var(--line); }
      .bg-app-soft{ background: var(--soft); }
      .bg-pink{ background: var(--pink); }
      .bg-orange{ background: var(--orange); }
      .bg-green{ background: var(--green); }
    `}</style>
  );
}

const translations = {
  en: {
    skip: "Skip to content",
    hero: {
      title: "Healthcare Provider Referrals",
      lead: "Partner with us to provide comprehensive speech therapy and family support services for your clients. We make the referral process simple and ensure seamless care coordination."
    },
    benefits: {
      title: "Why Partner with Higher Ground Care?",
      items: [
        {
          title: "Seamless Coordination",
          description: "We work closely with referring providers to ensure continuity of care and regular communication about client progress."
        },
        {
          title: "Comprehensive Services",
          description: "From speech therapy to family support, we provide holistic care that addresses the whole family's needs."
        },
        {
          title: "Evidence-Based Practice",
          description: "Our services are grounded in research and best practices, ensuring your clients receive the highest quality care."
        },
        {
          title: "Flexible Scheduling",
          description: "We offer flexible scheduling options including telehealth to accommodate your clients' needs and preferences."
        }
      ]
    },
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
          }
        }
      }
    },
    contact: {
      title: "Questions About Referrals?",
      lead: "Our team is here to help with any questions about the referral process or our services.",
      faxInfo: "Referral fax number available upon request by phone or through our Higher Ground Guide."
    }
  },
  es: {
    skip: "Saltar al contenido",
    hero: {
      title: "Referencias de Proveedores de Salud",
      lead: "Colabora con nosotros para brindar servicios integrales de terapia del habla y apoyo familiar para tus clientes. Hacemos que el proceso de referencia sea simple y garantizamos una coordinación de atención perfecta."
    },
    benefits: {
      title: "¿Por qué asociarse con Higher Ground Care?",
      items: [
        {
          title: "Coordinación Perfecta",
          description: "Trabajamos estrechamente con los proveedores que refieren para garantizar la continuidad de la atención y la comunicación regular sobre el progreso del cliente."
        },
        {
          title: "Servicios Integrales",
          description: "Desde terapia del habla hasta apoyo familiar, brindamos atención holística que aborda las necesidades de toda la familia."
        },
        {
          title: "Práctica Basada en Evidencia",
          description: "Nuestros servicios están fundamentados en investigación y mejores prácticas, garantizando que tus clientes reciban la atención de más alta calidad."
        },
        {
          title: "Horarios Flexibles",
          description: "Ofrecemos opciones de horarios flexibles incluyendo telesalud para acomodar las necesidades y preferencias de tus clientes."
        }
      ]
    },
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
          }
        }
      }
    },
    contact: {
      title: "¿Preguntas sobre Referencias?",
      lead: "Nuestro equipo está aquí para ayudar con cualquier pregunta sobre el proceso de referencia o nuestros servicios.",
      faxInfo: "Número de fax para referencias disponible bajo solicitud por teléfono o a través de nuestra Guía Higher Ground."
    }
  }
} as const;
