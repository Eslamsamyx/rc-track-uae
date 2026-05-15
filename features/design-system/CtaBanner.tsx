import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { DecorOrb } from "./decor/DecorOrb";
import { CurbStrip } from "./decor/CurbStrip";

interface Props {
  heading: string;
  body?: string;
  cta: ReactNode;
  variant?: "primary" | "secondary" | "racing" | "sunset";
  className?: string;
  imageUrl?: string;
}

export function CtaBanner({
  heading,
  body,
  cta,
  variant = "primary",
  className,
  imageUrl,
}: Props) {
  return (
    <section className={cn("py-16", className)}>
      <div className="mx-auto max-w-7xl container-px">
        <div
          className={cn(
            "relative isolate flex flex-col items-start justify-between gap-6 overflow-hidden rounded-[var(--radius-lg)] p-8 md:flex-row md:items-center md:p-12 shadow-[var(--shadow-lg)]",
            !imageUrl && variant === "primary" && "bg-orange-gradient text-white",
            !imageUrl && variant === "secondary" && "bg-[color:var(--color-racing-blue)] text-white",
            !imageUrl && variant === "racing" && "bg-racing-gradient text-white",
            !imageUrl && variant === "sunset" && "bg-sunset-gradient text-white",
            imageUrl && "text-white",
          )}
        >
          {imageUrl ? (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imageUrl}
                alt=""
                aria-hidden
                className="absolute inset-0 -z-10 h-full w-full object-cover"
              />
              <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-[color:var(--color-racing-blue)]/95 via-[color:var(--color-racing-blue)]/70 to-[color:var(--color-racing-blue)]/30" />
            </>
          ) : null}

          {/* Decorative bits */}
          <DecorOrb color="orange" size="md" className="-top-12 -right-10 opacity-25" blur="2xl" />
          <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />
          <CurbStrip className="absolute inset-x-0 bottom-0" height={6} />

          <div className="max-w-2xl">
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl text-balance">
              {heading}
            </h2>
            {body ? <p className="mt-3 text-white/90 text-pretty text-lg">{body}</p> : null}
          </div>
          <div className="shrink-0 relative z-10">{cta}</div>
        </div>
      </div>
    </section>
  );
}
