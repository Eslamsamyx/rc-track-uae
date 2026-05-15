import type { ReactNode } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  title: string;
  price: string;
  frequency?: string;
  features: ReadonlyArray<string>;
  cta: ReactNode;
  highlighted?: boolean;
  badge?: string;
  description?: string;
  className?: string;
}

export function PriceCard({
  title,
  price,
  frequency,
  features,
  cta,
  highlighted = false,
  badge,
  description,
  className,
}: Props) {
  return (
    <div
      className={cn(
        "relative flex h-full flex-col rounded-[var(--radius-lg)] p-6 ring-1 ring-[color:var(--color-border)] shadow-[var(--shadow-sm)] sm:p-8",
        highlighted
          ? "bg-[color:var(--color-racing-blue)] text-white ring-[color:var(--color-racing-blue)] shadow-[var(--shadow-lg)]"
          : "bg-white",
        className,
      )}
    >
      {badge ? (
        <span className="absolute -top-3 inset-inline-start-6 rounded-[var(--radius-pill)] bg-[color:var(--color-track-orange)] px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white">
          {badge}
        </span>
      ) : null}
      <h3
        className={cn(
          "font-[family-name:var(--font-display)] text-2xl font-bold",
          highlighted ? "text-white" : "text-[color:var(--color-racing-blue)]",
        )}
      >
        {title}
      </h3>
      {description ? (
        <p
          className={cn(
            "mt-2 text-sm",
            highlighted ? "text-white/80" : "text-[color:var(--color-muted-foreground)]",
          )}
        >
          {description}
        </p>
      ) : null}
      <div className="mt-5 flex items-baseline gap-2">
        <span className="font-[family-name:var(--font-display)] text-4xl font-extrabold tracking-tight">
          {price}
        </span>
        {frequency ? (
          <span
            className={cn(
              "text-sm",
              highlighted ? "text-white/70" : "text-[color:var(--color-muted-foreground)]",
            )}
          >
            {frequency}
          </span>
        ) : null}
      </div>
      <ul className="mt-6 flex flex-col gap-3">
        {features.map((feature, i) => (
          <li key={i} className="flex items-start gap-3">
            <Check
              size={18}
              className={cn(
                "mt-0.5 shrink-0",
                highlighted ? "text-[color:var(--color-track-orange-50)]" : "text-[color:var(--color-track-orange)]",
              )}
              aria-hidden
            />
            <span className={cn("text-sm", highlighted ? "text-white/90" : "text-[color:var(--color-foreground)]")}>{feature}</span>
          </li>
        ))}
      </ul>
      <div className="mt-8">{cta}</div>
    </div>
  );
}
