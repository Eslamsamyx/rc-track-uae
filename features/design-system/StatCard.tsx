"use client";

import { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";

interface Props {
  value: number;
  suffix?: string;
  label: string;
  className?: string;
}

export function StatCard({ value, suffix, label, className }: Props) {
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
          const duration = 1200;
          const tick = (now: number) => {
            const t = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - t, 3);
            setDisplay(Math.round(eased * value));
            if (t < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  const formatted = new Intl.NumberFormat("en-AE").format(display);

  return (
    <div
      ref={ref}
      className={cn(
        "flex flex-col items-start gap-2 rounded-[var(--radius-lg)] bg-white p-6 shadow-[var(--shadow-sm)] ring-1 ring-[color:var(--color-border)]",
        className,
      )}
    >
      <div className="font-[family-name:var(--font-display)] text-4xl font-extrabold text-[color:var(--color-racing-blue)] sm:text-5xl">
        {formatted}
        {suffix ? <span className="text-[color:var(--color-track-orange)]">{suffix}</span> : null}
      </div>
      <p className="text-sm text-[color:var(--color-muted-foreground)] sm:text-base">{label}</p>
    </div>
  );
}
