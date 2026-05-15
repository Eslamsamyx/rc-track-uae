import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Hero, SectionHeader } from "@/features/design-system";
import { TallyFormEmbed } from "@/features/forms/components/TallyFormEmbed";
import { isLocale, type Locale } from "@/features/i18n/config";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "press" });
  return { title: t("metaTitle"), description: t("metaDescription") };
}

export default async function PressPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) return null;
  const typedLocale: Locale = locale;
  setRequestLocale(typedLocale);
  const t = await getTranslations();
  return (
    <>
      <Hero variant="compact" eyebrow={t("nav.press")} headline={t("press.title")} body={t("press.intro")} />
      <section className="section-y">
        <div className="mx-auto max-w-3xl container-px">
          <SectionHeader heading={t("press.title")} align="center" />
          <div className="mt-8 rounded-[var(--radius-lg)] bg-white p-6 ring-1 ring-[color:var(--color-border)]">
            <TallyFormEmbed
              formId={process.env.NEXT_PUBLIC_TALLY_FORM_PRESS}
              height={640}
              title="Press contact"
            />
          </div>
        </div>
      </section>
    </>
  );
}
