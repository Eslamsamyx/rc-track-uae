import type { ReactNode } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  title: string;
  price: string;
  duration?: string;
  guests?: string;
  items: ReadonlyArray<string>;
  cta?: ReactNode;
  variant?: "default" | "highlight";
  className?: string;
}

export function PackageCard({
  title,
  price,
  duration,
  guests,
  items,
  cta,
  variant = "default",
  className,
}: Props) {
  return (
    <article
      className={cn(
        "flex h-full flex-col gap-4 rounded-[var(--radius-lg)] p-6 ring-1 ring-[color:var(--color-border)] shadow-[var(--shadow-sm)]",
        variant === "highlight"
          ? "bg-[color:var(--color-racing-blue)] text-white shadow-[var(--shadow-md)]"
          : "bg-white",
        className,
      )}
    >
      <header className="flex items-baseline justify-between gap-2">
        <h3
          className={cn(
            "font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight",
            variant === "highlight" ? "text-white" : "text-[color:var(--color-racing-blue)]",
          )}
        >
          {title}
        </h3>
        <div className="text-end">
          <p className="font-[family-name:var(--font-display)] text-2xl font-extrabold">{price}</p>
        </div>
      </header>
      {(duration || guests) && (
        <p
          className={cn(
            "text-sm",
            variant === "highlight" ? "text-white/80" : "text-[color:var(--color-muted-foreground)]",
          )}
        >
          {[duration, guests].filter(Boolean).join(" : ")}
        </p>
      )}
      <ul className="mt-2 flex flex-col gap-2">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-sm">
            <Check
              size={16}
              className={cn(
                "mt-1 shrink-0",
                variant === "highlight" ? "text-[color:var(--color-track-orange-50)]" : "text-[color:var(--color-track-orange)]",
              )}
              aria-hidden
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
      {cta ? <div className="mt-auto pt-4">{cta}</div> : null}
    </article>
  );
}
