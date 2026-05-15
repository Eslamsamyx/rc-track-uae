import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface Props {
  eyebrow?: ReactNode;
  heading: string;
  subhead?: string;
  align?: "start" | "center";
  className?: string;
  cta?: ReactNode;
  /** Optional small decorative icon to render above the eyebrow */
  badge?: ReactNode;
  /** Render heading with track-orange gradient text */
  accent?: boolean;
  /** Light text on dark backgrounds */
  invert?: boolean;
}

export function SectionHeader({
  eyebrow,
  heading,
  subhead,
  align = "start",
  className,
  cta,
  badge,
  accent = false,
  invert = false,
}: Props) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center" ? "items-center text-center" : "items-start",
        cta && "sm:flex-row sm:items-end sm:justify-between sm:gap-8",
        className,
      )}
    >
      <div className={cn("flex flex-col gap-3", align === "center" && !cta && "items-center")}>
        {badge ? <div className="mb-1">{badge}</div> : null}
        {eyebrow ? (
          <span
            className={cn(
              "inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.22em]",
              invert ? "text-[color:var(--color-track-orange)]" : "text-[color:var(--color-track-orange-600)]",
            )}
          >
            <span
              aria-hidden
              className={cn(
                "inline-block h-px w-8",
                invert ? "bg-[color:var(--color-track-orange)]" : "bg-[color:var(--color-track-orange-600)]",
              )}
            />
            {eyebrow}
          </span>
        ) : null}
        <h2
          className={cn(
            "font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl text-balance",
            invert ? "text-white" : "text-[color:var(--color-racing-blue)]",
            accent && "[&>em]:not-italic [&>em]:text-gradient-orange",
          )}
        >
          {heading}
        </h2>
        {subhead ? (
          <p
            className={cn(
              "max-w-2xl text-base sm:text-lg md:text-xl text-pretty",
              invert ? "text-white/75" : "text-[color:var(--color-muted-foreground)]",
            )}
          >
            {subhead}
          </p>
        ) : null}
      </div>
      {cta ? <div className="shrink-0">{cta}</div> : null}
    </div>
  );
}
