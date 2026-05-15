import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Hero, SectionHeader, FeatureRow } from "@/features/design-system";
import { BookingTrigger } from "@/features/booking/components/BookingTrigger";
import { isLocale, type Locale } from "@/features/i18n/config";
import { Camera, Award, Car, MessageCircle } from "lucide-react";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "tourist" });
  return { title: t("metaTitle"), description: t("metaDescription") };
}

export default async function TouristPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) return null;
  const typedLocale: Locale = locale;
  setRequestLocale(typedLocale);
  const t = await getTranslations();
  const features = [
    { id: "track", icon: <Car size={20} aria-hidden />, title: "60 minutes on track", body: "Two layouts, race-prepared cars, marshal on every heat." },
    { id: "photo", icon: <Camera size={20} aria-hidden />, title: "Photo reel", body: "Finish-line photos and a podium shot delivered digitally." },
    { id: "cert", icon: <Award size={20} aria-hidden />, title: "Certificate", body: "Personalised racer certificate you can take home." },
    { id: "wa", icon: <MessageCircle size={20} aria-hidden />, title: "Concierge by WhatsApp", body: "We answer in English, Arabic, Hindi, and Russian." },
  ];
  return (
    <>
      <Hero
        eyebrow={t("tourist.heroEyebrow")}
        headline={t("tourist.heroHeadline")}
        body={t("tourist.heroBody")}
        imageUrl="/generated/hero/tourist.png"
        primaryCta={<BookingTrigger service="trial" variant="primary" size="lg" labelKey="common.bookNow" />}
      />
      <section className="section-y">
        <div className="mx-auto max-w-7xl container-px">
          <SectionHeader heading="What you get" align="center" />
          <div className="mt-10">
            <FeatureRow features={features} cols={4} />
          </div>
        </div>
      </section>
    </>
  );
}
