import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface TimelineStep {
  id: string;
  title: string;
  body: string;
  icon?: ReactNode;
}

interface Props {
  steps: TimelineStep[];
  className?: string;
  variant?: "light" | "dark";
}

export function HowItWorksTimeline({ steps, className, variant = "light" }: Props) {
  const isDark = variant === "dark";

  return (
    <ol
      className={cn(
        "relative grid gap-8 md:gap-6 md:grid-cols-3",
        className,
      )}
    >
      {/* Horizontal connector line on md+ */}
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-x-12 top-7 hidden h-1 md:block",
          isDark
            ? "bg-gradient-to-r from-transparent via-white/30 to-transparent"
            : "bg-gradient-to-r from-transparent via-[color:var(--color-track-orange)]/40 to-transparent",
        )}
      />

      {steps.map((step, i) => (
        <li key={step.id} className="relative flex flex-col items-start gap-4 md:items-center md:text-center">
          <div className="relative">
            <span
              className={cn(
                "inline-flex h-14 w-14 items-center justify-center rounded-full text-xl font-extrabold shadow-[var(--shadow-md)]",
                isDark
                  ? "bg-[color:var(--color-track-orange)] text-white ring-4 ring-white/10"
                  : "bg-[color:var(--color-track-orange)] text-white ring-4 ring-[color:var(--color-track-orange-50)]",
              )}
            >
              {step.icon ?? i + 1}
            </span>
            <span
              aria-hidden
              className={cn(
                "absolute -inset-2 -z-10 rounded-full opacity-50 blur-md",
                "bg-[color:var(--color-track-orange)]/40",
              )}
            />
          </div>

          <div className="flex flex-col gap-2 md:items-center">
            <span
              className={cn(
                "text-xs font-semibold uppercase tracking-wider",
                isDark ? "text-white/60" : "text-[color:var(--color-muted-foreground)]",
              )}
            >
              Step {String(i + 1).padStart(2, "0")}
            </span>
            <h3
              className={cn(
                "font-[family-name:var(--font-display)] text-xl font-bold tracking-tight md:text-2xl",
                isDark ? "text-white" : "text-[color:var(--color-racing-blue)]",
              )}
            >
              {step.title.replace(/^\d+\.\s*/, "")}
            </h3>
            <p
              className={cn(
                "max-w-sm text-sm leading-relaxed sm:text-base",
                isDark ? "text-white/75" : "text-[color:var(--color-muted-foreground)]",
              )}
            >
              {step.body}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}
