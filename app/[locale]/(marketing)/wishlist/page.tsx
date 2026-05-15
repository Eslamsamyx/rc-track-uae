import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Hero, SectionHeader } from "@/features/design-system";
import { WishlistList } from "@/features/shop/components/WishlistList";
import { SAMPLE_CATALOGUE } from "@/features/shop/data/catalogue";
import { isLocale, type Locale } from "@/features/i18n/config";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "wishlist" });
  return { title: t("metaTitle"), description: t("metaDescription") };
}

export default async function WishlistPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) return null;
  const typedLocale: Locale = locale;
  setRequestLocale(typedLocale);
  const t = await getTranslations();
  return (
    <>
      <Hero variant="compact" eyebrow={t("nav.shop")} headline={t("wishlist.title")} />
      <section className="section-y">
        <div className="mx-auto max-w-7xl container-px">
          <SectionHeader heading={t("wishlist.title")} />
          <div className="mt-8">
            <WishlistList catalogue={SAMPLE_CATALOGUE} />
          </div>
        </div>
      </section>
    </>
  );
}
