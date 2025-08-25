"use client";
import React from "react";

export default function Lightbox({
  src,
  alt,
  onClose,
}: {
  src: string;
  alt: string;
  onClose: () => void;
}) {
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[100] grid place-items-center bg-black/70 p-4"
      onClick={onClose}
    >
      <figure
        className="max-h-full max-w-5xl overflow-hidden rounded-2xl bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <img src={src} alt={alt} className="h-full w-full object-contain" />
        <figcaption className="sr-only">{alt}</figcaption>
      </figure>
      <button
        onClick={onClose}
        className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1 text-sm text-app-ink shadow"
        aria-label="Close"
      >
        Close
      </button>
    </div>
  );
}
