import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { DecorOrb } from "./DecorOrb";

interface Props {
  variant?: "light" | "mist" | "dark" | "racing" | "sunset";
  pattern?: "none" | "dots" | "grid" | "stripes" | "checkered";
  orbs?: boolean;
  className?: string;
  children: ReactNode;
  id?: string;
}

export function SectionBackground({
  variant = "light",
  pattern = "none",
  orbs = false,
  className,
  children,
  id,
}: Props) {
  const isDark = variant === "dark" || variant === "racing" || variant === "sunset";

  const variantStyles =
    variant === "racing"
      ? "bg-racing-gradient text-white"
      : variant === "sunset"
        ? "bg-sunset-gradient text-white"
        : variant === "dark"
          ? "bg-[color:var(--color-checkered-black)] text-white"
          : variant === "mist"
            ? "bg-[color:var(--color-mist)] text-[color:var(--color-foreground)]"
            : "bg-white text-[color:var(--color-foreground)]";

  const patternClass =
    pattern === "dots"
      ? isDark
        ? "dot-grid-bg-dark"
        : "dot-grid-bg"
      : pattern === "grid"
        ? isDark
          ? "racing-grid-bg-dark"
          : "racing-grid-bg"
        : pattern === "stripes"
          ? "diagonal-stripes-bg"
          : pattern === "checkered"
            ? "checkered-bg"
            : "";

  return (
    <section id={id} className={cn("relative isolate overflow-hidden", variantStyles, className)}>
      {pattern !== "none" ? (
        <div aria-hidden className={cn("absolute inset-0 -z-10 opacity-60", patternClass)} />
      ) : null}
      {orbs ? (
        <>
          <DecorOrb
            color={isDark ? "orange" : "orange"}
            size="xl"
            className="-top-32 -left-24 opacity-25"
          />
          <DecorOrb
            color={isDark ? "blue" : "blue"}
            size="lg"
            className="bottom-0 -right-20 opacity-25"
          />
        </>
      ) : null}
      <div className="relative">{children}</div>
    </section>
  );
}
