"use client";

import React from "react";
import { BRAND, TAGLINE, CONTACT_EMAIL } from "../config";
import { useContactModal } from "@/components/ContactModalProvider";
import InsuranceLogos from "@/components/InsuranceLogos";


export default function CommunityPage() {
  const [lang, setLang] = React.useState<"en" | "es">("en");
  const { openContactModal } = useContactModal();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitStatus, setSubmitStatus] = React.useState<{
    success?: boolean;
    message?: string;
    error?: string;
  } | null>(null);
  const t = translations[lang];

  const handleInterestSubmit = async (e: React.FormEvent<HTMLFormElement>, program: 'group' | 'retreat') => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    const formData = new FormData(e.currentTarget);
    const interestData = {
      email: formData.get('email') as string,
      program: program,
      note: formData.get('note') as string,
    };

    try {
      const response = await fetch('/api/program-interest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(interestData),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus({ 
          success: true, 
          message: 'Thanks! We\'ll keep you updated on upcoming programs.' 
        });
        e.currentTarget.reset();
      } else {
        setSubmitStatus({ 
          success: false, 
          error: result.error || 'We couldn\'t submit the form. Email us at highergroundslp@gmail.com' 
        });
      }
    } catch (error) {
      console.error('Interest form error:', error);
      setSubmitStatus({
        success: false,
        error: 'We couldn\'t submit the form. Email us at highergroundslp@gmail.com'
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
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

          <section id="groups" className="mt-10 border-t border-app-line pt-10">
            <h2 className="text-2xl font-semibold">{t.groups.title}</h2>
            <p className="mt-2 text-app-muted">{t.groups.description}</p>
            
            <div className="mt-6 rounded-2xl border border-app-line bg-app-soft p-6">
              <h3 className="text-lg font-semibold mb-3">Express interest in groups</h3>
              <form onSubmit={(e) => handleInterestSubmit(e, 'group')} className="space-y-4">
                <div>
                  <label htmlFor="group-email" className="block text-sm font-medium text-app-ink/90 mb-2">
                    Email address
                  </label>
                  <input
                    type="email"
                    id="group-email"
                    name="email"
                    required
                    className="w-full rounded-xl border border-app-line bg-white/70 px-3 py-2 text-app-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-app-ink/20"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label htmlFor="group-note" className="block text-sm font-medium text-app-ink/90 mb-2">
                    Additional notes (optional)
                  </label>
                  <textarea
                    id="group-note"
                    name="note"
                    rows={3}
                    className="w-full rounded-xl border border-app-line bg-white/70 px-3 py-2 text-app-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-app-ink/20"
                    placeholder="Tell us about your interests or questions..."
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto rounded-xl bg-app-ink px-4 py-2 text-sm font-medium text-app hover:bg-app-ink/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-app-ink/40 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Interest'}
                </button>
              </form>
            </div>
          </section>

          <section id="retreats" className="mt-10 border-t border-app-line pt-10">
            <h2 className="text-2xl font-semibold">{t.retreats.title}</h2>
            <p className="mt-2 text-app-muted">{t.retreats.description}</p>
            
            <div className="mt-6 rounded-2xl border border-app-line bg-app-soft p-6">
              <h3 className="text-lg font-semibold mb-3">Express interest in retreats</h3>
              <form onSubmit={(e) => handleInterestSubmit(e, 'retreat')} className="space-y-4">
                <div>
                  <label htmlFor="retreat-email" className="block text-sm font-medium text-app-ink/90 mb-2">
                    Email address
                  </label>
                  <input
                    type="email"
                    id="retreat-email"
                    name="email"
                    required
                    className="w-full rounded-xl border border-app-line bg-white/70 px-3 py-2 text-app-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-app-ink/20"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label htmlFor="retreat-note" className="block text-sm font-medium text-app-ink/90 mb-2">
                    Additional notes (optional)
                  </label>
                  <textarea
                    id="retreat-note"
                    name="note"
                    rows={3}
                    className="w-full rounded-xl border border-app-line bg-white/70 px-3 py-2 text-app-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-app-ink/20"
                    placeholder="Tell us about your interests or questions..."
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto rounded-xl bg-app-ink px-4 py-2 text-sm font-medium text-app hover:bg-app-ink/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-app-ink/40 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Interest'}
                </button>
              </form>
            </div>
          </section>

          {/* Status Messages */}
          {submitStatus && (
            <div className="mt-6 p-4 rounded-xl border text-sm">
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

          <section id="newsletter" className="mt-10 border-t border-app-line pt-10">
            <h2 className="text-2xl font-semibold">{t.newsletter.title}</h2>
            <p className="mt-2 text-app-muted">{t.newsletter.description}</p>
            <form className="mt-4 flex max-w-md gap-2" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                required 
                placeholder={t.newsletter.placeholder}
                className="flex-1 rounded-xl border border-app-line bg-white/70 px-3 py-2" 
              />
              <button className="rounded-xl bg-app-ink px-4 py-2 text-app text-sm">{t.newsletter.button}</button>
            </form>
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
    title: "Community",
    lead: "Connection, learning, and belonging for families and caregivers.",
    groups: {
      title: "Group Events",
      description: "Social communication groups and seasonal workshops."
    },
    retreats: {
      title: "Therapy Retreats",
      description: "Weekend intensives blending therapy, rest, and nature."
    },
    newsletter: {
      title: "Stay Updated",
      description: "Join our list to hear about new programs and center milestones.",
      placeholder: "your@email",
      button: "Subscribe"
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
    title: "Comunidad",
    lead: "Conexión, aprendizaje y pertenencia para familias y cuidadores.",
    groups: {
      title: "Eventos Grupales",
      description: "Grupos de comunicación social y talleres estacionales."
    },
    retreats: {
      title: "Retiros de Terapia",
      description: "Intensivos de fin de semana que combinan terapia, descanso y naturaleza."
    },
    newsletter: {
      title: "Mantente Actualizado",
      description: "Únete a nuestra lista para escuchar sobre nuevos programas y hitos del centro.",
      placeholder: "tu@email",
      button: "Suscribirse"
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
