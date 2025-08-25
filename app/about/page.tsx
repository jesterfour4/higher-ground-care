"use client";

import React from "react";
import { BRAND, TAGLINE, CONTACT_EMAIL } from "../config";
import { useContactModal } from "@/components/ContactModalProvider";

export default function AboutPage() {
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

          <section className="mt-10 border-t border-app-line pt-10">
            <h2 className="text-2xl font-semibold">{t.story.title}</h2>
            <p className="mt-2 text-app-muted">{t.story.description}</p>
          </section>

          <section className="mt-10 border-t border-app-line pt-10">
            <h2 className="text-2xl font-semibold">{t.laura.title}</h2>
            <p className="mt-2 text-app-muted">{t.laura.description}</p>
          </section>

          <section className="mt-10 border-t border-app-line pt-10">
            <h2 className="text-2xl font-semibold">{t.contact.title}</h2>
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <h3 className="text-lg font-medium mb-3">{t.contact.getInTouch.title}</h3>
                <p className="text-app-muted mb-4">
                  {t.contact.getInTouch.description}
                </p>
                <button 
                  onClick={openContactModal}
                  className="rounded-2xl bg-app-ink px-5 py-2.5 text-sm font-medium text-app hover:bg-app-ink/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-app-ink/40"
                >
                  {t.contact.getInTouch.button}
                </button>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-3">{t.contact.details.title}</h3>
                <div className="space-y-2 text-app-muted">
                  <p><strong>{t.contact.details.email}:</strong> {CONTACT_EMAIL}</p>
                  <p><strong>{t.contact.details.location}:</strong> {t.contact.details.locationValue}</p>
                  <p><strong>{t.contact.details.services}:</strong> {t.contact.details.servicesValue}</p>
                  <p><strong>{t.contact.details.languages}:</strong> {t.contact.details.languagesValue}</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-app-line">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
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
    title: "About Us",
    lead: "We're building a place where care is simple, inclusive, and connected to nature.",
    story: {
      title: "Our Story & Vision",
      description: "[insert expanded mission + vision you chose]"
    },
    laura: {
      title: "Meet Laura",
      description: "Laura Allred, MS, CCC‑SLP… [short bio, credentials, approach]"
    },
    contact: {
      title: "Contact Information",
      getInTouch: {
        title: "Get in Touch",
        description: "Ready to start your child's speech therapy journey? Have questions about our services or approach?",
        button: "Contact Us"
      },
      details: {
        title: "Contact Details",
        email: "Email",
        location: "Location",
        locationValue: "Southern Oregon",
        services: "Services",
        servicesValue: "In-person & Telehealth",
        languages: "Languages",
        languagesValue: "English & Spanish"
      }
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
    title: "Sobre Nosotros",
    lead: "Estamos construyendo un lugar donde el cuidado sea simple, inclusivo y conectado con la naturaleza.",
    story: {
      title: "Nuestra Historia y Visión",
      description: "[insertar misión y visión expandida que elegiste]"
    },
    laura: {
      title: "Conoce a Laura",
      description: "Laura Allred, MS, CCC‑SLP… [biografía corta, credenciales, enfoque]"
    },
    contact: {
      title: "Información de Contacto",
      getInTouch: {
        title: "Ponte en Contacto",
        description: "¿Listo para comenzar el viaje de terapia del habla de tu hij@? ¿Tienes preguntas sobre nuestros servicios o enfoque?",
        button: "Contáctanos"
      },
      details: {
        title: "Detalles de Contacto",
        email: "Correo electrónico",
        location: "Ubicación",
        locationValue: "Oregón del Sur",
        services: "Servicios",
        servicesValue: "En persona y Telemedicina",
        languages: "Idiomas",
        languagesValue: "Inglés y Español"
      }
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
