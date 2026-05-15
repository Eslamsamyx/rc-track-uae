"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { Drawer } from "@/features/design-system";
import { primaryNav } from "./nav-config";
import { LanguageToggle } from "./LanguageToggle";
import type { Locale } from "@/features/i18n/config";

export function MobileNavDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const locale = useLocale() as Locale;
  const t = useTranslations();
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <Drawer open={open} onClose={onClose} title={t("common.menu")}>
      <ul className="flex flex-col gap-1">
        <li>
          <Link
            href={`/${locale}`}
            onClick={onClose}
            className="block rounded-[var(--radius-sm)] px-3 py-3 text-base font-medium hover:bg-[color:var(--color-mist)]"
          >
            {t("nav.home")}
          </Link>
        </li>
        {primaryNav.map((link) => {
          const hasChildren = (link.children?.length ?? 0) > 0;
          const isOpen = expanded === link.href;
          return (
            <li key={link.href}>
              {hasChildren ? (
                <>
                  <button
                    type="button"
                    onClick={() => setExpanded(isOpen ? null : link.href)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between rounded-[var(--radius-sm)] px-3 py-3 text-base font-medium hover:bg-[color:var(--color-mist)]"
                  >
                    {t(link.labelKey)}
                    <ChevronDown
                      size={16}
                      aria-hidden
                      className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  {isOpen ? (
                    <ul className="ms-3 mt-1 flex flex-col gap-0.5 border-s border-[color:var(--color-border)] ps-3">
                      {link.children!.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={`/${locale}${child.href}`}
                            onClick={onClose}
                            className="block rounded-[var(--radius-sm)] px-3 py-2 text-sm hover:bg-[color:var(--color-mist)]"
                          >
                            {t(child.labelKey)}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </>
              ) : (
                <Link
                  href={`/${locale}${link.href}`}
                  onClick={onClose}
                  className="block rounded-[var(--radius-sm)] px-3 py-3 text-base font-medium hover:bg-[color:var(--color-mist)]"
                >
                  {t(link.labelKey)}
                </Link>
              )}
            </li>
          );
        })}
        <li className="pt-3">
          <Link
            href={`/${locale}/contact`}
            onClick={onClose}
            className="block rounded-[var(--radius-sm)] px-3 py-3 text-base font-medium hover:bg-[color:var(--color-mist)]"
          >
            {t("nav.contact")}
          </Link>
        </li>
        <li>
          <Link
            href={`/${locale}/faq`}
            onClick={onClose}
            className="block rounded-[var(--radius-sm)] px-3 py-3 text-base font-medium hover:bg-[color:var(--color-mist)]"
          >
            {t("nav.faq")}
          </Link>
        </li>
      </ul>
      <div className="mt-6 flex items-center justify-between border-t border-[color:var(--color-border)] pt-6">
        <span className="text-sm text-[color:var(--color-muted-foreground)]">{t("common.language")}</span>
        <LanguageToggle />
      </div>
      <div className="mt-4">
        <Link
          href={`/${locale}/book`}
          onClick={onClose}
          className="inline-flex w-full items-center justify-center rounded-[var(--radius-md)] bg-[color:var(--color-track-orange)] px-5 py-3 font-semibold text-white hover:bg-[color:var(--color-track-orange-600)]"
        >
          {t("header.ctaPrimary")}
        </Link>
      </div>
    </Drawer>
  );
}
