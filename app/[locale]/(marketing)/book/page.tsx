import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Hero } from "@/features/design-system";
import { BookingWidgetEmbed } from "@/features/booking/components/BookingWidgetEmbed";
import { isLocale, type Locale } from "@/features/i18n/config";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "booking" });
  return { title: t("metaTitle"), description: t("metaDescription") };
}

export default async function BookPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) return null;
  const typedLocale: Locale = locale;
  setRequestLocale(typedLocale);
  const t = await getTranslations();
  return (
    <>
      <Hero variant="compact" imageUrl="/generated/hero/booking.png" eyebrow={t("nav.home")} headline={t("booking.title")} body={t("booking.intro")} />
      <section className="section-y">
        <div className="mx-auto max-w-5xl container-px">
          <BookingWidgetEmbed />
        </div>
      </section>
    </>
  );
}
