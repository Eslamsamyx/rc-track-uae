import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Hero, SectionHeader } from "@/features/design-system";
import { isLocale, type Locale } from "@/features/i18n/config";
import { ManageCookiesButton } from "./ManageCookiesButton";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "cookies" });
  return { title: t("title"), description: t("body") };
}

export default async function CookiesPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) return null;
  const typedLocale: Locale = locale;
  setRequestLocale(typedLocale);
  const t = await getTranslations();
  return (
    <>
      <Hero variant="compact" eyebrow={t("cookies.title")} headline={t("cookies.title")} body={t("cookies.body")} />
      <section className="section-y">
        <div className="mx-auto max-w-3xl container-px space-y-6">
          <Section title={t("cookies.necessaryTitle")} body={t("cookies.necessaryBody")} />
          <Section title={t("cookies.analyticsTitle")} body={t("cookies.analyticsBody")} />
          <Section title={t("cookies.marketingTitle")} body={t("cookies.marketingBody")} />
          <Section title={t("cookies.personalisationTitle")} body={t("cookies.personalisationBody")} />
          <SectionHeader heading={t("cookies.manage")} />
          <ManageCookiesButton label={t("cookies.manage")} />
        </div>
      </section>
    </>
  );
}

function Section({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-[var(--radius-lg)] bg-white p-6 ring-1 ring-[color:var(--color-border)]">
      <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold text-[color:var(--color-racing-blue)]">
        {title}
      </h3>
      <p className="mt-2 text-sm text-[color:var(--color-muted-foreground)]">{body}</p>
    </div>
  );
}
