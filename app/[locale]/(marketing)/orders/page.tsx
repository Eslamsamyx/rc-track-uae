import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Hero, SectionHeader } from "@/features/design-system";
import { WhatsAppCta } from "@/features/shop/components/WhatsAppCta";
import { isLocale, type Locale } from "@/features/i18n/config";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "orders" });
  return { title: t("metaTitle"), description: t("body") };
}

export default async function OrdersPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) return null;
  const typedLocale: Locale = locale;
  setRequestLocale(typedLocale);
  const t = await getTranslations();
  return (
    <>
      <Hero variant="compact" eyebrow={t("nav.shop")} headline={t("orders.title")} body={t("orders.body")} />
      <section className="section-y">
        <div className="mx-auto max-w-3xl container-px">
          <SectionHeader heading={t("orders.ctaWhatsapp")} align="center" />
          <div className="mt-8 flex justify-center">
            <WhatsAppCta messageKey="whatsapp.messageDefault" source="orders_page" label={t("orders.ctaWhatsapp")} />
          </div>
        </div>
      </section>
    </>
  );
}
