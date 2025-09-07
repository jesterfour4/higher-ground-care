"use client";
import React from "react";
import Lightbox from "./Lightbox";

export default function Gallery({
  images,
  caption,
}: {
  images: { src: string; alt: string }[];
  caption?: string;
}) {
  const [open, setOpen] = React.useState<null | number>(null);
  return (
    <div>
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {images.map((img, i) => (
          <li key={img.src}>
            <button
              onClick={() => setOpen(i)}
              className="group block overflow-hidden rounded-2xl border border-app-line bg-white/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-app-ink/20"
            >
              <figure className="relative">
                <img
                  src={img.src}
                  alt={img.alt}
                  className="aspect-[4/3] w-full object-cover transition group-hover:scale-[1.01] motion-reduce:transition-none"
                  loading="lazy"
                  decoding="async"
                />
                <figcaption className="absolute left-2 bottom-2 rounded-full bg-white/80 px-2 py-0.5 text-[11px] text-app-ink shadow">
                  Concept render
                </figcaption>
              </figure>
            </button>
          </li>
        ))}
      </ul>
      {caption && <p className="mt-2 text-sm text-app-muted">{caption}</p>}
      {open !== null && (
        <Lightbox
          src={images[open].src}
          alt={images[open].alt}
          onClose={() => setOpen(null)}
        />
      )}
    </div>
  );
}
