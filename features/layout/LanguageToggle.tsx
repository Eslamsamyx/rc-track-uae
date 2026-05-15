"use client";

import { useLocale } from "next-intl";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Globe } from "lucide-react";
import type { Locale } from "@/features/i18n/config";

export function LanguageToggle({ className }: { className?: string }) {
  const locale = useLocale() as Locale;
  const pathname = usePathname() || "/";
  const otherLocale: Locale = locale === "en" ? "ar" : "en";

  const segments = pathname.split("/");
  if (segments[1] === locale) {
    segments[1] = otherLocale;
  } else {
    segments.splice(1, 0, otherLocale);
  }
  const otherHref = segments.join("/") || `/${otherLocale}`;

  return (
    <Link
      href={otherHref}
      className={className}
      hrefLang={otherLocale}
      aria-label={otherLocale === "ar" ? "Switch to Arabic" : "Switch to English"}
    >
      <span className="inline-flex items-center gap-2 rounded-full border border-[color:var(--color-border)] bg-white/80 px-3 py-2 text-sm font-medium backdrop-blur transition-colors hover:bg-[color:var(--color-mist)]">
        <Globe size={16} aria-hidden />
        {otherLocale === "ar" ? "العربية" : "English"}
      </span>
    </Link>
  );
}
