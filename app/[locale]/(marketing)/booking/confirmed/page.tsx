import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { BookingConfirmedCard } from "@/features/booking/components/BookingConfirmedCard";
import { isLocale, type Locale } from "@/features/i18n/config";

interface Props {
  params: Promise<{ locale: string }>;
}

export const dynamic = "force-static";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "confirmed" });
  return { title: t("metaTitle"), robots: { index: false, follow: false } };
}

export default async function BookingConfirmedPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) return null;
  const typedLocale: Locale = locale;
  setRequestLocale(typedLocale);
  return (
    <section className="section-y">
      <div className="mx-auto max-w-7xl container-px">
        <BookingConfirmedCard />
      </div>
    </section>
  );
}
