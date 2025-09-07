"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { BRAND } from "../config";
import ProfileEditor from "@/components/ProfileEditor";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/login');
        return;
      }
      setUser(user);
    } catch (error) {
      console.error('Error checking user:', error);
      router.push('/login');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-dvh bg-app text-app-ink antialiased">
        <StyleTokens />
        <div className="min-h-dvh grid place-items-center">
          <div className="text-center">
            <div className="text-app-muted">Loading...</div>
          </div>
        </div>
      </main>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <main className="min-h-dvh bg-app text-app-ink antialiased">
      <StyleTokens />
      
      {/* Skip link */}
      <a href="#content" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded-xl focus:bg-app-ink focus:px-3 focus:py-2 focus:text-app">
        Skip to content
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
                <p className="text-sm text-app-muted">Speech Therapy & Family Support</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-app-muted hidden sm:inline">
                {user.email}
              </span>
              <button 
                onClick={() => router.push('/dashboard')}
                className="rounded-2xl border border-app-line bg-white/70 px-4 py-2 text-sm font-medium hover:bg-white/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-app-ink/20"
              >
                Back to Dashboard
              </button>
              <form action="/auth/signout" method="post" className="inline">
                <button className="rounded-2xl border border-app-line bg-white/70 px-4 py-2 text-sm font-medium hover:bg-white/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-app-ink/20">
                  Sign out
                </button>
              </form>
            </div>
          </div>
          
          {/* Bottom row - Navigation */}
          <nav aria-label="Primary navigation" className="flex items-center justify-center gap-4 sm:gap-6 text-sm">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/services">Services</NavLink>
            <NavLink href="/the-center">The Center</NavLink>
            <NavLink href="/community">Community</NavLink>
            <NavLink href="/referrals">Referrals</NavLink>
            <NavLink href="/about">About</NavLink>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <section id="content" className="border-b border-app-line">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-20 lg:px-8">
          <div className="mx-auto max-w-2xl">
            {/* Welcome section */}
            <div className="text-center mb-12">
              <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Profile Management</h1>
              <p className="mt-3 text-app-muted">
                Update your personal information and account details.
              </p>
            </div>

            {/* Profile Editor */}
            <div className="rounded-2xl border border-app-line bg-app-soft p-6 sm:p-8">
              <ProfileEditor />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-app-line">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center gap-4 text-center">
            <p className="text-sm text-app-muted">© {new Date().getFullYear()} {BRAND}. All rights reserved.</p>
            <ul className="flex flex-wrap items-center justify-center gap-4 text-sm text-app-muted">
              <li><a className="hover:underline" href="/">Home</a></li>
              <li><a className="hover:underline" href="/services">Services</a></li>
              <li><a className="hover:underline" href="/the-center">The Center</a></li>
              <li><a className="hover:underline" href="/community">Community</a></li>
              <li><a className="hover:underline" href="/referrals">Referrals</a></li>
              <li><a className="hover:underline" href="/about">About</a></li>
              <li><a className="hover:underline" href="/privacy">Privacy</a></li>
            </ul>
          </div>
        </div>
      </footer>
    </main>
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
