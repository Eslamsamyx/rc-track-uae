import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Breadcrumb } from "@/features/design-system";
import { SAMPLE_CATALOGUE } from "@/features/shop/data/catalogue";
import { isLocale, type Locale } from "@/features/i18n/config";
import { ProductClient } from "./ProductClient";

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

export function generateStaticParams() {
  return SAMPLE_CATALOGUE.flatMap((p) =>
    (["en", "ar"] as const).map((locale) => ({ locale, slug: p.slug })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const product = SAMPLE_CATALOGUE.find((p) => p.slug === slug);
  if (!product) return {};
  const title = locale === "ar" ? product.titleAr : product.titleEn;
  const description = locale === "ar" ? product.descriptionAr : product.descriptionEn;
  return { title, description };
}

export default async function ProductPage({ params }: Props) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const typedLocale: Locale = locale;
  setRequestLocale(typedLocale);
  const product = SAMPLE_CATALOGUE.find((p) => p.slug === slug);
  if (!product) notFound();
  const t = await getTranslations();
  return (
    <section className="section-y">
      <div className="mx-auto max-w-7xl container-px">
        <Breadcrumb
          items={[
            { label: t("nav.home"), href: `/${typedLocale}` },
            { label: t("nav.shop"), href: `/${typedLocale}/shop` },
            { label: t(`shop.categories.${product.category}`) },
            { label: typedLocale === "ar" ? product.titleAr : product.titleEn },
          ]}
        />
        <div className="mt-8">
          <ProductClient product={product} catalogue={SAMPLE_CATALOGUE} />
        </div>
      </div>
    </section>
  );
}
