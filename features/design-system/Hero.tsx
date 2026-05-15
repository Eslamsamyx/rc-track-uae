"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { LiteVimeo } from "@/features/booking/components/LiteVimeo";
import { DecorOrb } from "./decor/DecorOrb";
import { CurbStrip } from "./decor/CurbStrip";

interface BaseHero {
  eyebrow?: ReactNode;
  headline: string;
  body?: string;
  primaryCta?: ReactNode;
  secondaryCta?: ReactNode;
  variant?: "video" | "image" | "split" | "compact";
  imageUrl?: string;
  videoId?: string;
  posterUrl?: string;
  className?: string;
  children?: ReactNode;
  /** Optional stat row to render below CTAs */
  statRow?: ReactNode;
  /** Optional badge to render above the eyebrow (e.g., live status) */
  topBadge?: ReactNode;
  /** Hide the curb strip at the bottom */
  hideCurb?: boolean;
}

export function Hero({
  eyebrow,
  headline,
  body,
  primaryCta,
  secondaryCta,
  variant = "image",
  imageUrl,
  videoId,
  posterUrl,
  className,
  children,
  statRow,
  topBadge,
  hideCurb = false,
}: BaseHero) {
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const node = imgRef.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = node.getBoundingClientRect();
        const offset = Math.max(-200, Math.min(200, rect.top * -0.18));
        node.style.transform = `translate3d(0, ${offset}px, 0) scale(1.08)`;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [imageUrl]);

  return (
    <section
      className={cn(
        "relative isolate overflow-hidden bg-[color:var(--color-checkered-black)] text-white",
        variant === "compact" ? "min-h-[44vh]" : "min-h-[88vh]",
        className,
      )}
    >
      {variant === "video" && videoId ? (
        <div className="absolute inset-0 -z-10">
          <LiteVimeo videoId={videoId} posterUrl={posterUrl} background />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />
        </div>
      ) : null}
      {(variant === "image" || variant === "split" || variant === "compact") && imageUrl ? (
        <div className="absolute inset-0 -z-10 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            ref={imgRef}
            src={imageUrl}
            alt=""
            aria-hidden
            className="h-full w-full object-cover will-change-transform"
            style={{ transform: "scale(1.08)", transition: "transform 80ms linear" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/15" />
          <div className="absolute inset-0 bg-gradient-to-r from-[color:var(--color-racing-blue)]/80 via-black/30 to-transparent" />
        </div>
      ) : null}
      {!imageUrl && !videoId ? (
        <div className="absolute inset-0 -z-10 bg-racing-gradient" />
      ) : null}

      {/* Decorative orbs */}
      <DecorOrb color="orange" size="xl" className="-top-40 -right-32 opacity-30" />
      <DecorOrb color="blue" size="lg" className="bottom-0 -left-32 opacity-30" />

      {/* Subtle grid overlay */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-30 racing-grid-bg-dark"
        style={{ maskImage: "radial-gradient(ellipse at center, black 30%, transparent 80%)" }}
      />

      <div
        className={cn(
          "mx-auto flex max-w-7xl flex-col justify-end gap-6 container-px",
          variant === "compact" ? "min-h-[44vh] py-12" : "min-h-[88vh] py-20",
        )}
      >
        {topBadge ? <div className="mb-2">{topBadge}</div> : null}
        {eyebrow ? (
          <p className="inline-flex w-fit items-center gap-2 rounded-[var(--radius-pill)] bg-[color:var(--color-track-orange)]/15 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--color-track-orange-50)] ring-1 ring-[color:var(--color-track-orange)]/30 backdrop-blur">
            {eyebrow}
          </p>
        ) : null}
        <h1
          className={cn(
            "font-[family-name:var(--font-display)] font-extrabold tracking-tight text-balance drop-shadow-[0_2px_24px_rgba(0,0,0,0.4)]",
            variant === "compact"
              ? "text-3xl sm:text-4xl md:text-5xl"
              : "text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl",
          )}
        >
          {headline}
        </h1>
        {body ? (
          <p className="max-w-2xl text-base sm:text-lg md:text-xl text-white/90 text-pretty drop-shadow-md">
            {body}
          </p>
        ) : null}
        {primaryCta || secondaryCta ? (
          <div className="flex flex-wrap items-center gap-3 pt-2">
            {primaryCta}
            {secondaryCta}
          </div>
        ) : null}
        {statRow ? <div className="mt-4">{statRow}</div> : null}
        {children}
      </div>

      {!hideCurb ? (
        <CurbStrip className="absolute inset-x-0 bottom-0 z-10" height={10} />
      ) : null}
    </section>
  );
}
