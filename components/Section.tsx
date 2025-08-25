import React from "react";

export default function Section({
  id,
  title,
  lead,
  children,
  tint = false,
  divider = "none", // "top" | "bottom" | "both" | "none"
}: {
  id?: string;
  title: string;
  lead?: string;
  children?: React.ReactNode;
  tint?: boolean;
  divider?: "top" | "bottom" | "both" | "none";
}) {
  return (
    <section
      id={id}
      className={`relative ${tint ? "bg-app-soft" : "bg-app"} border-app-line ${
        divider !== "none" ? "pt-0" : ""
      }`}
    >
      {["top", "both"].includes(divider) && <Wave position="top" />}
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">{title}</h2>
        {lead && <p className="mt-2 text-app-muted">{lead}</p>}
        <div className="mt-8">{children}</div>
      </div>
      {["bottom", "both"].includes(divider) && <Wave position="bottom" />}
    </section>
  );
}

function Wave({ position }: { position: "top" | "bottom" }) {
  const cls = position === "top" ? "top-0 -translate-y-full" : "bottom-0 translate-y-full";
  return (
    <div aria-hidden className={`absolute left-0 right-0 ${cls}`}>
      <svg viewBox="0 0 1440 80" className="block w-full">
        <defs>
          <linearGradient id="wave" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--green)" stopOpacity=".18" />
            <stop offset="50%" stopColor="var(--orange)" stopOpacity=".16" />
            <stop offset="100%" stopColor="var(--pink)" stopOpacity=".14" />
          </linearGradient>
        </defs>
        <path d="M0,32 C240,64 480,0 720,24 C960,48 1200,20 1440,36 L1440,80 L0,80 Z" fill="url(#wave)" />
      </svg>
    </div>
  );
}
