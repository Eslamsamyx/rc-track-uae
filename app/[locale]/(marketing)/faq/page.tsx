import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Hero, SectionHeader, FaqAccordion } from "@/features/design-system";
import { fullFaq } from "@/features/content/faq-data";
import { isLocale, type Locale } from "@/features/i18n/config";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "faq" });
  return { title: t("metaTitle"), description: t("metaDescription") };
}

export default async function FaqPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) return null;
  const typedLocale: Locale = locale;
  setRequestLocale(typedLocale);
  const t = await getTranslations();
  const groups = fullFaq(typedLocale);
  return (
    <>
      <Hero variant="compact" eyebrow={t("nav.faq")} headline={t("faq.title")} body={t("faq.intro")} />
      <section className="section-y">
        <div className="mx-auto max-w-3xl container-px space-y-12">
          {groups.map((group) => (
            <div key={group.id}>
              <SectionHeader heading={t(group.labelKey)} />
              <div className="mt-6">
                <FaqAccordion questions={group.questions} pageTitle={t(group.labelKey)} />
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
