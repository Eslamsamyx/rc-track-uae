"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface Props {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  icon?: ReactNode;
  variant?: "light" | "dark" | "orange" | "blue";
  className?: string;
}

const variantStyles: Record<NonNullable<Props["variant"]>, string> = {
  light: "bg-white ring-1 ring-[color:var(--color-border)] text-[color:var(--color-racing-blue)]",
  dark: "bg-[color:var(--color-checkered-black)] text-white ring-1 ring-white/10",
  orange: "bg-orange-gradient text-white",
  blue: "bg-racing-gradient text-white",
};

const iconBgMap: Record<NonNullable<Props["variant"]>, string> = {
  light: "bg-[color:var(--color-track-orange-50)] text-[color:var(--color-track-orange-600)]",
  dark: "bg-white/10 text-[color:var(--color-track-orange)]",
  orange: "bg-white/15 text-white",
  blue: "bg-[color:var(--color-track-orange)] text-white",
};

export function IconStatCard({
  value,
  suffix,
  prefix,
  label,
  icon,
  variant = "light",
  className,
}: Props) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const triggered = useRef(false);

  useEffect(() => {
    if (!ref.current) return;
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setDisplay(value);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting && !triggered.current) {
          triggered.current = true;
          const start = performance.now();
          const duration = 1300;
          const tick = (now: number) => {
            const t = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - t, 3);
            setDisplay(Math.round(eased * value));
            if (t < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  const formatted = new Intl.NumberFormat("en-AE").format(display);
  const isDarkVariant = variant !== "light";
  const labelColor = variant === "light" ? "text-[color:var(--color-muted-foreground)]" : "text-white/80";

  return (
    <div
      ref={ref}
      className={cn(
        "relative isolate flex flex-col items-start gap-3 overflow-hidden rounded-[var(--radius-lg)] p-6 shadow-[var(--shadow-sm)]",
        variantStyles[variant],
        className,
      )}
    >
      {isDarkVariant ? (
        <div
          aria-hidden
          className="absolute inset-0 -z-10 opacity-40 dot-grid-bg-dark"
        />
      ) : null}
      {icon ? (
        <span
          className={cn(
            "inline-flex h-12 w-12 items-center justify-center rounded-[var(--radius-md)]",
            iconBgMap[variant],
          )}
        >
          {icon}
        </span>
      ) : null}
      <div className="font-[family-name:var(--font-display)] text-4xl font-extrabold sm:text-5xl">
        {prefix}
        {formatted}
        {suffix ? (
          <span
            className={cn(
              variant === "light" ? "text-[color:var(--color-track-orange)]" : "opacity-90",
            )}
          >
            {suffix}
          </span>
        ) : null}
      </div>
      <p className={cn("text-sm sm:text-base", labelColor)}>{label}</p>
    </div>
  );
}
