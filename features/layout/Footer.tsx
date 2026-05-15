"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { Mail, MapPin } from "lucide-react";

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);
const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);
const YoutubeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
    <path d="m10 15 5-3-5-3z" />
  </svg>
);
import { Logo } from "./Logo";
import {
  footerExplore,
  footerExperiences,
  footerSupport,
  footerLegal,
} from "./nav-config";
import { NewsletterEmbed } from "@/features/newsletter/components/NewsletterEmbed";
import type { Locale } from "@/features/i18n/config";

export function Footer() {
  const t = useTranslations();
  const locale = useLocale() as Locale;
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[color:var(--color-racing-blue)] text-white">
      <div className="mx-auto max-w-7xl container-px py-16">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo locale={locale} variant="light" />
            <p className="mt-4 max-w-sm text-sm text-white/70">{t("footer.tagline")}</p>
            <address className="mt-6 flex items-start gap-3 not-italic text-sm text-white/80">
              <MapPin size={16} className="mt-1 shrink-0" aria-hidden />
              <span>
                {t("footer.addressLine1")}
                <br />
                {t("footer.addressLine2")}
              </span>
            </address>
            <a
              href="mailto:hello@rctrack.ae"
              className="mt-3 inline-flex items-center gap-3 text-sm text-white/80 hover:text-white"
            >
              <Mail size={16} aria-hidden />
              hello@rctrack.ae
            </a>
            <div className="mt-6 flex items-center gap-2">
              <SocialIconLink href="https://instagram.com" label="Instagram">
                <InstagramIcon aria-hidden />
              </SocialIconLink>
              <SocialIconLink href="https://facebook.com" label="Facebook">
                <FacebookIcon aria-hidden />
              </SocialIconLink>
              <SocialIconLink href="https://youtube.com" label="YouTube">
                <YoutubeIcon aria-hidden />
              </SocialIconLink>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-5">
            <FooterColumn title={t("footer.headingExplore")} links={footerExplore} locale={locale} />
            <FooterColumn
              title={t("footer.headingExperiences")}
              links={footerExperiences}
              locale={locale}
            />
            <FooterColumn title={t("footer.headingSupport")} links={footerSupport} locale={locale} />
            <FooterColumn title={t("footer.headingLegal")} links={footerLegal} locale={locale} />
          </div>
          <div className="lg:col-span-3">
            <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold">
              {t("footer.newsletterTitle")}
            </h3>
            <p className="mt-2 text-sm text-white/70">{t("footer.newsletterBody")}</p>
            <div className="mt-4">
              <NewsletterEmbed source="footer" theme="dark" />
            </div>
          </div>
        </div>
        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-white/15 pt-8 text-sm text-white/70 sm:flex-row sm:items-center">
          <p>
            {year} {t("brand.name")}. {t("footer.rights")}
          </p>
          <button
            type="button"
            onClick={() => window.dispatchEvent(new Event("open-cookie-prefs"))}
            className="hover:text-white"
          >
            {t("cookies.manage")}
          </button>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
  locale,
}: {
  title: string;
  links: typeof footerExplore;
  locale: Locale;
}) {
  const t = useTranslations();
  return (
    <div>
      <h3 className="text-xs font-semibold uppercase tracking-wider text-white/60">{title}</h3>
      <ul className="mt-4 flex flex-col gap-2">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={`/${locale}${link.href}`}
              className="text-sm text-white/80 hover:text-white"
            >
              {t(link.labelKey)}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SocialIconLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 hover:bg-white/10"
    >
      {children}
    </a>
  );
}
