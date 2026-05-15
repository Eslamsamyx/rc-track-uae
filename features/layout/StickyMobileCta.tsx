"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import type { Locale } from "@/features/i18n/config";

export function StickyMobileCta({
  href,
  labelKey,
}: {
  href: string;
  labelKey: string;
}) {
  const t = useTranslations();
  const locale = useLocale() as Locale;
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-[color:var(--color-border)] bg-white/95 p-3 backdrop-blur md:hidden">
      <Link
        href={`/${locale}${href}`}
        className="inline-flex w-full items-center justify-center rounded-[var(--radius-md)] bg-[color:var(--color-track-orange)] px-5 py-3 text-base font-semibold text-white shadow-[var(--shadow-md)] active:bg-[color:var(--color-track-orange-600)]"
      >
        {t(labelKey)}
      </Link>
    </div>
  );
}
