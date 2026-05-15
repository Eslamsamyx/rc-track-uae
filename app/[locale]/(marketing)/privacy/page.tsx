import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Hero } from "@/features/design-system";
import { isLocale, type Locale } from "@/features/i18n/config";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "privacy" });
  return { title: t("metaTitle"), description: t("title") };
}

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) return null;
  const typedLocale: Locale = locale;
  setRequestLocale(typedLocale);
  const t = await getTranslations();
  return (
    <>
      <Hero variant="compact" eyebrow={t("privacy.title")} headline={t("privacy.title")} body={`${t("privacy.lastUpdated")}: 2026-05-15`} />
      <section className="section-y">
        <div className="mx-auto max-w-3xl container-px prose">
          <h2>Who we are</h2>
          <p>
            RC Track UAE LLC operates this site and the venue under licence in the United Arab Emirates.
            For any privacy enquiry, write to privacy@rctrack.ae.
          </p>
          <h2>What we collect</h2>
          <p>
            We collect information you provide when you book, contact us, sign up to our newsletter, or buy
            from our shop. We also use cookies for analytics and marketing, but only after you grant consent.
          </p>
          <h2>How we use it</h2>
          <p>
            To deliver your booking, ship your order, and let you know about race nights you might enjoy.
            We do not sell personal data.
          </p>
          <h2>Your rights</h2>
          <p>
            You can request a copy of your data, ask us to delete it, or withdraw consent at any time.
            Email privacy@rctrack.ae.
          </p>
          <h2>Storage</h2>
          <p>
            Data is processed in the United Arab Emirates and, where applicable, in the European Union under
            GDPR-compliant safeguards.
          </p>
        </div>
      </section>
    </>
  );
}
