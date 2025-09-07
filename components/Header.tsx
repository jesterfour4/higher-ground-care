"use client";

import React from "react";
import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

const BRAND = "Higher Ground Care";

interface HeaderProps {
  lang: "en" | "es";
  setLang: React.Dispatch<React.SetStateAction<"en" | "es">>;
  openContactModal: () => void;
}

export default function Header({ lang, setLang, openContactModal }: HeaderProps) {
  const router = useRouter();
  const [user, setUser] = React.useState<any>(null);

  // Check auth status on mount
  React.useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  const t = translations[lang];

  return (
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
            
            {/* Auth section */}
            {user ? (
              <div className="flex items-center gap-2">
                <span className="text-sm text-app-muted hidden sm:inline">
                  {user.email}
                </span>
                <a
                  href="/dashboard"
                  className="rounded-2xl bg-app-ink/90 px-3 py-2 text-sm font-medium text-app hover:bg-app-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-app-ink/40"
                >
                  Dashboard
                </a>
                <button
                  onClick={handleSignOut}
                  className="rounded-2xl border border-app-line bg-white/70 px-3 py-2 text-sm font-medium hover:bg-white/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-app-ink/20"
                >
                  Sign out
                </button>
              </div>
            ) : (
              <a
                href="/login"
                className="rounded-2xl border border-app-line bg-white/70 px-3 py-2 text-sm font-medium hover:bg-white/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-app-ink/20"
              >
                Enter Your Portal
              </a>
            )}
            
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
          <NavLink href="/referrals">{t.nav.referrals}</NavLink>
          <NavLink href="/about">{t.nav.about}</NavLink>
        </nav>
      </div>
    </header>
  );
}

function LogoMark() {
  return (
    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-app-ink">
      <svg className="h-6 w-6 text-app" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
      </svg>
    </div>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="text-app-muted hover:text-app-ink transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-app-ink/20 rounded-lg px-2 py-1"
    >
      {children}
    </a>
  );
}

function LangToggle({ lang, setLang }: { lang: "en" | "es"; setLang: React.Dispatch<React.SetStateAction<"en" | "es">> }) {
  return (
    <div className="inline-flex items-center rounded-xl border border-app-line bg-app-soft p-1" role="group" aria-label="Language toggle">
      <button 
        onClick={() => setLang("en")} 
        className={`rounded-lg px-2.5 py-1.5 text-xs font-medium ${lang === "en" ? "bg-white shadow-sm" : "opacity-70 hover:opacity-100"}`} 
        aria-pressed={lang === "en"}
      >
        EN
      </button>
      <button 
        onClick={() => setLang("es")} 
        className={`rounded-lg px-2.5 py-1.5 text-xs font-medium ${lang === "es" ? "bg-white shadow-sm" : "opacity-70 hover:opacity-100"}`} 
        aria-pressed={lang === "es"}
      >
        ES
      </button>
    </div>
  );
}

const translations = {
  en: {
    tagline: "Speech Therapy & Family Support",
    cta: "Get Started",
    higherGroundGuide: "Higher Ground Guide",
    primaryNav: "Primary navigation",
    nav: {
      home: "Home",
      services: "Services",
      theCenter: "The Center",
      community: "Community",
      referrals: "Referrals",
      about: "About"
    }
  },
  es: {
    tagline: "Terapia del Habla y Apoyo Familiar",
    cta: "Comenzar",
    higherGroundGuide: "Guía Higher Ground",
    primaryNav: "Navegación principal",
    nav: {
      home: "Inicio",
      services: "Servicios",
      theCenter: "El Centro",
      community: "Comunidad",
      referrals: "Referencias",
      about: "Acerca de"
    }
  }
} as const;
