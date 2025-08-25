"use client";

import React from "react";
import { BRAND, TAGLINE, CONTACT_EMAIL } from "./config";
import { useContactModal } from "@/components/ContactModalProvider";

// Mobile-first, low-sensory homepage for Higher Ground Speech Therapy
// TailwindCSS required. Minimal motion, high legibility, and bilingual support (EN/ES).
// Enhanced theme with pink, orange, and green accents, outdoor hero, and wave divider.

export default function Home() {
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
            <NavLink href="/">Home</NavLink>
            <NavLink href="/services">Services</NavLink>
            <NavLink href="/the-center">The Center</NavLink>
            <NavLink href="/community">Community</NavLink>
            <NavLink href="/about">About Us</NavLink>
          </nav>
        </div>
      </header>

      {/* HERO with hero background image and Laura spotlight */}
      <section id="content" aria-labelledby="hero-title" className="relative overflow-hidden border-b border-app-line">
        {/* Hero background image */}
        <div className="absolute inset-0">
          <img
            src="/images/hero-background.jpg"
            alt=""
            className="h-full w-full object-cover"
            aria-hidden="true"
          />
          {/* Dark overlay for text legibility */}
          <div className="absolute inset-0 bg-black/30" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 md:py-16 lg:px-8 lg:py-20">
          {/* Mobile-first layout */}
          <div className="grid grid-cols-1 items-center gap-6 sm:gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
            <div className="relative z-10 text-center lg:text-left">
              <h1 id="hero-title" className="text-3xl font-bold tracking-tight text-white drop-shadow-lg sm:text-4xl md:text-5xl lg:text-6xl">
                {t.hero.title}
              </h1>
              <p className="mt-3 text-base leading-relaxed text-white/90 drop-shadow-md sm:text-lg lg:text-xl">
                {t.hero.lead}
              </p>

              <div className="mt-6 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
                <button 
                  onClick={openContactModal}
                  className="w-full sm:w-auto rounded-2xl bg-app-ink px-5 py-3 text-sm font-medium text-app transition [box-shadow:var(--shadow-soft)] hover:scale-[1.01] hover:bg-app-ink/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-app-ink/40"
                >
                  {t.hero.primary}
                </button>
                <a href="#mission" className="w-full sm:w-auto rounded-2xl bg-[color:var(--green)] px-5 py-3 text-sm font-medium text-app-ink/90 hover:opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--green)]/40">
                  {t.hero.secondary}
                </a>
              </div>

              <ul className="mt-6 grid grid-cols-1 gap-2 text-sm text-white/80 drop-shadow-sm sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2" aria-label={t.keyPoints}>
                <li className="flex items-center gap-2 justify-center lg:justify-start"><Dot />{t.points.one}</li>
                <li className="flex items-center gap-2 justify-center lg:justify-start"><Dot />{t.points.two}</li>
                <li className="flex items-center gap-2 justify-center lg:justify-start"><Dot />{t.points.three}</li>
                <li className="flex items-center gap-2 justify-center lg:justify-start"><Dot />{t.points.four}</li>
              </ul>
            </div>

            {/* Laura spotlight - responsive circular image */}
            <figure className="relative z-10 order-first lg:order-last">
              <div className="relative mx-auto w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 xl:w-80 xl:h-80">
                <img
                  src="/images/laura-profile.jpg"
                  alt={t.hero.alt}
                  className="w-full h-full object-cover rounded-full border-4 border-white/80 shadow-2xl"
                  loading="eager"
                  decoding="async"
                />
                {/* Enhanced badge with shadow and border */}
                <figcaption className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 rounded-full border border-white/60 bg-white/90 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium text-app-ink shadow-lg backdrop-blur">
                  <span className="inline-block size-2 rounded-full align-[-2px]" style={{background:"var(--green)"}} />
                  <span className="ml-2">Laura Allred, MS, CCC-SLP</span>
                </figcaption>
              </div>
            </figure>
          </div>
        </div>

        {/* Wave divider between hero and Mission */}
        <WaveDivider />
      </section>

      {/* Land Acknowledgement */}
      <section aria-labelledby="land-ack-short" className="border-b border-app-line bg-app-soft">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 md:py-12 lg:px-8">
          <h2 id="land-ack-short" className="text-xl font-semibold tracking-tight">Land Acknowledgement</h2>
          <p className="mt-3 max-w-3xl text-app-muted">
            We acknowledge that {BRAND} operates on the traditional lands of the Takelma people,
            whose descendants are among the Confederated Tribes of Siletz Indians and the Confederated Tribes of Grand
            Ronde Community of Oregon. We honor the Indigenous peoples who cared for this land since time immemorial and
            recognize that their presence continues today. We commit to listening, learning, and building relationships
            rooted in respect, reciprocity, and responsibility.
          </p>
          <a
            href="/land-acknowledgement"
            className="mt-4 inline-block rounded-2xl bg-[color:var(--green)] px-4 py-2 text-sm font-medium text-app-ink/90 hover:opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--green)]/40"
          >
            Learn more
          </a>
        </div>
      </section>

      {/* Mission & Vision with light background tint */}
      <section id="mission" className="border-b border-app-line bg-[linear-gradient(180deg,rgba(255,255,255,.6),rgba(255,255,255,.4))]">
        <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 md:py-20 lg:px-8">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{t.mission.title}</h2>
          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
            <Card title={t.mission.mission} body={t.mission.missionBody} />
            <Card title={t.mission.vision} body={t.mission.visionBody} />
          </div>
        </div>
      </section>

      {/* Therapy Center Coming Soon */}
      <section aria-labelledby="therapy-center" className="border-b border-app-line">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 items-center">
            <div>
              <h2 id="therapy-center" className="text-2xl sm:text-3xl font-semibold tracking-tight">Therapy Center Coming Soon</h2>
              <p className="mt-3 text-app-muted">
                We're building a welcoming campus for whole-family support. Our new center will feature low-sensory therapy spaces, 
                outdoor nature-based sessions, and a dedicated parent area for rest and connection.
              </p>
              <a
                href="/the-center"
                className="mt-6 inline-block rounded-2xl bg-[color:var(--orange)] px-5 py-2.5 text-sm font-medium text-app-ink/90 hover:opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--orange)]/40"
              >
                Learn more about The Center
              </a>
            </div>
            <div className="relative">
              <img
                src="/images/center/center-concept.png"
                alt="Concept art of the future therapy center - a welcoming, nature-inspired space with therapy rooms and outdoor areas"
                className="w-full h-64 md:h-80 object-cover rounded-2xl border border-app-line shadow-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl" />
            </div>
          </div>
        </div>
      </section>



      {/* What we're building */}
      <section aria-labelledby="future" className="border-b border-app-line bg-app-soft">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
          <h2 id="future" className="text-2xl sm:text-3xl font-semibold tracking-tight">What we're building</h2>
          <p className="mt-2 text-app-muted">A welcoming campus for whole‑family support.</p>
          <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              ["Indoor Therapy Spaces","Low‑sensory rooms, themed environments like Mosgrove.","/the-center#indoor"],
              ["Outdoor Therapy","Nature‑based sessions with trees, gardens, and gentle trails.","/the-center#outdoor"],
              ["Parent Palace","A warm space for caregivers to rest, learn, and connect.","/the-center#parent-palace"],
              ["Group Events","Social communication groups, workshops, and play labs.","/community#groups"],
              ["Therapy Retreats","Weekend intensives that blend care, rest, and nature.","/community#retreats"],
              ["Community Impact","Partnerships, accessibility, and local stewardship.","/community"]
            ].map(([title,desc,href])=>(
              <li key={title} className="rounded-2xl border border-app-line bg-white/70 p-5">
                <h3 className="text-base font-semibold">{title}</h3>
                <p className="mt-2 text-sm text-app-muted">{desc}</p>
                <a href={href as string} className="mt-3 inline-block text-sm underline text-app-ink/80 hover:text-app-ink">Learn more</a>
              </li>
            ))}
          </ul>
          <div className="mt-8 text-center">
            <p className="text-app-muted mb-4">Learn more about our current services and approach</p>
            <a href="/services" className="inline-block rounded-2xl bg-[color:var(--green)] px-5 py-2.5 text-sm font-medium text-app-ink/90 hover:opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--green)]/40">
              View All Services
            </a>
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section id="approach" className="border-b border-app-line">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-20 lg:px-8">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{t.approach.title}</h2>
          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            {t.approach.pillars.map((p) => (
              <div key={p.title} className="rounded-2xl border border-app-line bg-app-soft p-5">
                <h3 className="text-base font-semibold tracking-tight">{p.title}</h3>
                <p className="mt-2 text-sm text-app-muted">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Highlight Laura */}
      <section id="laura" className="border-b border-app-line">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-20 lg:px-8 grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="md:col-span-1">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{t.laura.title}</h2>
            <p className="mt-3 text-app-muted">{t.laura.lead}</p>
            <ul className="mt-6 space-y-2 text-sm text-app-muted" aria-label={t.laura.credentialsLabel}>
              {t.laura.credentials.map((c) => (
                <li key={c} className="flex items-center gap-2"><Dot />{c}</li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-2 rounded-3xl border border-app-line bg-app-soft p-5">
            <p className="text-base leading-relaxed text-app-ink/90">{t.laura.story}</p>
          </div>
        </div>
      </section>



      {/* Footer */}
      <footer className="border-t border-app-line">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <p className="text-sm text-app-muted">© {new Date().getFullYear()} {BRAND}. {t.rights}</p>
            <ul className="flex flex-wrap items-center gap-4 text-sm text-app-muted">
              <li><a className="hover:underline" href="/">Home</a></li>
              <li><a className="hover:underline" href="/services">Services</a></li>
              <li><a className="hover:underline" href="/the-center">The Center</a></li>
              <li><a className="hover:underline" href="/community">Community</a></li>
              <li><a className="hover:underline" href="/about">About Us</a></li>
              <li><a className="hover:underline" href="/privacy">{t.footer.privacy}</a></li>
              <li><a className="hover:underline" href="/land-acknowledgement">Land Acknowledgement</a></li>
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

function Dot() {
  return <span aria-hidden className="inline-block size-1.5 rounded-full bg-white/70" />;
}

function Card({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-app-line bg-app-soft p-5">
      <h3 className="text-base font-semibold tracking-tight">{title}</h3>
      <p className="mt-2 text-sm text-app-muted">{body}</p>
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
    nav: { mission: "Mission", approach: "Our Approach", laura: "Meet Laura", contact: "Contact" },
    cta: "Get started",
    higherGroundGuide: "Higher Ground Guide",
    hero: { title: "Find care for your child with ease", lead: "We make it simple for families to access compassionate, evidence-based speech therapy. Clear steps. Low-sensory spaces. Real progress.", primary: "Book a free consult", secondary: "See how we help", alt: "Portrait of Laura Allred, MS, CCC-SLP, smiling in a calm, light-filled space." },
    keyPoints: "Key points",
    points: { one: "Easy scheduling and clear next steps", two: "Low-sensory, neuro-affirming environment", three: "Bilingual support: English and Spanish", four: "In-clinic and telehealth options" },
    mission: { title: "Mission & Vision", mission: "Our Mission", missionBody: "Our mission is to make it easy for families to find care for their children through compassionate, evidence-based therapy that meets each child where they are. We reduce stress for families by simplifying the process, providing clear next steps, and fostering an environment of trust and belonging.", vision: "Our Vision", visionBody: "Our vision is to nurture a world where care is accessible to all, differences are honored as strengths, and families find a true sense of belonging." },

    approach: { title: "Our Approach", pillars: [ { title: "Low-Sensory by Design", desc: "Soft lighting, quiet rooms, predictable routines. We follow your child's pace." }, { title: "Neuro-Affirming & Trauma-Informed", desc: "Respecting regulation, autonomy, and cues. Building safety first." }, { title: "Evidence-Based, Playful", desc: "We blend research with play, curiosity, and strengths-based care." } ] },
    laura: { title: "Meet Laura Allred, MS, CCC-SLP", lead: "Founder and speech-language pathologist. Woman-owned, community-rooted care.", credentialsLabel: "Credentials", credentials: [ "MS, Communication Sciences & Disorders", "ASHA Certified: CCC-SLP", "Bilingual support: English/Spanish", "Experience across schools, clinics, and telepractice" ], story: "Laura brings a calm presence and clear communication to every session. She partners with families, meets each child where they are, and celebrates wins — big and small. Her practice is grounded in inclusivity and access for all." },
    contact: { title: "Contact & Booking", lead: "Have questions or ready to begin? Send a note and we'll reply with next steps and a link to schedule.", name: "Your name", email: "Email", phone: "Phone", childAge: "Child's age", message: "How can we help?", notice: "By submitting, you agree to be contacted by Higher Ground Speech Therapy.", submit: "Send message" },
    footer: { privacy: "Privacy", accessibility: "Accessibility" },
    rights: "All rights reserved.",
  },
  es: {
    skip: "Saltar al contenido",
    tagline: "Terapia del habla segura, acogedora y clara.",
    primaryNav: "Principal",
    nav: { mission: "Misión", approach: "Enfoque", laura: "Conoce a Laura", contact: "Contacto" },
    cta: "Empezar",
    higherGroundGuide: "Guía de Higher Ground",
    hero: { title: "Encuentra atención para tu hij@ con facilidad", lead: "Facilitamos el acceso a terapia del habla compasiva y basada en evidencia. Pasos claros. Espacios de baja estimulación. Progreso real.", primary: "Agenda una consulta gratis", secondary: "Cómo ayudamos", alt: "Retrato de Laura Allred, MS, CCC-SLP, en un espacio tranquilo y luminoso." },
    keyPoints: "Puntos clave",
    points: { one: "Citas fáciles y próximos pasos claros", two: "Ambiente de baja estimulación, neuroafirmativo", three: "Apoyo bilingüe: inglés y español", four: "Opciones en clínica y por telemedicina" },
    mission: { title: "Misión y Visión", mission: "Nuestra Misión", missionBody: "Nuestra misión es facilitar que las familias encuentren atención para sus hij@s a través de terapia compasiva y basada en evidencia que se adapte a cada niñ@ donde esté. Reducimos el estrés de las familias simplificando el proceso, proporcionando próximos pasos claros y fomentando un ambiente de confianza y pertenencia.", vision: "Nuestra Visión", visionBody: "Nuestra visión es nutrir un mundo donde el cuidado sea accesible para tod@s, las diferencias sean honradas como fortalezas, y las familias encuentren un verdadero sentido de pertenencia." },

    approach: { title: "Nuestro Enfoque", pillars: [ { title: "Diseño de Baja Estimulación", desc: "Luz suave, salas tranquilas, rutinas predecibles. Seguimos el ritmo de tu hij@." }, { title: "Neuroafirmativo y Sensible al Trauma", desc: "Respetamos la autorregulación y las señales. Construimos seguridad primero." }, { title: "Basado en Evidencia y Lúdico", desc: "Unimos la investigación con el juego, la curiosidad y las fortalezas." } ] },
    laura: { title: "Conoce a Laura Allred, MS, CCC-SLP", lead: "Fundadora y patóloga del habla y lenguaje. Negocio de mujer y enraizado en la comunidad.", credentialsLabel: "Credenciales", credentials: [ "MS, Ciencias de la Comunicación y Trastornos", "Certificación ASHA: CCC-SLP", "Apoyo bilingüe: inglés/español", "Experience across schools, clinics, and telepractice" ], story: "Laura aporta calma y claridad a cada sesión. Colabora con las familias, se ajusta al ritmo de cada niñ@ y celebra los logros — grandes y pequeños. Su práctica está basada en la inclusión y el acceso para tod@s.", },
    contact: { title: "Contacto y Citas", lead: "¿Preguntas o listo para comenzar? Envíanos un mensaje y te responderemos con los siguientes pasos y un enlace para agendar.", name: "Tu nombre", email: "Correo electrónico", phone: "Teléfono", childAge: "Edad del/de la niñ@", message: "¿Cómo podemos ayudar?", notice: "Al enviar, aceptas que Higher Ground Speech Therapy se comunique contigo.", submit: "Enviar" },
    footer: { privacy: "Privacidad", accessibility: "Accesibilidad" },
    rights: "Todos los derechos reservados.",
  },
} as const; 