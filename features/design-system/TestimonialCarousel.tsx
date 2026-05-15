"use client";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  meta?: string;
  avatarUrl?: string;
  rating?: number;
}

interface Props {
  items: Testimonial[];
  className?: string;
  variant?: "light" | "dark";
}

export function TestimonialCarousel({ items, className, variant = "light" }: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start" },
    [Autoplay({ delay: 6000, stopOnInteraction: true })],
  );
  const [selectedIndex, setSelectedIndex] = useState(0);
  const isDark = variant === "dark";

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <div className={cn("relative", className)}>
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex">
          {items.map((t) => (
            <article
              key={t.id}
              className="flex min-w-0 shrink-0 grow-0 basis-full flex-col gap-5 p-2 md:basis-1/2 lg:basis-1/3"
            >
              <div
                className={cn(
                  "relative flex h-full flex-col rounded-[var(--radius-lg)] p-7 shadow-[var(--shadow-md)] ring-1 transition-transform hover:-translate-y-1",
                  isDark
                    ? "bg-white/5 ring-white/10 backdrop-blur text-white"
                    : "bg-white ring-[color:var(--color-border)]",
                )}
              >
                <Quote
                  aria-hidden
                  size={32}
                  className={cn(
                    "absolute top-5 inset-inline-end-5 opacity-15",
                    isDark ? "text-white" : "text-[color:var(--color-track-orange)]",
                  )}
                />
                {t.rating ? (
                  <div className="mb-3 flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        aria-hidden
                        className={cn(
                          i < (t.rating ?? 0)
                            ? "fill-[color:var(--color-track-orange)] text-[color:var(--color-track-orange)]"
                            : isDark
                              ? "text-white/20"
                              : "text-[color:var(--color-border)]",
                        )}
                      />
                    ))}
                  </div>
                ) : null}
                <blockquote
                  className={cn(
                    "text-base leading-relaxed text-pretty",
                    isDark ? "text-white/90" : "text-[color:var(--color-foreground)]",
                  )}
                >
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <footer className="mt-6 flex items-center gap-3 text-sm">
                  {t.avatarUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={t.avatarUrl}
                      alt=""
                      aria-hidden
                      className="h-11 w-11 rounded-full object-cover ring-2 ring-[color:var(--color-track-orange)]"
                    />
                  ) : (
                    <div className="h-11 w-11 rounded-full bg-gradient-to-br from-[color:var(--color-track-orange)] to-[color:var(--color-track-orange-600)]" />
                  )}
                  <div>
                    <p
                      className={cn(
                        "font-semibold",
                        isDark ? "text-white" : "text-[color:var(--color-racing-blue)]",
                      )}
                    >
                      {t.author}
                    </p>
                    {t.meta ? (
                      <p
                        className={cn(
                          "text-xs",
                          isDark ? "text-white/60" : "text-[color:var(--color-muted-foreground)]",
                        )}
                      >
                        {t.meta}
                      </p>
                    ) : null}
                  </div>
                </footer>
              </div>
            </article>
          ))}
        </div>
      </div>
      <div className="mt-6 flex items-center justify-between">
        <div className="flex items-center gap-2" role="tablist">
          {items.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === selectedIndex}
              aria-label={`Slide ${i + 1}`}
              onClick={() => emblaApi?.scrollTo(i)}
              className={cn(
                "h-2 rounded-full transition-all",
                i === selectedIndex
                  ? "w-8 bg-[color:var(--color-track-orange)]"
                  : isDark
                    ? "w-2 bg-white/30"
                    : "w-2 bg-[color:var(--color-border)]",
              )}
            />
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => emblaApi?.scrollPrev()}
            aria-label="Previous testimonial"
            className={cn(
              "inline-flex h-11 w-11 items-center justify-center rounded-full transition-colors",
              isDark
                ? "border border-white/20 bg-white/10 text-white hover:bg-white/20"
                : "border border-[color:var(--color-border)] bg-white hover:bg-[color:var(--color-mist)]",
            )}
          >
            <ChevronLeft size={18} aria-hidden className="rtl:rotate-180" />
          </button>
          <button
            type="button"
            onClick={() => emblaApi?.scrollNext()}
            aria-label="Next testimonial"
            className={cn(
              "inline-flex h-11 w-11 items-center justify-center rounded-full transition-colors",
              isDark
                ? "border border-white/20 bg-white/10 text-white hover:bg-white/20"
                : "border border-[color:var(--color-border)] bg-white hover:bg-[color:var(--color-mist)]",
            )}
          >
            <ChevronRight size={18} aria-hidden className="rtl:rotate-180" />
          </button>
        </div>
      </div>
    </div>
  );
}
