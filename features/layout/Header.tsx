"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { Menu, ChevronDown } from "lucide-react";
import { Logo } from "./Logo";
import { LanguageToggle } from "./LanguageToggle";
import { primaryNav } from "./nav-config";
import { cn } from "@/lib/utils";
import type { Locale } from "@/features/i18n/config";
import { MobileNavDrawer } from "./MobileNavDrawer";

export function Header() {
  const t = useTranslations();
  const locale = useLocale() as Locale;
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <a href="#main" className="skip-link">
        {t("common.skipToContent")}
      </a>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-40 transition-colors duration-300",
          scrolled
            ? "bg-white/95 backdrop-blur-md border-b border-[color:var(--color-border)] shadow-[var(--shadow-sm)]"
            : "bg-transparent",
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 container-px py-4">
          <Logo locale={locale} />
          <nav aria-label="Primary" className="hidden lg:flex items-center gap-1">
            {primaryNav.map((link) => (
              <NavItem key={link.href} link={link} locale={locale} />
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <LanguageToggle className="hidden sm:inline-flex" />
            <Link
              href={`/${locale}/book`}
              className="hidden md:inline-flex h-11 items-center justify-center gap-2 rounded-[var(--radius-md)] bg-[color:var(--color-track-orange)] px-5 text-base font-semibold text-white transition-colors hover:bg-[color:var(--color-track-orange-600)]"
            >
              {t("header.ctaPrimary")}
            </Link>
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label={t("common.menu")}
              className="lg:hidden inline-flex h-11 w-11 items-center justify-center rounded-[var(--radius-md)] border border-[color:var(--color-border)] bg-white text-[color:var(--color-foreground)] hover:bg-[color:var(--color-mist)]"
            >
              <Menu size={20} aria-hidden />
            </button>
          </div>
        </div>
      </header>
      <div aria-hidden className="h-[72px]" />
      <MobileNavDrawer open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}

function NavItem({ link, locale }: { link: (typeof primaryNav)[number]; locale: Locale }) {
  const t = useTranslations();
  const [open, setOpen] = useState(false);
  const hasChildren = (link.children?.length ?? 0) > 0;
  const href = `/${locale}${link.href}`;

  return (
    <div
      className="relative"
      onMouseEnter={() => hasChildren && setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <Link
        href={href}
        className="inline-flex items-center gap-1 px-3 py-2 text-sm font-medium text-[color:var(--color-foreground)] hover:text-[color:var(--color-track-orange-600)] rounded-md"
        aria-haspopup={hasChildren || undefined}
        aria-expanded={hasChildren ? open : undefined}
        onFocus={() => hasChildren && setOpen(true)}
      >
        {t(link.labelKey)}
        {hasChildren ? <ChevronDown size={14} aria-hidden /> : null}
      </Link>
      {hasChildren && open ? (
        <div className="absolute top-full start-0 mt-1 min-w-[12rem] rounded-[var(--radius-md)] border border-[color:var(--color-border)] bg-white p-2 shadow-[var(--shadow-md)]">
          {link.children!.map((child) => (
            <Link
              key={child.href}
              href={`/${locale}${child.href}`}
              className="block rounded-[var(--radius-sm)] px-3 py-2 text-sm text-[color:var(--color-foreground)] hover:bg-[color:var(--color-mist)] hover:text-[color:var(--color-track-orange-600)]"
            >
              {t(child.labelKey)}
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  );
}
