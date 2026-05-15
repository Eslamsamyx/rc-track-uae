"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export interface GalleryImage {
  id: string;
  src: string;
  srcLarge?: string;
  alt: string;
  width: number;
  height: number;
}

export function GalleryGrid({ images, className }: { images: GalleryImage[]; className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let lightbox: { destroy?: () => void } | null = null;
    const setup = async () => {
      if (typeof window === "undefined") return;
      const mod = await import("photoswipe/lightbox");
      const PhotoSwipeLightbox = mod.default;
      lightbox = new PhotoSwipeLightbox({
        gallery: "#rc-gallery",
        children: "a.gallery-link",
        pswpModule: () => import("photoswipe"),
      }) as { destroy?: () => void } & {
        init: () => void;
      };
      (lightbox as { init: () => void }).init();
    };
    setup();
    return () => {
      lightbox?.destroy?.();
    };
  }, [images]);

  return (
    <div
      id="rc-gallery"
      ref={containerRef}
      className={cn(
        "grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4",
        className,
      )}
    >
      {images.map((img) => (
        <a
          key={img.id}
          className="gallery-link group relative block aspect-square overflow-hidden rounded-[var(--radius-md)] bg-[color:var(--color-mist)]"
          href={img.srcLarge ?? img.src}
          data-pswp-width={img.width}
          data-pswp-height={img.height}
          target="_blank"
          rel="noreferrer"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={img.src}
            alt={img.alt}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </a>
      ))}
    </div>
  );
}
