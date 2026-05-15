import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Link from "next/link";
import {
  Hero,
  SectionHeader,
  ProductCard,
  AnimatedBadge,
  MotionReveal,
  SectionBackground,
  CtaBanner,
  IconStatCard,
} from "@/features/design-system";
import { BookingTrigger } from "@/features/booking/components/BookingTrigger";
import { SAMPLE_CATALOGUE, SHOP_CATEGORIES } from "@/features/shop/data/catalogue";
import { isLocale, type Locale } from "@/features/i18n/config";
import { Package, Sparkles, Truck, ShieldCheck, ArrowRight } from "lucide-react";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "shop" });
  return { title: t("metaTitle"), description: t("metaDescription") };
}

const CATEGORY_IMAGES: Record<string, string> = {
  cars: "/generated/gallery/cars-line-1.png",
  electronics: "/generated/sections/controller-detail.png",
  tyres: "/generated/sections/tyre-stack.png",
  tools: "/generated/sections/suspension.png",
  apparel: "/generated/portraits/marco.png",
};

export default async function ShopPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) return null;
  const typedLocale: Locale = locale;
  setRequestLocale(typedLocale);
  const t = await getTranslations();

  const featured = SAMPLE_CATALOGUE.filter((p) => p.isFeatured);
  const newArrivals = SAMPLE_CATALOGUE.filter((p) => p.isNew);

  return (
    <>
      <Hero
        variant="image"
        imageUrl="/generated/sections/paddock.png"
        eyebrow={t("nav.shop")}
        headline={t("shop.title")}
        body={t("shop.intro")}
        topBadge={<AnimatedBadge variant="dark">Same-day pickup in venue</AnimatedBadge>}
        primaryCta={
          <Link
            href={`/${typedLocale}/shop/category/cars`}
            className="inline-flex h-14 items-center justify-center gap-2 rounded-[var(--radius-md)] bg-[color:var(--color-track-orange)] px-7 text-lg font-semibold text-white shadow-[var(--shadow-md)] transition-transform hover:-translate-y-0.5"
          >
            Shop cars
            <ArrowRight size={18} className="rtl:rotate-180" aria-hidden />
          </Link>
        }
        secondaryCta={
          <BookingTrigger service="trial" size="lg" variant="outline" labelKey="common.bookTrial" />
        }
      />

      <SectionBackground variant="mist" pattern="dots">
        <div className="section-y mx-auto max-w-7xl container-px">
          <MotionReveal>
            <SectionHeader
              eyebrow="Browse"
              heading={t("shop.categoriesHeading")}
              align="center"
              badge={<AnimatedBadge dotColor="orange">{`${SHOP_CATEGORIES.length} categories`}</AnimatedBadge>}
            />
          </MotionReveal>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {SHOP_CATEGORIES.map((cat, i) => (
              <MotionReveal key={cat.id} delay={i * 80}>
                <Link
                  href={`/${typedLocale}/shop/category/${cat.id}`}
                  className="group relative flex aspect-square items-end overflow-hidden rounded-[var(--radius-lg)] bg-[color:var(--color-racing-blue)] p-5 text-white shadow-[var(--shadow-sm)] transition-shadow hover:shadow-[var(--shadow-md)]"
                >
                  {CATEGORY_IMAGES[cat.id] ? (
                    <>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={CATEGORY_IMAGES[cat.id]}
                        alt=""
                        aria-hidden
                        className="absolute inset-0 h-full w-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-[color:var(--color-racing-blue)]/40 to-transparent" />
                    </>
                  ) : null}
                  <span className="relative font-[family-name:var(--font-display)] text-lg font-semibold">
                    {t(cat.labelKey)}
                  </span>
                </Link>
              </MotionReveal>
            ))}
          </div>
        </div>
      </SectionBackground>

      <SectionBackground variant="light">
        <div className="section-y mx-auto max-w-7xl container-px">
          <MotionReveal>
            <SectionHeader
              eyebrow="Hand-picked"
              heading={t("shop.featuredHeading")}
              badge={<AnimatedBadge dotColor="green">Marshal-approved</AnimatedBadge>}
            />
          </MotionReveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((p, i) => (
              <MotionReveal key={p.id} delay={i * 90}>
                <ProductCard product={p} />
              </MotionReveal>
            ))}
          </div>
        </div>
      </SectionBackground>

      <SectionBackground variant="dark" pattern="grid" orbs>
        <div className="section-y mx-auto max-w-7xl container-px">
          <MotionReveal>
            <SectionHeader
              eyebrow="Why buy from us"
              heading="Stock, advice, service"
              align="center"
              invert
            />
          </MotionReveal>
          <div className="mt-12 grid gap-4 md:grid-cols-4">
            <IconStatCard
              value={300}
              suffix="+"
              label="SKUs in stock at the venue"
              variant="orange"
              icon={<Package size={22} aria-hidden />}
            />
            <IconStatCard
              value={24}
              suffix=" hrs"
              label="UAE-wide delivery"
              variant="blue"
              icon={<Truck size={22} aria-hidden />}
            />
            <IconStatCard
              value={12}
              label="Marshal-approved brands"
              variant="dark"
              icon={<ShieldCheck size={22} aria-hidden />}
            />
            <IconStatCard
              value={15}
              suffix="%"
              label="Member discount on most items"
              variant="dark"
              icon={<Sparkles size={22} aria-hidden />}
            />
          </div>
        </div>
      </SectionBackground>

      <SectionBackground variant="mist">
        <div className="section-y mx-auto max-w-7xl container-px">
          <MotionReveal>
            <SectionHeader
              eyebrow="Fresh in"
              heading={t("shop.newArrivalsHeading")}
              badge={<AnimatedBadge dotColor="orange">New this week</AnimatedBadge>}
            />
          </MotionReveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {newArrivals.map((p, i) => (
              <MotionReveal key={p.id} delay={i * 90}>
                <ProductCard product={p} />
              </MotionReveal>
            ))}
          </div>
        </div>
      </SectionBackground>

      <CtaBanner
        heading={t("home.ctaBannerHeading")}
        body={t("home.ctaBannerBody")}
        variant="racing"
        imageUrl="/generated/sections/circuit-aerial.png"
        cta={
          <BookingTrigger service="trial" size="lg" variant="primary" labelKey="common.bookTrial" />
        }
      />
    </>
  );
}
