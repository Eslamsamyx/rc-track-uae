import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface Props {
  children: ReactNode;
  dotColor?: "green" | "orange" | "red" | "white";
  variant?: "light" | "dark" | "outline";
  className?: string;
}

const dotMap: Record<NonNullable<Props["dotColor"]>, string> = {
  green: "bg-[color:var(--color-go-green)]",
  orange: "bg-[color:var(--color-track-orange)]",
  red: "bg-[color:var(--color-stop-red)]",
  white: "bg-white",
};

export function AnimatedBadge({
  children,
  dotColor = "green",
  variant = "light",
  className,
}: Props) {
  const variantStyles =
    variant === "dark"
      ? "bg-white/10 text-white ring-1 ring-white/20 backdrop-blur"
      : variant === "outline"
        ? "bg-transparent text-[color:var(--color-racing-blue)] ring-1 ring-[color:var(--color-racing-blue)]/20"
        : "bg-white text-[color:var(--color-racing-blue)] ring-1 ring-[color:var(--color-border)] shadow-[var(--shadow-sm)]";

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-[var(--radius-pill)] px-3 py-1.5 text-xs font-semibold uppercase tracking-wider",
        variantStyles,
        className,
      )}
    >
      <span className="relative inline-flex h-2 w-2">
        <span
          className={cn(
            "absolute inset-0 inline-flex rounded-full opacity-60 animate-pulse-dot",
            dotMap[dotColor],
          )}
        />
        <span className={cn("relative inline-flex rounded-full h-2 w-2", dotMap[dotColor])} />
      </span>
      {children}
    </span>
  );
}
