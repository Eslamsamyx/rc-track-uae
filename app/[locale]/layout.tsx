import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import type { ReactNode } from "react";
import Script from "next/script";
import { locales, isLocale, type Locale } from "@/features/i18n/config";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) {
    notFound();
  }
  const typedLocale: Locale = locale;
  setRequestLocale(typedLocale);
  const messages = await getMessages();
  const dir = typedLocale === "ar" ? "rtl" : "ltr";

  return (
    <NextIntlClientProvider locale={typedLocale} messages={messages}>
      <Script id="set-html-attrs" strategy="beforeInteractive">
        {`document.documentElement.lang = "${typedLocale}"; document.documentElement.dir = "${dir}";`}
      </Script>
      <div lang={typedLocale} dir={dir} data-locale={typedLocale} className="contents">
        {children}
      </div>
    </NextIntlClientProvider>
  );
}
