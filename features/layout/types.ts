import type { Locale } from "@/features/i18n/config";

export interface NavLink {
  href: string;
  labelKey: string;
  children?: NavLink[];
}

export interface LayoutProps {
  locale: Locale;
}
