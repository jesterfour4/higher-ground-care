"use client";

import React from "react";
import { BRAND, TAGLINE, CONTACT_EMAIL } from "../config";
import { useContactModal } from "@/components/ContactModalProvider";
import InsuranceLogos from "@/components/InsuranceLogos";


export default function ServicesPage() {
  const [lang, setLang] = React.useState<"en" | "es">("en");
  const { openContactModal } = useContactModal();
  const t = translations[lang];
  
  return (
    <main className="min-h-dvh bg-app text-app-ink antialiased">
      <StyleTokens />

      {/* Skip link */}
      <a href="#content" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded-xl focus:bg-app-ink focus:px-3 focus:py-2 focus:text-app">
        {t.skip}
      </a>

      {/* Header */}
      <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-app/70 border-b border-app-line">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
          {/* Top row - Logo and actions */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <LogoMark />
              <div className="leading-tight hidden sm:block">
                <p className="font-semibold tracking-tight text-lg">{BRAND}</p>
                <p className="text-sm text-app-muted">{t.tagline}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <LangToggle lang={lang} setLang={setLang} />
              <button 
                onClick={openContactModal}
                className="rounded-2xl bg-app-ink/90 px-3 py-2 text-sm font-medium text-app hover:bg-app-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-app-ink/40"
              >
                {t.cta}
              </button>
              <a
                href="https://chatgpt.com/g/g-68ab9b39de488191a3feee3a12af6250-higher-ground-guide"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl bg-[color:var(--green)] px-3 py-2 text-sm font-medium text-app-ink/90 hover:opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--green)]/40"
              >
                {t.higherGroundGuide}
              </a>
            </div>
          </div>
          
          {/* Bottom row - Navigation */}
          <nav aria-label={t.primaryNav} className="flex items-center justify-center gap-4 sm:gap-6 text-sm">
            <NavLink href="/">{t.nav.home}</NavLink>
            <NavLink href="/services">{t.nav.services}</NavLink>
            <NavLink href="/the-center">{t.nav.theCenter}</NavLink>
            <NavLink href="/community">{t.nav.community}</NavLink>
            <NavLink href="/about">{t.nav.about}</NavLink>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <section id="content" className="border-b border-app-line">
        <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">{t.title}</h1>
          <p className="mt-3 text-app-muted">{t.lead}</p>
          
          {/* Current Services */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">{t.currentServices.title}</h2>
            <p className="text-app-muted mb-6">{t.currentServices.lead}</p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {t.currentServices.services.map(([title, desc]) => (
                <div key={title} className="rounded-2xl border border-app-line bg-app-soft p-5">
                  <h3 className="text-base font-semibold">{title}</h3>
                  <p className="mt-2 text-sm text-app-muted">{desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Comprehensive Services */}
          <div className="mt-12">
            <h2 className="text-xl font-semibold mb-4">{t.comprehensiveServices.title}</h2>
            <p className="text-app-muted mb-6">{t.comprehensiveServices.lead}</p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {t.comprehensiveServices.services.map(([title, desc]) => (
                <div key={title} className="rounded-2xl border border-app-line bg-app-soft p-5">
                  <h3 className="text-base font-semibold">{title}</h3>
                  <p className="mt-2 text-sm text-app-muted">{desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Our Approach */}
          <div className="mt-12">
            <h2 className="text-xl font-semibold mb-4">{t.approach.title}</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {t.approach.pillars.map(({ title, desc }) => (
                <div key={title} className="rounded-2xl border border-app-line bg-app-soft p-5">
                  <h3 className="text-base font-semibold tracking-tight">{title}</h3>
                  <p className="mt-2 text-sm text-app-muted">{desc}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-10 rounded-2xl border border-app-line bg-app-soft p-5">
            <h2 className="text-xl font-semibold">{t.insurance.title}</h2>
            <p className="mt-2 text-app-muted">{t.insurance.description}</p>
            <div className="mt-4">
              <InsuranceLogos size="sm" showTitle={true} title="We work with these insurance providers:" />
            </div>
            <button 
              onClick={openContactModal}
              className="mt-6 inline-block rounded-2xl bg-app-ink px-5 py-2.5 text-sm font-medium text-app hover:bg-app-ink/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-app-ink/40"
            >
              {t.insurance.button}
            </button>
          </div>

          {/* Call to Action */}
          <div className="mt-8 text-center">
            <h2 className="text-xl font-semibold mb-3">{t.callToAction.title}</h2>
            <p className="text-app-muted mb-6">{t.callToAction.description}</p>
            <button 
              onClick={openContactModal}
              className="inline-block rounded-2xl bg-[color:var(--green)] px-6 py-3 text-sm font-medium text-app-ink/90 hover:opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--green)]/40"
            >
              {t.callToAction.button}
            </button>
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
          
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <p className="text-sm text-app-muted">© {new Date().getFullYear()} {BRAND}. {t.rights}</p>
            <ul className="flex flex-wrap items-center gap-4 text-sm text-app-muted">
              <li><a className="hover:underline" href="/">{t.footer.home}</a></li>
              <li><a className="hover:underline" href="/services">{t.footer.services}</a></li>
              <li><a className="hover:underline" href="/the-center">{t.footer.theCenter}</a></li>
              <li><a className="hover:underline" href="/community">{t.footer.community}</a></li>
              <li><a className="hover:underline" href="/about">{t.footer.about}</a></li>
              <li><a className="hover:underline" href="/privacy">{t.footer.privacy}</a></li>
              <li><a className="hover:underline" href="/land-acknowledgement">{t.footer.landAcknowledgement}</a></li>
            </ul>
          </div>
          
          {/* Website Credit */}
          <div className="pt-4 border-t border-app-line">
            <p className="text-xs text-app-muted text-center">
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
      </footer>
    </main>
  );
}

/* ========= Components ========= */
function NavLink({ href, children }: React.PropsWithChildren<{ href: string }>) {
  return (
    <a href={href} className="text-sm text-app-ink/80 hover:text-app-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-app-ink/20 rounded">
      {children}
    </a>
  );
}

function LogoMark() {
  return (
    <div className="flex items-center">
      <img
        src="/images/hgst-logo.png"
        alt="Higher Ground Care logo"
        className="h-12 w-auto object-contain"
      />
    </div>
  );
}

function LangToggle({ lang, setLang, }: { lang: "en" | "es"; setLang: React.Dispatch<React.SetStateAction<"en" | "es">>; }) {
  return (
    <div className="inline-flex items-center rounded-xl border border-app-line bg-app-soft p-1" role="group" aria-label="Language toggle">
      <button onClick={() => setLang("en")} className={`rounded-lg px-3 py-1.5 text-xs font-medium ${lang === "en" ? "bg-white shadow-sm" : "opacity-70 hover:opacity-100"}`} aria-pressed={lang === "en"}>EN</button>
      <button onClick={() => setLang("es")} className={`rounded-lg px-3 py-1.5 text-xs font-medium ${lang === "es" ? "bg-white shadow-sm" : "opacity-70 hover:opacity-100"}`} aria-pressed={lang === "es"}>ES</button>
    </div>
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
    tagline: "Speech therapy that feels safe, welcoming, and clear.",
    primaryNav: "Primary",
    nav: { 
      home: "Home", 
      services: "Services", 
      theCenter: "The Center", 
      community: "Community", 
      about: "About Us" 
    },
    cta: "Get started",
    higherGroundGuide: "Higher Ground Guide",
    title: "Services",
    lead: "Personalized evaluations and therapy plans for children at every stage.",
    currentServices: {
      title: "What we offer today",
      lead: "Compassionate, evidence-based support you can start now.",
      services: [
        ["Evaluations", "Comprehensive assessments guiding clear, actionable goals."],
        ["Individual Therapy", "One-on-one sessions matched to your child's strengths."],
        ["Parent Coaching", "Simple strategies that work at home and school."],
        ["Telehealth", "Secure, convenient sessions for busy families."]
      ]
    },
    comprehensiveServices: {
      title: "Our comprehensive approach",
      lead: "Evidence-based therapy tailored to your child's unique needs.",
      services: [
        ["Early Intervention", "Gentle, play-based support for toddlers and preschoolers."],
        ["School-Age Support", "Speech, language, literacy, and social communication."],
        ["Social Communication", "Building confidence and connection with peers."],
        ["Language Development", "Expanding vocabulary and communication skills."],
        ["Articulation & Speech", "Clear pronunciation and speech sound development."],
        ["Literacy Support", "Reading, writing, and academic communication skills."]
      ]
    },
    approach: {
      title: "Our approach",
      pillars: [
        { title: "Low-Sensory by Design", desc: "Soft lighting, quiet rooms, predictable routines. We follow your child's pace." },
        { title: "Neuro-Affirming & Trauma-Informed", desc: "Respecting regulation, autonomy, and cues. Building safety first." },
        { title: "Evidence-Based, Playful", desc: "We blend research with play, curiosity, and strengths-based care." }
      ]
    },
    insurance: {
      title: "Insurance & Pricing",
      description: "We welcome all families. Sliding scale options and superbills available. We can discuss insurance during your consult.",
      button: "Book a free consult"
    },
    callToAction: {
      title: "Ready to get started?",
      description: "Book a free consultation to discuss your child's needs and see how we can help.",
      button: "Schedule Your Free Consultation"
    },
    footer: { 
      home: "Home", 
      services: "Services", 
      theCenter: "The Center", 
      community: "Community", 
      about: "About Us", 
      privacy: "Privacy", 
      landAcknowledgement: "Land Acknowledgement" 
    },
    rights: "All rights reserved.",
  },
  es: {
    skip: "Saltar al contenido",
    tagline: "Terapia del habla segura, acogedora y clara.",
    primaryNav: "Principal",
    nav: { 
      home: "Inicio", 
      services: "Servicios", 
      theCenter: "El Centro", 
      community: "Comunidad", 
      about: "Sobre Nosotros" 
    },
    cta: "Empezar",
    higherGroundGuide: "Guía de Higher Ground",
    title: "Servicios",
    lead: "Evaluaciones personalizadas y planes de terapia para niños en cada etapa.",
    currentServices: {
      title: "Lo que ofrecemos hoy",
      lead: "Apoyo compasivo y basado en evidencia que puedes comenzar ahora.",
      services: [
        ["Evaluaciones", "Evaluaciones integrales que guían metas claras y accionables."],
        ["Terapia Individual", "Sesiones uno a uno adaptadas a las fortalezas de tu hij@."],
        ["Coaching para Padres", "Estrategias simples que funcionan en casa y en la escuela."],
        ["Telemedicina", "Sesiones seguras y convenientes para familias ocupadas."]
      ]
    },
    comprehensiveServices: {
      title: "Nuestro enfoque integral",
      lead: "Terapia basada en evidencia adaptada a las necesidades únicas de tu hij@.",
      services: [
        ["Intervención Temprana", "Apoyo gentil y basado en el juego para niños pequeños y preescolares."],
        ["Apoyo para Edad Escolar", "Habla, lenguaje, alfabetización y comunicación social."],
        ["Comunicación Social", "Construyendo confianza y conexión con compañeros."],
        ["Desarrollo del Lenguaje", "Expandiendo vocabulario y habilidades de comunicación."],
        ["Articulación y Habla", "Pronunciación clara y desarrollo de sonidos del habla."],
        ["Apoyo a la Alfabetización", "Habilidades de lectura, escritura y comunicación académica."]
      ]
    },
    approach: {
      title: "Nuestro enfoque",
      pillars: [
        { title: "Diseño de Baja Estimulación", desc: "Luz suave, salas tranquilas, rutinas predecibles. Seguimos el ritmo de tu hij@." },
        { title: "Neuroafirmativo y Sensible al Trauma", desc: "Respetamos la autorregulación y las señales. Construimos seguridad primero." },
        { title: "Basado en Evidencia y Lúdico", desc: "Unimos la investigación con el juego, la curiosidad y las fortalezas." }
      ]
    },
    insurance: {
      title: "Seguros y Precios",
      description: "Damos la bienvenida a todas las familias. Opciones de escala móvil y superbills disponibles. Podemos discutir seguros durante tu consulta.",
      button: "Agenda una consulta gratis"
    },
    callToAction: {
      title: "¿Listo para empezar?",
      description: "Agenda una consulta gratis para discutir las necesidades de tu hij@ y ver cómo podemos ayudar.",
      button: "Programa Tu Consulta Gratuita"
    },
    footer: { 
      home: "Inicio", 
      services: "Servicios", 
      theCenter: "El Centro", 
      community: "Comunidad", 
      about: "Sobre Nosotros", 
      privacy: "Privacidad", 
      landAcknowledgement: "Reconocimiento de Tierra" 
    },
    rights: "Todos los derechos reservados.",
  },
} as const;
