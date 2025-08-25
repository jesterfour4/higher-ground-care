"use client";

import React from "react";
import { BRAND, CONTACT_EMAIL } from "../config";
import { useContactModal } from "@/components/ContactModalProvider";

export default function LandAcknowledgementPage() {
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
            <NavLink href="/#mission">{t.nav.mission}</NavLink>
            <NavLink href="/services">{t.nav.services}</NavLink>
            <NavLink href="/#approach">{t.nav.approach}</NavLink>
            <NavLink href="/#laura">{t.nav.laura}</NavLink>
            <NavLink href="/#contact">{t.nav.contact}</NavLink>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <section id="content" className="border-b border-app-line">
        <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">{t.title}</h1>

          <section className="mt-8 space-y-6 text-base leading-relaxed text-app-ink/90">
            <p>
              {t.content.acknowledgement}
            </p>
            <p>
              {t.content.commitment}
            </p>
            <p className="text-app-muted">
              {t.content.contact} <a className="underline" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
            </p>
          </section>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-app-line">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <p className="text-sm text-app-muted">© {new Date().getFullYear()} {BRAND}. {t.rights}</p>
            <ul className="flex flex-wrap items-center gap-4 text-sm text-app-muted">
              <li><a className="hover:underline" href="/#mission">{t.footer.mission}</a></li>
              <li><a className="hover:underline" href="/#laura">{t.footer.laura}</a></li>
              <li><a className="hover:underline" href="/#contact">{t.footer.contact}</a></li>
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
    tagline: "speech therapy • family support • community wellness",
    primaryNav: "Primary",
    nav: { 
      home: "Home", 
      mission: "Mission", 
      services: "Services", 
      approach: "Our Approach", 
      laura: "Meet Laura", 
      contact: "Contact" 
    },
    cta: "Get started",
    higherGroundGuide: "Higher Ground Guide",
    title: "Land Acknowledgement",
    content: {
      acknowledgement: `We acknowledge that ${BRAND} operates on the traditional lands of the Takelma people, whose descendants are among the Confederated Tribes of Siletz Indians and the Confederated Tribes of Grand Ronde Community of Oregon. We honor the Indigenous peoples who cared for this land since time immemorial and recognize that their presence continues today.`,
      commitment: "We understand that a land acknowledgement is a beginning, not an end. We commit to ongoing learning and to relationship-building guided by respect, reciprocity, and responsibility. This includes seeking guidance from local Indigenous communities, supporting educational efforts, and aligning our work with practices that promote access, equity, and belonging.",
      contact: "If you have suggestions or resources to deepen this commitment, please contact us at"
    },
    footer: { 
      mission: "Mission", 
      laura: "Meet Laura", 
      contact: "Contact", 
      privacy: "Privacy", 
      landAcknowledgement: "Land Acknowledgement" 
    },
    rights: "All rights reserved.",
  },
  es: {
    skip: "Saltar al contenido",
    tagline: "terapia del habla • apoyo familiar • bienestar comunitario",
    primaryNav: "Principal",
    nav: { 
      home: "Inicio", 
      mission: "Misión", 
      services: "Servicios", 
      approach: "Nuestro Enfoque", 
      laura: "Conoce a Laura", 
      contact: "Contacto" 
    },
    cta: "Empezar",
    higherGroundGuide: "Guía de Higher Ground",
    title: "Reconocimiento de Tierra",
    content: {
      acknowledgement: `Reconocemos que ${BRAND} opera en las tierras tradicionales del pueblo Takelma, cuyos descendientes están entre las Tribus Confederadas de Indios Siletz y las Tribus Confederadas de la Comunidad de Grand Ronde de Oregón. Honramos a los pueblos indígenas que cuidaron esta tierra desde tiempos inmemoriales y reconocemos que su presencia continúa hoy.`,
      commitment: "Entendemos que un reconocimiento de tierra es un comienzo, no un final. Nos comprometemos al aprendizaje continuo y a la construcción de relaciones guiadas por el respeto, la reciprocidad y la responsabilidad. Esto incluye buscar orientación de las comunidades indígenas locales, apoyar esfuerzos educativos y alinear nuestro trabajo con prácticas que promuevan el acceso, la equidad y la pertenencia.",
      contact: "Si tienes sugerencias o recursos para profundizar este compromiso, por favor contáctanos en"
    },
    footer: { 
      mission: "Misión", 
      laura: "Conoce a Laura", 
      contact: "Contacto", 
      privacy: "Privacidad", 
      landAcknowledgement: "Reconocimiento de Tierra" 
    },
    rights: "Todos los derechos reservados.",
  },
} as const;
