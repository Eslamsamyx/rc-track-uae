import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Link from "next/link";
import {
  Hero,
  SectionHeader,
  PriceCard,
  ComparisonTable,
  TestimonialCarousel,
  FaqAccordion,
  type ComparisonRow,
  AnimatedBadge,
  MotionReveal,
  SectionBackground,
  CtaBanner,
  IconStatCard,
  DecorOrb,
} from "@/features/design-system";
import { BookingTrigger } from "@/features/booking/components/BookingTrigger";
import { isLocale, type Locale } from "@/features/i18n/config";
import { homepageTestimonials, topFaq } from "@/features/content/homepage-data";
import { Trophy, Sparkles, Calendar, Wallet } from "lucide-react";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "memberships" });
  return { title: t("metaTitle"), description: t("metaDescription") };
}

export default async function MembershipsPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) return null;
  const typedLocale: Locale = locale;
  setRequestLocale(typedLocale);
  const t = await getTranslations();

  const comparisonRows: ComparisonRow[] = [
    { label: t("memberships.comparison.openPractice"), values: ["10 hours", "24 hours", "Unlimited"] },
    { label: t("memberships.comparison.shopDiscount"), values: ["10%", "15%", "20%"] },
    { label: t("memberships.comparison.guestPasses"), values: ["—", "2 per year", "2 per month"] },
    { label: t("memberships.comparison.academy"), values: [false, true, true] },
    { label: t("memberships.comparison.vipLounge"), values: [false, false, true] },
    { label: t("memberships.comparison.personalPitBox"), values: [false, false, true] },
  ];

  return (
    <>
      <Hero
        variant="image"
        imageUrl="/generated/hero/memberships.png"
        eyebrow={t("nav.memberships")}
        headline={t("memberships.title")}
        body={t("memberships.intro")}
        topBadge={<AnimatedBadge variant="dark">Three tiers · Year-round perks</AnimatedBadge>}
        primaryCta={
          <Link
            href={`/${typedLocale}/memberships/join/silver`}
            className="inline-flex h-14 items-center justify-center gap-2 rounded-[var(--radius-md)] bg-[color:var(--color-track-orange)] px-7 text-lg font-semibold text-white shadow-[var(--shadow-md)] transition-transform hover:-translate-y-0.5"
          >
            Join Silver · Most popular
          </Link>
        }
        secondaryCta={
          <BookingTrigger service="trial" size="lg" variant="outline" labelKey="common.bookTrial" />
        }
      />

      <SectionBackground variant="mist" pattern="dots" orbs>
        <div className="section-y mx-auto max-w-7xl container-px">
          <MotionReveal>
            <SectionHeader
              eyebrow="Choose your tier"
              heading={t("memberships.title")}
              subhead={t("memberships.intro")}
              align="center"
              badge={<AnimatedBadge dotColor="orange">Save vs. pay-as-you-race</AnimatedBadge>}
            />
          </MotionReveal>
          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {(["bronze", "silver", "gold"] as const).map((tier, i) => (
              <MotionReveal key={tier} delay={i * 120}>
                <PriceCard
                  title={t(`memberships.tiers.${tier}Title`)}
                  price={t(`memberships.tiers.${tier}Price`)}
                  frequency={t(`memberships.tiers.${tier}Frequency`)}
                  features={t.raw(`memberships.tiers.${tier}Features`) as string[]}
                  highlighted={tier === "silver"}
                  badge={tier === "silver" ? t("memberships.tiers.mostPopular") : undefined}
                  cta={
                    <Link
                      href={`/${typedLocale}/memberships/join/${tier}`}
                      className={
                        "inline-flex h-12 w-full items-center justify-center rounded-[var(--radius-md)] px-5 font-semibold transition-transform hover:-translate-y-0.5 " +
                        (tier === "silver"
                          ? "bg-white text-[color:var(--color-racing-blue)] shadow-[var(--shadow-md)]"
                          : "bg-[color:var(--color-track-orange)] text-white shadow-[var(--shadow-sm)] hover:bg-[color:var(--color-track-orange-600)]")
                      }
                    >
                      {t(
                        `memberships.tiers.join${tier.charAt(0).toUpperCase() + tier.slice(1)}` as Parameters<
                          typeof t
                        >[0],
                      )}
                    </Link>
                  }
                />
              </MotionReveal>
            ))}
          </div>
        </div>
      </SectionBackground>

      {/* Member perks stats */}
      <SectionBackground variant="dark" pattern="grid" orbs>
        <div className="section-y mx-auto max-w-7xl container-px">
          <MotionReveal>
            <SectionHeader
              eyebrow="The math"
              heading="Members race more, pay less"
              align="center"
              invert
            />
          </MotionReveal>
          <div className="mt-12 grid gap-4 md:grid-cols-4">
            <IconStatCard
              value={50}
              suffix="%"
              label="Lower per-hour rate vs. pay-as-you-go"
              variant="orange"
              icon={<Wallet size={22} aria-hidden />}
            />
            <IconStatCard
              value={24}
              suffix=" hrs"
              label="Open practice on the Silver tier"
              variant="blue"
              icon={<Calendar size={22} aria-hidden />}
            />
            <IconStatCard
              value={20}
              suffix="%"
              label="Shop discount on the Gold tier"
              variant="dark"
              icon={<Sparkles size={22} aria-hidden />}
            />
            <IconStatCard
              value={4}
              label="Member-only race nights per year"
              variant="dark"
              icon={<Trophy size={22} aria-hidden />}
            />
          </div>
        </div>
      </SectionBackground>

      <SectionBackground variant="light">
        <div className="section-y mx-auto max-w-7xl container-px">
          <MotionReveal>
            <SectionHeader heading={t("memberships.comparisonHeading")} align="center" />
          </MotionReveal>
          <MotionReveal delay={150} className="mt-12">
            <ComparisonTable
              columns={[
                t("memberships.comparison.bronze"),
                t("memberships.comparison.silver"),
                t("memberships.comparison.gold"),
              ]}
              rows={comparisonRows}
              highlightedColumnIndex={1}
              firstColumnLabel={t("memberships.comparison.feature")}
            />
          </MotionReveal>
        </div>
      </SectionBackground>

      <section className="relative isolate overflow-hidden bg-racing-gradient text-white section-y">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/generated/sections/trophy.png"
          alt=""
          aria-hidden
          className="absolute inset-0 -z-10 h-full w-full object-cover opacity-20 mix-blend-screen"
        />
        <DecorOrb color="orange" size="xl" className="-top-32 -right-32 opacity-25" />
        <div className="relative mx-auto max-w-7xl container-px">
          <MotionReveal>
            <SectionHeader heading={t("home.testimonialsHeading")} align="center" invert />
          </MotionReveal>
          <MotionReveal delay={150} className="mt-12">
            <TestimonialCarousel items={homepageTestimonials(typedLocale)} variant="dark" />
          </MotionReveal>
        </div>
      </section>

      <SectionBackground variant="mist" pattern="grid">
        <div className="section-y mx-auto max-w-3xl container-px">
          <MotionReveal>
            <SectionHeader heading="Membership FAQs" align="center" />
          </MotionReveal>
          <MotionReveal delay={150} className="mt-10">
            <FaqAccordion questions={topFaq(typedLocale)} pageTitle="Membership FAQs" />
          </MotionReveal>
        </div>
      </SectionBackground>

      <CtaBanner
        heading={t("home.ctaBannerHeading")}
        body={t("home.ctaBannerBody")}
        variant="racing"
        imageUrl="/generated/sections/finish-line.png"
        cta={
          <Link
            href={`/${typedLocale}/memberships/join/silver`}
            className="inline-flex h-14 items-center justify-center rounded-[var(--radius-md)] bg-[color:var(--color-track-orange)] px-7 text-lg font-semibold text-white shadow-[var(--shadow-md)] hover:bg-[color:var(--color-track-orange-600)]"
          >
            Join Silver
          </Link>
        }
      />
    </>
  );
}
