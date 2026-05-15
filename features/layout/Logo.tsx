import Link from "next/link";
import type { Locale } from "@/features/i18n/config";

export function Logo({ locale, variant = "dark" }: { locale: Locale; variant?: "dark" | "light" }) {
  const colorMain = variant === "dark" ? "var(--color-racing-blue)" : "#ffffff";
  const colorAccent = "var(--color-track-orange)";
  return (
    <Link
      href={`/${locale}`}
      className="inline-flex items-center gap-2 font-[family-name:var(--font-display)] text-lg font-extrabold tracking-tight"
      aria-label="RC Track UAE home"
    >
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden>
        <circle cx="18" cy="18" r="17" stroke={colorMain} strokeWidth="2" />
        <path
          d="M11 18 a7 7 0 0 1 14 0"
          stroke={colorAccent}
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
        <circle cx="18" cy="18" r="3" fill={colorAccent} />
      </svg>
      <span style={{ color: colorMain }}>
        RC Track <span style={{ color: colorAccent }}>UAE</span>
      </span>
    </Link>
  );
}
