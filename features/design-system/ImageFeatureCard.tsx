import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { asset } from "@/lib/asset";

interface Props {
  imageUrl: string;
  eyebrow?: string;
  title: string;
  body?: string;
  href?: string;
  cta?: string;
  badge?: ReactNode;
  icon?: ReactNode;
  className?: string;
  aspect?: "video" | "square" | "portrait" | "tall";
  overlay?: "gradient" | "tint" | "minimal";
  size?: "md" | "lg";
}

const aspectMap = {
  video: "aspect-[16/9]",
  square: "aspect-square",
  portrait: "aspect-[3/4]",
  tall: "aspect-[9/16]",
};

export function ImageFeatureCard({
  imageUrl,
  eyebrow,
  title,
  body,
  href,
  cta,
  badge,
  icon,
  className,
  aspect = "portrait",
  overlay = "gradient",
  size = "md",
}: Props) {
  const overlayClass =
    overlay === "tint"
      ? "bg-[color:var(--color-racing-blue)]/60"
      : overlay === "minimal"
        ? "bg-gradient-to-t from-black/60 via-black/0 to-black/0"
        : "bg-gradient-to-t from-black/90 via-black/40 to-black/0";

  const Wrapper = (href ? Link : "div") as React.ElementType;
  const wrapperProps = href ? { href } : {};

  return (
    <Wrapper
      {...wrapperProps}
      className={cn(
        "group relative block overflow-hidden rounded-[var(--radius-lg)] ring-1 ring-[color:var(--color-border)] shadow-[var(--shadow-sm)] transition-all duration-300 hover:shadow-[var(--shadow-lg)]",
        aspectMap[aspect],
        className,
      )}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={asset(imageUrl)}
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
      />
      <div aria-hidden className={cn("absolute inset-0", overlayClass)} />

      {badge ? <div className="absolute top-4 inset-inline-end-4">{badge}</div> : null}

      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2 p-5 sm:p-6 text-white">
        {icon ? (
          <span className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-[var(--radius-md)] bg-[color:var(--color-track-orange)] text-white shadow-[var(--shadow-md)]">
            {icon}
          </span>
        ) : null}
        {eyebrow ? (
          <span className="text-xs font-semibold uppercase tracking-wider text-[color:var(--color-track-orange-50)]">
            {eyebrow}
          </span>
        ) : null}
        <h3
          className={cn(
            "font-[family-name:var(--font-display)] font-bold leading-tight",
            size === "lg" ? "text-2xl sm:text-3xl" : "text-lg sm:text-xl",
          )}
        >
          {title}
        </h3>
        {body ? <p className="text-sm text-white/85 line-clamp-2">{body}</p> : null}
        {cta ? (
          <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-white">
            {cta}
            <ArrowUpRight
              size={16}
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden
            />
          </span>
        ) : null}
      </div>
    </Wrapper>
  );
}
