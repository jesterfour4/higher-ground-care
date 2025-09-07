"use client";

import React from "react";
import { BRAND, TAGLINE, CONTACT_EMAIL } from "../config";
import Section from "@/components/Section";
import Gallery from "@/components/Gallery";
import Callout from "@/components/Callout";
import { useContactModal } from "@/components/ContactModalProvider";
import InsuranceLogos from "@/components/InsuranceLogos";


export default function TheCenterPage() {
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

      {/* Hero with Concept Art */}
      <section id="content" aria-labelledby="hero-title" className="relative overflow-hidden border-b border-app-line">
        {/* Hero background image */}
        <div className="absolute inset-0">
          <img
            src="/images/center/center-concept.png"
            alt={t.hero.alt}
            className="h-full w-full object-cover"
            aria-hidden="true"
          />
          {/* Dark overlay for text legibility */}
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-32 lg:px-8">
          <div className="max-w-4xl">
            <h1 id="hero-title" className="text-4xl font-bold tracking-tight text-white drop-shadow-lg sm:text-5xl lg:text-6xl">
              {t.hero.title}
            </h1>
            <p className="mt-6 text-xl leading-relaxed text-white/90 drop-shadow-md sm:text-2xl">
              {t.hero.subtitle}
            </p>
            <p className="mt-4 text-lg text-white/80 drop-shadow-sm">
              {t.hero.description}
            </p>
            
            <div className="mt-6 flex flex-wrap gap-2 text-sm" role="navigation" aria-label="Explore sections">
              {[
                ["#indoor","Indoor spaces"],
                ["#outdoor","Outdoor therapy"],
                ["#parent-palace","Parent Palace"],
              ].map(([href,label])=>(
                <a key={href} href={href}
                  className="rounded-full border border-app-line bg-white/70 px-3 py-1 hover:bg-white">
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Wave divider between hero and Overview */}
      <WaveDivider />

      {/* Overview & Navigation */}
      <Section
        title=""
        lead=""
        divider="bottom"
      >
        {/* Quick navigation */}
        <div className="flex flex-wrap gap-2 text-sm justify-center">
          {t.overview.navigation.map(([href, label]) => (
            <a key={href} href={href} className="rounded-full border border-app-line bg-white/70 px-3 py-1 hover:bg-white">
              {label}
            </a>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {t.overview.features.map(({ title, body, tag }) => (
            <Callout
              key={title}
              title={title}
              body={body}
              tag={tag}
            />
          ))}
        </div>
      </Section>

      {/* Indoor Therapy Spaces */}
      <Section
        id="indoor"
        title={t.indoor.title}
        lead={t.indoor.lead}
        tint
        divider="both"
      >
        <div className="grid grid-cols-1 gap-8 md:grid-cols-5">
          <div className="md:col-span-2">
            <p className="text-app-muted">
              {t.indoor.description}
            </p>
            <div className="mt-6">
              <Callout
                title={t.indoor.whyItMatters.title}
                body={t.indoor.whyItMatters.body}
                tag="why"
              />
            </div>
          </div>
          <div className="md:col-span-3">
            <Gallery
              images={[...t.indoor.gallery.images]}
              caption={t.indoor.gallery.caption}
            />
          </div>
        </div>
      </Section>

      {/* Outdoor Therapy */}
      <Section
        id="outdoor"
        title={t.outdoor.title}
        lead={t.outdoor.lead}
        divider="both"
      >
        <div className="grid grid-cols-1 gap-8 md:grid-cols-5">
          <div className="md:col-span-3">
            <Gallery
              images={[...t.outdoor.gallery.images]}
              caption={t.outdoor.gallery.caption}
            />
          </div>
          <div className="md:col-span-2">
            <p className="text-app-muted">
              {t.outdoor.description}
            </p>
            <div className="mt-6 grid gap-4">
              {t.outdoor.callouts.map(({ title, body, tag }) => (
                <Callout
                  key={title}
                  title={title}
                  body={body}
                  tag={tag}
                />
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Parent Palace */}
      <Section
        id="parent-palace"
        title={t.parentPalace.title}
        lead={t.parentPalace.lead}
        tint
        divider="top"
      >
        <div className="grid grid-cols-1 gap-8 md:grid-cols-5">
          <div className="md:col-span-2">
            <p className="text-app-muted">
              {t.parentPalace.description}
            </p>
            <div className="mt-6">
              <Callout
                title={t.parentPalace.programs.title}
                body={t.parentPalace.programs.body}
                tag="note"
              />
            </div>
          </div>
          <div className="md:col-span-3">
            <Gallery
              images={[...t.parentPalace.gallery.images]}
              caption={t.parentPalace.gallery.caption}
            />
          </div>
        </div>
      </Section>

      {/* Timeline & Newsletter */}
      <Section title={t.timeline.title} lead={t.timeline.lead}>
        <ol className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {t.timeline.phases.map(({ title, description }) => (
            <li key={title} className="rounded-2xl border border-app-line bg-white/70 p-4">
              <p className="text-sm font-semibold">{title}</p>
              <p className="mt-1 text-sm text-app-muted">{description}</p>
            </li>
          ))}
        </ol>

        <form className="mt-8 flex max-w-md gap-2" onSubmit={(e) => e.preventDefault()}>
          <input
            type="email"
            required
            placeholder={t.timeline.newsletter.placeholder}
            className="flex-1 rounded-xl border border-app-line bg-white/70 px-3 py-2"
            aria-label={t.timeline.newsletter.ariaLabel}
          />
          <button className="rounded-xl bg-app-ink px-4 py-2 text-app text-sm">{t.timeline.newsletter.button}</button>
        </form>
      </Section>

      {/* Experience flow */}
      <Section title="Your visit experience" lead="What a calm session can feel like.">
        <ol className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[
            ["Arrive & regulate","Soft light, quiet pacing, predictable check-in."],
            ["Therapy time","Indoor or outdoor session—child-led and strength-based."],
            ["Caregiver care","Parent Palace: tea, reading, learning, or a moment to exhale."]
          ].map(([t,b])=>(
            <li key={t} className="rounded-2xl border border-app-line bg-white/70 p-4">
              <p className="text-sm font-semibold">{t}</p>
              <p className="mt-1 text-sm text-app-muted">{b}</p>
            </li>
          ))}
        </ol>
      </Section>

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

function WaveDivider() {
  return (
    <svg aria-hidden viewBox="0 0 1440 80" className="block w-full text-[color:var(--soft)]">
      <defs>
        <linearGradient id="wave" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--green)" stopOpacity=".20"/>
          <stop offset="50%" stopColor="var(--orange)" stopOpacity=".18"/>
          <stop offset="100%" stopColor="var(--pink)" stopOpacity=".16"/>
        </linearGradient>
      </defs>
      <path d="M0,32 C240,64 480,0 720,24 C960,48 1200,20 1440,36 L1440,80 L0,80 Z"
            fill="url(#wave)" />
    </svg>
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
    hero: {
      title: "The Center",
      subtitle: "A place designed for belonging — low‑sensory by default, nature‑connected by design.",
      description: "We're building a welcoming campus for whole‑family support: quiet indoor rooms, outdoor therapy in nature, and the Parent Palace — a calm space for caregivers to rest, learn, and connect.",
      alt: "Concept art of the future therapy center - a whimsical hobbit-hole-like dwelling nestled into a lush green hillside, surrounded by vibrant flowers and nature"
    },
    overview: {
      navigation: [
        ["#indoor", "Indoor spaces"],
        ["#outdoor", "Outdoor therapy"],
        ["#parent-palace", "Parent Palace"],
      ],
      features: [
        {
          title: "Low‑sensory by design",
          body: "Soft light, quiet rooms, predictable routines. We follow your child's pace.",
          tag: "why"
        },
        {
          title: "Nature‑connected",
          body: "Outdoor sessions with trees, gardens, and gentle movement options to support regulation.",
          tag: "why"
        },
        {
          title: "Family‑centered",
          body: "Space for caregivers to recharge and learn—because support for families is support for kids.",
          tag: "why"
        }
      ]
    },
    indoor: {
      title: "Indoor Therapy Spaces",
      lead: "Quiet rooms, themed environments like Mosgrove, and flexible seating.",
      description: "Our rooms minimize overwhelm and maximize comfort. We use soft textures, neutral colorways, and predictable layouts. The Mosgrove room brings playful wonder without visual noise.",
      whyItMatters: {
        title: "Why it matters",
        body: "Children learn best when they feel safe. Low‑sensory environments reduce stress and improve regulation, attention, and joy."
      },
      gallery: {
        images: [
          { src: "/images/center/indoor/indoor-01.png", alt: "Soft‑lit therapy room concept" },
          { src: "/images/center/indoor/mosgrove-01.png", alt: "Mosgrove themed room concept" },
          { src: "/images/center/indoor/indoor-02.png", alt: "Cozy corner with flexible seating" },
        ],
        caption: "Concept art — subject to refinement as we co‑create with families."
      }
    },
    outdoor: {
      title: "Outdoor Therapy",
      lead: "Therapy in gardens and shaded paths — trees, sensory‑friendly textures, and movement options.",
      description: "We blend research‑based therapy with nature‑based exploration. Sessions may include movement, sensory play with natural materials, and quiet observation—always at your child's pace.",
      gallery: {
        images: [
          { src: "/images/center/outdoor/outdoor-01.png", alt: "Shaded path for gentle walks" },
          { src: "/images/center/outdoor/garden-01.png", alt: "Garden therapy nook" },
          { src: "/images/center/outdoor/trail-01.png", alt: "Trail with trees and seating" },
        ],
        caption: "Concept art — Nature supports regulation, curiosity, and playful learning."
      },
      callouts: [
        {
          title: "Seasonal considerations",
          body: "Shaded areas, warm layers, and adaptable activities make outdoor sessions accessible most of the year.",
          tag: "note"
        },
        {
          title: "Coming soon",
          body: "Accessible garden loops, a small water feature, and covered seating.",
          tag: "coming"
        }
      ]
    },
    parentPalace: {
      title: "Parent Palace",
      lead: "A welcoming space for caregivers — rest, learning, and community.",
      description: "While kids are in session, caregivers can exhale. Read, journal, sip tea, or join a short learning session. This is your place to belong, too.",
      programs: {
        title: "Programs",
        body: "Mini‑workshops, peer connection, coaching Q&A, resource library."
      },
      gallery: {
        images: [
          { src: "/images/center/parent-palace/palace-01.png", alt: "Parent Palace lounge concept" },
          { src: "/images/center/parent-palace/lounge-01.png", alt: "Quiet reading corner" },
          { src: "/images/center/parent-palace/learning-01.png", alt: "Small learning nook" },
        ],
        caption: "Concept art — co‑designed with families for real‑world needs."
      }
    },
    timeline: {
      title: "Timeline",
      lead: "We're phasing construction thoughtfully. Subscribe for milestones.",
      phases: [
        {
          title: "Phase 1 — Now",
          description: "Clinic services, telehealth, concept co‑design."
        },
        {
          title: "Phase 2 — Build",
          description: "Indoor rooms, Parent Palace setup, outdoor planning."
        },
        {
          title: "Phase 3 — Open",
          description: "Outdoor therapy loops, retreats & groups."
        }
      ],
      newsletter: {
        placeholder: "your@email",
        ariaLabel: "Email for updates",
        button: "Subscribe"
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
    hero: {
      title: "El Centro",
      subtitle: "Un lugar diseñado para la pertenencia — de baja estimulación por defecto, conectado con la naturaleza por diseño.",
      description: "Estamos construyendo un campus acogedor para el apoyo familiar integral: salas interiores tranquilas, terapia al aire libre en la naturaleza, y el Palacio de los Padres — un espacio tranquilo para que los cuidadores descansen, aprendan y se conecten.",
      alt: "Arte conceptual del futuro centro de terapia - una vivienda tipo agujero de hobbit anidada en una colina verde exuberante, rodeada de flores vibrantes y naturaleza"
    },
    overview: {
      navigation: [
        ["#indoor", "Espacios interiores"],
        ["#outdoor", "Terapia al aire libre"],
        ["#parent-palace", "Palacio de los Padres"],
      ],
      features: [
        {
          title: "Diseño de baja estimulación",
          body: "Luz suave, salas tranquilas, rutinas predecibles. Seguimos el ritmo de tu hij@.",
          tag: "why"
        },
        {
          title: "Conectado con la naturaleza",
          body: "Sesiones al aire libre con árboles, jardines y opciones de movimiento suave para apoyar la regulación.",
          tag: "why"
        },
        {
          title: "Centrado en la familia",
          body: "Espacio para que los cuidadores se recarguen y aprendan—porque el apoyo a las familias es apoyo a los niños.",
          tag: "why"
        }
      ]
    },
    indoor: {
      title: "Espacios de Terapia Interior",
      lead: "Salas tranquilas, entornos temáticos como Mosgrove y asientos flexibles.",
      description: "Nuestras salas minimizan la sobrecarga y maximizan la comodidad. Usamos texturas suaves, colores neutros y diseños predecibles. La sala Mosgrove trae maravilla lúdica sin ruido visual.",
      whyItMatters: {
        title: "Por qué importa",
        body: "Los niños aprenden mejor cuando se sienten seguros. Los entornos de baja estimulación reducen el estrés y mejoran la regulación, atención y alegría."
      },
      gallery: {
        images: [
          { src: "/images/center/indoor/indoor-01.png", alt: "Concepto de sala de terapia con luz suave" },
          { src: "/images/center/indoor/mosgrove-01.png", alt: "Concepto de sala temática Mosgrove" },
          { src: "/images/center/indoor/indoor-02.png", alt: "Rincón acogedor con asientos flexibles" },
        ],
        caption: "Arte conceptual — sujeto a refinamiento mientras co-creamos con familias."
      }
    },
    outdoor: {
      title: "Terapia al Aire Libre",
      lead: "Terapia en jardines y senderos sombreados — árboles, texturas sensorialmente amigables y opciones de movimiento.",
      description: "Combinamos terapia basada en investigación con exploración basada en la naturaleza. Las sesiones pueden incluir movimiento, juego sensorial con materiales naturales y observación tranquila—siempre al ritmo de tu hij@.",
      gallery: {
        images: [
          { src: "/images/center/outdoor/outdoor-01.png", alt: "Sendero sombreado para caminatas suaves" },
          { src: "/images/center/outdoor/garden-01.png", alt: "Rincón de terapia en jardín" },
          { src: "/images/center/outdoor/trail-01.png", alt: "Sendero con árboles y asientos" },
        ],
        caption: "Arte conceptual — La naturaleza apoya la regulación, curiosidad y aprendizaje lúdico."
      },
      callouts: [
        {
          title: "Consideraciones estacionales",
          body: "Áreas sombreadas, capas cálidas y actividades adaptables hacen que las sesiones al aire libre sean accesibles la mayor parte del año.",
          tag: "note"
        },
        {
          title: "Próximamente",
          body: "Bucles de jardín accesibles, una pequeña característica de agua y asientos cubiertos.",
          tag: "coming"
        }
      ]
    },
    parentPalace: {
      title: "Palacio de los Padres",
      lead: "Un espacio acogedor para cuidadores — descanso, aprendizaje y comunidad.",
      description: "Mientras los niños están en sesión, los cuidadores pueden exhalar. Leer, escribir en un diario, tomar té o unirse a una sesión corta de aprendizaje. Este es tu lugar para pertenecer también.",
      programs: {
        title: "Programas",
        body: "Mini-talleres, conexión entre pares, preguntas y respuestas de coaching, biblioteca de recursos."
      },
      gallery: {
        images: [
          { src: "/images/center/parent-palace/palace-01.png", alt: "Concepto de salón del Palacio de los Padres" },
          { src: "/images/center/parent-palace/lounge-01.png", alt: "Rincón de lectura tranquilo" },
          { src: "/images/center/parent-palace/learning-01.png", alt: "Pequeño rincón de aprendizaje" },
        ],
        caption: "Arte conceptual — co-diseñado con familias para necesidades del mundo real."
      }
    },
    timeline: {
      title: "Cronograma",
      lead: "Estamos fases de construcción cuidadosamente. Suscríbete para hitos.",
      phases: [
        {
          title: "Fase 1 — Ahora",
          description: "Servicios clínicos, telemedicina, co-diseño de conceptos."
        },
        {
          title: "Fase 2 — Construir",
          description: "Salas interiores, configuración del Palacio de los Padres, planificación al aire libre."
        },
        {
          title: "Fase 3 — Abrir",
          description: "Bucles de terapia al aire libre, retiros y grupos."
        }
      ],
      newsletter: {
        placeholder: "tu@email",
        ariaLabel: "Correo electrónico para actualizaciones",
        button: "Suscribirse"
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
