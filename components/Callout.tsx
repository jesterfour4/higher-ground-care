import React from "react";

export default function Callout({
  title,
  body,
  tag,
}: {
  title: string;
  body: string;
  tag?: "coming" | "why" | "note";
}) {
  const palette =
    tag === "coming"
      ? "border-[color:var(--orange)]/40"
      : tag === "why"
      ? "border-[color:var(--green)]/40"
      : "border-app-line";
  return (
    <div className={`rounded-2xl border ${palette} bg-app-soft p-5`}>
      <h3 className="text-base font-semibold tracking-tight">{title}</h3>
      <p className="mt-2 text-sm text-app-muted">{body}</p>
      {tag === "coming" && (
        <span className="mt-3 inline-block rounded-full border border-app-line bg-white/70 px-2 py-0.5 text-xs">
          Coming soon
        </span>
      )}
    </div>
  );
}
