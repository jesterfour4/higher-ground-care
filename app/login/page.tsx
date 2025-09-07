"use client";

import * as React from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { BRAND } from "../config";
import PictureLogin from "@/components/PictureLogin";

export default function LoginPage() {
  const params = useSearchParams();
  const router = useRouter();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [mode, setMode] = React.useState<"magic" | "password">("magic");
  const [status, setStatus] = React.useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [showPictureLogin, setShowPictureLogin] = React.useState(false);
  const redirectTo = params.get("redirect") || "/dashboard";

  const sendMagic = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus("Sending magic link…");
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/api/auth/callback?next=${redirectTo}` },
    });
    setStatus(error ? `Error: ${error.message}` : "Check your email for a sign-in link.");
    setIsSubmitting(false);
  };

  const signInPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus("Signing in…");
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setStatus(`Error: ${error.message}`);
      setIsSubmitting(false);
      return;
    }
    if (data.user) router.replace(redirectTo);
  };

  const signUpPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus("Creating account…");
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: `${window.location.origin}/api/auth/callback?next=${redirectTo}` },
    });
    if (error) {
      setStatus(`Error: ${error.message}`);
      setIsSubmitting(false);
      return;
    }
    setStatus(data.user ? "Account created. Check your email to confirm." : "Check your email to confirm.");
    setIsSubmitting(false);
  };

  const signInWithGoogle = async () => {
    setIsSubmitting(true);
    setStatus("Connecting with Google…");
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/api/auth/callback?next=/parent-portal`,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    });
    if (error) {
      setStatus(`Error: ${error.message}`);
      setIsSubmitting(false);
    }
  };

  const handlePictureLoginSuccess = (userId: string) => {
    // Store the picture user data for the kid portal
    localStorage.setItem('current_picture_user', JSON.stringify({
      userId: userId,
      name: 'Little Friend',
      loginMethod: 'picture'
    }));
    router.replace('/kid-portal');
  };

  const handleGoogleLoginSuccess = () => {
    // Google users go to parent portal
    router.replace('/parent-portal');
  };

  if (showPictureLogin) {
    return (
      <PictureLogin 
        onSuccess={handlePictureLoginSuccess}
        onBack={() => setShowPictureLogin(false)}
      />
    );
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
            <div className="flex items-center gap-2">
              <a
                href="/"
                className="rounded-2xl border border-app-line bg-white/70 px-4 py-2 text-sm font-medium hover:bg-white/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-app-ink/20"
              >
                Back to Home
              </a>
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
          <div className="mx-auto max-w-md">
            {/* Hero section */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Welcome back</h1>
              <p className="mt-3 text-app-muted">
                Enter your portal to access your dashboard and manage your account.
              </p>
            </div>

            {/* Login form */}
            <div className="rounded-2xl border border-app-line bg-app-soft p-6 sm:p-8">
              {/* Picture Login Button */}
              <div className="mb-6">
                <button
                  onClick={() => setShowPictureLogin(true)}
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-3 text-sm font-medium hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                >
                  <span className="text-2xl">🔐</span>
                  {isSubmitting ? "Loading..." : "Login with Pictures (For Kids!)"}
                </button>
              </div>

              {/* Divider */}
              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-app-line" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-app-soft text-app-muted">Or use regular login</span>
                </div>
              </div>

              {/* Google Sign-In Button */}
              <div className="mb-6">
                <button
                  onClick={signInWithGoogle}
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-3 rounded-xl border border-app-line bg-white px-4 py-3 text-sm font-medium text-app-ink hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-app-ink/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  {isSubmitting ? "Connecting..." : "Continue with Google"}
                </button>
              </div>

              {/* Divider */}
              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-app-line" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-app-soft text-app-muted">Or continue with email</span>
                </div>
              </div>

              <div className="mb-6 inline-flex rounded-xl border border-app-line bg-white/70 p-1 w-full">
                <button
                  onClick={() => setMode("magic")}
                  className={`flex-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${mode === "magic" ? "bg-white shadow-sm text-app-ink" : "opacity-70 hover:opacity-100 text-app-muted"}`}
                >
                  Magic link
                </button>
                <button
                  onClick={() => setMode("password")}
                  className={`flex-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${mode === "password" ? "bg-white shadow-sm text-app-ink" : "opacity-70 hover:opacity-100 text-app-muted"}`}
                >
                  Email & password
                </button>
              </div>

              {mode === "magic" ? (
                <form onSubmit={sendMagic} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-app-ink/90 mb-2">
                      Email address
                    </label>
                    <input 
                      value={email} 
                      onChange={(e)=>setEmail(e.target.value)}
                      type="email" 
                      required 
                      className="w-full rounded-xl border border-app-line bg-white/70 px-4 py-3 text-app-ink placeholder:text-app-muted/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-app-ink/20" 
                      placeholder="Enter your email"
                    />
                  </div>
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full rounded-xl bg-app-ink px-4 py-3 text-sm font-medium text-app hover:bg-app-ink/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-app-ink/40 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Sending..." : "Send magic link"}
                  </button>
                </form>
              ) : (
                <form onSubmit={signInPassword} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-app-ink/90 mb-2">
                      Email address
                    </label>
                    <input 
                      value={email} 
                      onChange={(e)=>setEmail(e.target.value)}
                      type="email" 
                      required 
                      className="w-full rounded-xl border border-app-line bg-white/70 px-4 py-3 text-app-ink placeholder:text-app-muted/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-app-ink/20" 
                      placeholder="Enter your email"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-app-ink/90 mb-2">
                      Password
                    </label>
                    <input 
                      value={password} 
                      onChange={(e)=>setPassword(e.target.value)}
                      type="password" 
                      required 
                      className="w-full rounded-xl border border-app-line bg-white/70 px-4 py-3 text-app-ink placeholder:text-app-muted/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-app-ink/20" 
                      placeholder="Enter your password"
                    />
                  </div>
                  <div className="flex gap-3">
                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 rounded-xl bg-app-ink px-4 py-3 text-sm font-medium text-app hover:bg-app-ink/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-app-ink/40 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? "Entering portal..." : "Enter Your Portal"}
                    </button>
                    <button 
                      onClick={signUpPassword} 
                      type="button"
                      disabled={isSubmitting}
                      className="flex-1 rounded-xl border border-app-line bg-white/70 px-4 py-3 text-sm font-medium text-app-ink hover:bg-white/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-app-ink/20 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Create account
                    </button>
                  </div>
                </form>
              )}

              {status && (
                <div className="mt-4 p-3 rounded-xl border text-sm">
                  {status.includes("Error") ? (
                    <div className="text-red-700 bg-red-50 border-red-200">
                      {status}
                    </div>
                  ) : (
                    <div className="text-green-700 bg-green-50 border-green-200">
                      {status}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Additional info */}
            <div className="mt-8 text-center">
              <p className="text-sm text-app-muted">
                Need help? <a href="/" className="text-app-ink hover:underline">Contact us</a>
              </p>
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
