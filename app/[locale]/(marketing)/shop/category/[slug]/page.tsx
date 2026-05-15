import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Hero, Breadcrumb } from "@/features/design-system";
import { SAMPLE_CATALOGUE, SHOP_CATEGORIES } from "@/features/shop/data/catalogue";
import { isLocale, type Locale } from "@/features/i18n/config";
import { CategoryClient, ShopHeading } from "./CategoryClient";

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

export function generateStaticParams() {
  return SHOP_CATEGORIES.flatMap((cat) =>
    (["en", "ar"] as const).map((locale) => ({ locale, slug: cat.id })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale });
  const cat = SHOP_CATEGORIES.find((c) => c.id === slug);
  if (!cat) return {};
  return {
    title: `${t(cat.labelKey)} | ${t("shop.title")}`,
    description: t("shop.metaDescription"),
  };
}

export default async function ShopCategoryPage({ params }: Props) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const typedLocale: Locale = locale;
  setRequestLocale(typedLocale);
  const cat = SHOP_CATEGORIES.find((c) => c.id === slug);
  if (!cat) notFound();
  const t = await getTranslations();
  const products = SAMPLE_CATALOGUE.filter((p) => p.category === slug);
  return (
    <>
      <Hero variant="compact" eyebrow={t("nav.shop")} headline={t(cat.labelKey)} />
      <section className="section-y">
        <div className="mx-auto max-w-7xl container-px">
          <Breadcrumb
            items={[
              { label: t("nav.home"), href: `/${typedLocale}` },
              { label: t("nav.shop"), href: `/${typedLocale}/shop` },
              { label: t(cat.labelKey) },
            ]}
          />
          <div className="mt-8">
            <ShopHeading slug={slug} />
          </div>
          <div className="mt-10">
            <CategoryClient catalogue={products} />
          </div>
        </div>
      </section>
    </>
  );
}
