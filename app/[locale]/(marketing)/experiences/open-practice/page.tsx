import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  Hero,
  SectionHeader,
  PriceCard,
  FaqAccordion,
  AnimatedBadge,
  MotionReveal,
  SectionBackground,
  IconStatCard,
  CtaBanner,
} from "@/features/design-system";
import { BookingTrigger } from "@/features/booking/components/BookingTrigger";
import { StickyMobileCta } from "@/features/layout/StickyMobileCta";
import { isLocale, type Locale } from "@/features/i18n/config";
import { topFaq } from "@/features/content/homepage-data";
import { Clock, Users, ShieldCheck, Wrench } from "lucide-react";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "openPractice" });
  return { title: t("metaTitle"), description: t("metaDescription") };
}

export default async function OpenPracticePage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) return null;
  const typedLocale: Locale = locale;
  setRequestLocale(typedLocale);
  const t = await getTranslations();

  return (
    <>
      <Hero
        variant="image"
        imageUrl="/generated/hero/open-practice.png"
        eyebrow={t("openPractice.heroEyebrow")}
        headline={t("openPractice.heroHeadline")}
        body={t("openPractice.heroBody")}
        topBadge={<AnimatedBadge variant="dark">Daily · 10am to 10pm</AnimatedBadge>}
        primaryCta={
          <BookingTrigger service="open-practice" variant="primary" size="lg" labelKey="common.bookNow" />
        }
      />

      <SectionBackground variant="dark" pattern="grid" orbs>
        <div className="section-y mx-auto max-w-7xl container-px">
          <MotionReveal>
            <SectionHeader
              eyebrow="What you get"
              heading="Run hot laps, your way"
              align="center"
              invert
            />
          </MotionReveal>
          <div className="mt-12 grid gap-4 md:grid-cols-4">
            <IconStatCard
              value={12}
              suffix=" hrs"
              label="Open practice every day"
              variant="orange"
              icon={<Clock size={22} aria-hidden />}
            />
            <IconStatCard
              value={8}
              label="Drivers per layout"
              variant="blue"
              icon={<Users size={22} aria-hidden />}
            />
            <IconStatCard
              value={100}
              suffix="%"
              label="Marshals on track"
              variant="dark"
              icon={<ShieldCheck size={22} aria-hidden />}
            />
            <IconStatCard
              value={1}
              label="Pit-lane tools on loan"
              variant="dark"
              icon={<Wrench size={22} aria-hidden />}
            />
          </div>
        </div>
      </SectionBackground>

      <SectionBackground variant="mist" pattern="dots">
        <div className="section-y mx-auto max-w-5xl container-px">
          <MotionReveal>
            <SectionHeader
              eyebrow="Pricing"
              heading={t("openPractice.pricing")}
              align="center"
              badge={<AnimatedBadge dotColor="orange">No subscription required</AnimatedBadge>}
            />
          </MotionReveal>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <MotionReveal>
              <PriceCard
                title="Hourly"
                price="AED 75"
                frequency={t("common.perHour")}
                features={["Bring your own car or rent ours", "All categories welcome", "Marshals on track"]}
                cta={<BookingTrigger service="open-practice" labelKey="common.bookNow" variant="primary" />}
              />
            </MotionReveal>
            <MotionReveal delay={120}>
              <PriceCard
                title="Four-hour pass"
                price="AED 200"
                features={["Save 33 percent", "Use across the day", "Includes one practice tyre set"]}
                cta={<BookingTrigger service="open-practice" labelKey="common.bookNow" variant="primary" />}
                highlighted
                badge="Best value"
              />
            </MotionReveal>
          </div>
        </div>
      </SectionBackground>

      <SectionBackground variant="light">
        <div className="section-y mx-auto max-w-3xl container-px">
          <MotionReveal>
            <SectionHeader heading="Questions" align="center" />
          </MotionReveal>
          <MotionReveal delay={150} className="mt-10">
            <FaqAccordion questions={topFaq(typedLocale)} pageTitle="Open practice FAQs" />
          </MotionReveal>
        </div>
      </SectionBackground>

      <CtaBanner
        heading={t("home.ctaBannerHeading")}
        body={t("home.ctaBannerBody")}
        variant="racing"
        imageUrl="/generated/sections/circuit-aerial.png"
        cta={
          <BookingTrigger service="open-practice" size="lg" variant="primary" labelKey="common.bookNow" />
        }
      />

      <StickyMobileCta href="/book" labelKey="common.bookNow" />
    </>
  );
}
