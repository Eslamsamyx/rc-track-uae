import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Hero, SectionHeader, PriceCard } from "@/features/design-system";
import { BookingTrigger } from "@/features/booking/components/BookingTrigger";
import { isLocale, type Locale } from "@/features/i18n/config";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "academy" });
  return { title: t("metaTitle"), description: t("metaDescription") };
}

export default async function AcademyPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) return null;
  const typedLocale: Locale = locale;
  setRequestLocale(typedLocale);
  const t = await getTranslations();
  const tiers = [
    { id: "beginner", service: "academy-beginner" },
    { id: "intermediate", service: "academy-intermediate" },
    { id: "advanced", service: "academy-advanced" },
  ] as const;
  return (
    <>
      <Hero
        eyebrow={t("academy.heroEyebrow")}
        headline={t("academy.heroHeadline")}
        body={t("academy.heroBody")}
        imageUrl="/generated/hero/academy.png"
        primaryCta={
          <BookingTrigger service="academy-beginner" variant="primary" size="lg" labelKey="common.getStarted" />
        }
      />
      <section className="section-y">
        <div className="mx-auto max-w-7xl container-px">
          <SectionHeader heading={t("academy.tiersHeading")} align="center" />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {tiers.map((tier) => (
              <PriceCard
                key={tier.id}
                title={t(`academy.${tier.id}.title`)}
                price={t(`academy.${tier.id}.price`)}
                features={t.raw(`academy.${tier.id}.items`) as string[]}
                highlighted={tier.id === "intermediate"}
                badge={tier.id === "intermediate" ? t("memberships.tiers.mostPopular") : undefined}
                cta={
                  <BookingTrigger
                    service={tier.service}
                    variant={tier.id === "intermediate" ? "white" : "primary"}
                    labelKey="common.bookNow"
                  />
                }
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
