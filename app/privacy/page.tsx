"use client";

import React from "react";
import { BRAND, CONTACT_EMAIL } from "../config";
import { useContactModal } from "@/components/ContactModalProvider";
import InsuranceLogos from "@/components/InsuranceLogos";


export default function PrivacyPage() {
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
                href="https://chatgpt.com/g/g/g-68ab9b39de488191a3feee3a12af6250-higher-ground-guide"
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
          <p className="mt-2 text-sm text-app-muted">{t.lastUpdated}</p>

          <section className="mt-8 space-y-6 text-base leading-relaxed text-app-ink/90">
            <p>
              {BRAND} {t.intro}
            </p>

            <div>
              <h2 className="text-xl font-semibold tracking-tight">{t.infoWeCollect.title}</h2>
              <ul className="mt-3 list-disc pl-5 text-app-muted">
                <li><strong className="text-app-ink">{t.infoWeCollect.personal}:</strong> {t.infoWeCollect.personalDesc}</li>
                <li><strong className="text-app-ink">{t.infoWeCollect.health}:</strong> {t.infoWeCollect.healthDesc}</li>
                <li><strong className="text-app-ink">{t.infoWeCollect.technical}:</strong> {t.infoWeCollect.technicalDesc}</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold tracking-tight">{t.howWeUse.title}</h2>
              <ul className="mt-3 list-disc pl-5 text-app-muted">
                {t.howWeUse.uses.map((use, index) => (
                  <li key={index}>{use}</li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold tracking-tight">{t.sharing.title}</h2>
              <ul className="mt-3 list-disc pl-5 text-app-muted">
                {t.sharing.points.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold tracking-tight">{t.dataSecurity.title}</h2>
              <p className="mt-3 text-app-muted">
                {t.dataSecurity.description}
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold tracking-tight">{t.yourRights.title}</h2>
              <p className="mt-3 text-app-muted">
                {t.yourRights.description} <a className="underline" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold tracking-tight">{t.childrensPrivacy.title}</h2>
              <p className="mt-3 text-app-muted">
                {t.childrensPrivacy.description}
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold tracking-tight">{t.changes.title}</h2>
              <p className="mt-3 text-app-muted">
                {t.changes.description}
              </p>
            </div>
          </section>
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
              <li><a className="hover:underline" href="/#mission">{t.footer.mission}</a></li>
              <li><a className="hover:underline" href="/services">{t.footer.services}</a></li>
              <li><a className="hover:underline" href="/#approach">{t.footer.approach}</a></li>
              <li><a className="hover:underline" href="/#laura">{t.footer.laura}</a></li>
              <li><a className="hover:underline" href="/#contact">{t.footer.contact}</a></li>
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
    title: "Privacy Policy",
    lastUpdated: "Last updated: August 22, 2025",
    intro: '("we," "our," or "us") respects your privacy and is committed to protecting the personal information of the children and families we serve. This policy explains what information we collect, how we use it, and your choices regarding your data.',
    infoWeCollect: {
      title: "Information We Collect",
      personal: "Personal information",
      personalDesc: "name, email, phone number, child's age, and information you provide in our forms or during intake.",
      health: "Health/therapy information",
      healthDesc: "only what is necessary to provide evaluations and therapy services.",
      technical: "Technical information",
      technicalDesc: "limited usage data (e.g., browser type, device) when you visit our website."
    },
    howWeUse: {
      title: "How We Use Your Information",
      uses: [
        "To schedule and provide speech therapy services.",
        "To communicate with families about care and appointments.",
        "To maintain records required for professional and legal compliance.",
        "To improve our website and services."
      ]
    },
    sharing: {
      title: "Sharing of Information",
      points: [
        "We do not sell or rent your information.",
        "We may share data with trusted partners (e.g., electronic health record systems) only as needed to provide services.",
        "We may disclose information if required by law, professional ethics, or to protect safety."
      ]
    },
    dataSecurity: {
      title: "Data Security",
      description: "We use reasonable technical and administrative measures to safeguard your information, including secure storage and encrypted communication where possible."
    },
    yourRights: {
      title: "Your Rights",
      description: "You may request access to your personal data, ask for corrections, or request deletion (subject to professional record‑keeping laws). Contact us at"
    },
    childrensPrivacy: {
      title: "Children's Privacy",
      description: "We collect information about children only from their parents/guardians and only for the purpose of providing therapy services."
    },
    changes: {
      title: "Changes",
      description: "We may update this policy and will post updates on this page."
    },
    footer: { 
      mission: "Mission", 
      services: "Services", 
      approach: "Our Approach", 
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
    title: "Política de Privacidad",
    lastUpdated: "Última actualización: 22 de agosto de 2025",
    intro: '("nosotros," "nuestro," o "nos") respeta tu privacidad y está comprometido a proteger la información personal de los niños y familias que servimos. Esta política explica qué información recopilamos, cómo la usamos y tus opciones con respecto a tus datos.',
    infoWeCollect: {
      title: "Información que Recopilamos",
      personal: "Información personal",
      personalDesc: "nombre, correo electrónico, número de teléfono, edad del/de la niñ@, e información que proporcionas en nuestros formularios o durante la admisión.",
      health: "Información de salud/terapia",
      healthDesc: "solo lo necesario para proporcionar evaluaciones y servicios de terapia.",
      technical: "Información técnica",
      technicalDesc: "datos de uso limitados (ej., tipo de navegador, dispositivo) cuando visitas nuestro sitio web."
    },
    howWeUse: {
      title: "Cómo Usamos tu Información",
      uses: [
        "Para programar y proporcionar servicios de terapia del habla.",
        "Para comunicarnos con las familias sobre el cuidado y las citas.",
        "Para mantener registros requeridos para el cumplimiento profesional y legal.",
        "Para mejorar nuestro sitio web y servicios."
      ]
    },
    sharing: {
      title: "Compartir Información",
      points: [
        "No vendemos ni alquilamos tu información.",
        "Podemos compartir datos con socios de confianza (ej., sistemas de registros de salud electrónicos) solo según sea necesario para proporcionar servicios.",
        "Podemos divulgar información si es requerido por ley, ética profesional, o para proteger la seguridad."
      ]
    },
    dataSecurity: {
      title: "Seguridad de Datos",
      description: "Usamos medidas técnicas y administrativas razonables para proteger tu información, incluyendo almacenamiento seguro y comunicación encriptada donde sea posible."
    },
    yourRights: {
      title: "Tus Derechos",
      description: "Puedes solicitar acceso a tus datos personales, pedir correcciones, o solicitar eliminación (sujeto a las leyes de mantenimiento de registros profesionales). Contáctanos en"
    },
    childrensPrivacy: {
      title: "Privacidad de los Niños",
      description: "Recopilamos información sobre los niños solo de sus padres/tutores y solo con el propósito de proporcionar servicios de terapia."
    },
    changes: {
      title: "Cambios",
      description: "Podemos actualizar esta política y publicaremos las actualizaciones en esta página."
    },
    footer: { 
      mission: "Misión", 
      services: "Servicios", 
      approach: "Nuestro Enfoque", 
      laura: "Conoce a Laura", 
      contact: "Contacto", 
      privacy: "Privacidad", 
      landAcknowledgement: "Reconocimiento de Tierra" 
    },
    rights: "Todos los derechos reservados.",
  },
} as const;
