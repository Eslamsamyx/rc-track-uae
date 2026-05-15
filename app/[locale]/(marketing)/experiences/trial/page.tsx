import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  Hero,
  SectionHeader,
  FeatureRow,
  PriceCard,
  FaqAccordion,
  TestimonialCarousel,
  AnimatedBadge,
  MotionReveal,
  SectionBackground,
  CtaBanner,
  IconStatCard,
  DecorOrb,
} from "@/features/design-system";
import { BookingTrigger } from "@/features/booking/components/BookingTrigger";
import { StickyMobileCta } from "@/features/layout/StickyMobileCta";
import { isLocale, type Locale } from "@/features/i18n/config";
import { asset } from "@/lib/asset";
import { homepageTestimonials, topFaq } from "@/features/content/homepage-data";
import {
  Car,
  GamepadIcon,
  Shield,
  Timer,
  UserCheck,
  Camera,
  Sparkles,
  Calendar,
  Users,
} from "lucide-react";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "trial" });
  return { title: t("metaTitle"), description: t("metaDescription") };
}

export default async function TrialPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) return null;
  const typedLocale: Locale = locale;
  setRequestLocale(typedLocale);
  const t = await getTranslations();

  const included = [
    { id: "car", icon: <Car size={22} aria-hidden />, title: t("trial.includedItems.car"), body: "" },
    {
      id: "controller",
      icon: <GamepadIcon size={22} aria-hidden />,
      title: t("trial.includedItems.controller"),
      body: "",
    },
    { id: "helmet", icon: <Shield size={22} aria-hidden />, title: t("trial.includedItems.helmet"), body: "" },
    { id: "trackTime", icon: <Timer size={22} aria-hidden />, title: t("trial.includedItems.trackTime"), body: "" },
    { id: "marshal", icon: <UserCheck size={22} aria-hidden />, title: t("trial.includedItems.marshal"), body: "" },
    { id: "photo", icon: <Camera size={22} aria-hidden />, title: t("trial.includedItems.photo"), body: "" },
  ];

  return (
    <>
      <Hero
        eyebrow={t("trial.heroEyebrow")}
        headline={t("trial.heroHeadline")}
        body={t("trial.heroBody")}
        imageUrl="/generated/hero/trial.png"
        topBadge={<AnimatedBadge variant="dark">Slots booking now</AnimatedBadge>}
        primaryCta={
          <BookingTrigger service="trial" variant="primary" size="lg" labelKey="common.bookTrial" />
        }
        secondaryCta={
          <a
            href="#pricing"
            className="inline-flex h-14 items-center justify-center rounded-[var(--radius-md)] border border-white/30 bg-white/10 px-7 text-lg font-semibold text-white backdrop-blur hover:bg-white/20"
          >
            See pricing
          </a>
        }
        statRow={
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3 text-white">
            {[
              { icon: <Sparkles size={16} aria-hidden />, label: "Zero experience needed" },
              { icon: <Users size={16} aria-hidden />, label: "Ages 7+" },
              { icon: <Calendar size={16} aria-hidden />, label: "30 minutes on track" },
            ].map((row, i) => (
              <span key={i} className="inline-flex items-center gap-2 text-sm font-medium text-white/85">
                <span className="text-[color:var(--color-track-orange)]">{row.icon}</span>
                {row.label}
              </span>
            ))}
          </div>
        }
      />

      <SectionBackground variant="mist" pattern="dots">
        <div className="section-y mx-auto max-w-7xl container-px">
          <MotionReveal>
            <SectionHeader
              heading={t("trial.includedHeading")}
              align="center"
              badge={<AnimatedBadge dotColor="orange">All-in price</AnimatedBadge>}
            />
          </MotionReveal>
          <MotionReveal delay={150} className="mt-12">
            <FeatureRow features={included} cols={3} />
          </MotionReveal>
        </div>
      </SectionBackground>

      <SectionBackground variant="dark" pattern="grid" orbs>
        <div className="section-y mx-auto max-w-7xl container-px">
          <MotionReveal>
            <SectionHeader
              eyebrow="The session"
              heading="What 30 minutes feels like"
              align="center"
              invert
            />
          </MotionReveal>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            <IconStatCard
              value={5}
              suffix=" min"
              label="Safety briefing and car setup"
              variant="orange"
              icon={<Shield size={22} aria-hidden />}
            />
            <IconStatCard
              value={30}
              suffix=" min"
              label="Guided track time at your pace"
              variant="blue"
              icon={<Timer size={22} aria-hidden />}
            />
            <IconStatCard
              value={1}
              label="Finish-line photo to take home"
              variant="dark"
              icon={<Camera size={22} aria-hidden />}
            />
          </div>
        </div>
      </SectionBackground>

      <SectionBackground variant="light" id="pricing">
        <div className="section-y mx-auto max-w-5xl container-px">
          <MotionReveal>
            <SectionHeader heading={t("trial.pricingHeading")} align="center" />
          </MotionReveal>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <MotionReveal>
              <PriceCard
                title={t("trial.introPrice")}
                price={t("trial.introPrice")}
                description={t("trial.introPriceLabel")}
                features={[
                  t("trial.includedItems.car"),
                  t("trial.includedItems.controller"),
                  t("trial.includedItems.helmet"),
                  t("trial.includedItems.trackTime"),
                ]}
                cta={<BookingTrigger service="trial" variant="primary" labelKey="common.bookTrial" />}
              />
            </MotionReveal>
            <MotionReveal delay={120}>
              <PriceCard
                title={t("trial.standardPrice")}
                price={t("trial.standardPrice")}
                description={t("trial.standardPriceLabel")}
                highlighted
                badge={t("memberships.tiers.mostPopular")}
                features={[
                  t("trial.includedItems.car"),
                  t("trial.includedItems.controller"),
                  t("trial.includedItems.helmet"),
                  t("trial.includedItems.trackTime"),
                  t("trial.includedItems.marshal"),
                  t("trial.includedItems.photo"),
                ]}
                cta={<BookingTrigger service="trial" variant="white" labelKey="common.bookTrial" />}
              />
            </MotionReveal>
          </div>
        </div>
      </SectionBackground>

      <SectionBackground variant="mist">
        <div className="section-y mx-auto max-w-5xl container-px">
          <MotionReveal>
            <SectionHeader
              heading={t("trial.safetyHeading")}
              subhead={t("trial.safetyBody")}
              align="center"
              badge={<AnimatedBadge dotColor="green">Safety first</AnimatedBadge>}
            />
          </MotionReveal>
        </div>
      </SectionBackground>

      <section className="relative isolate overflow-hidden bg-racing-gradient text-white section-y">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={asset("/generated/sections/confetti.png")}
          alt=""
          aria-hidden
          className="absolute inset-0 -z-10 h-full w-full object-cover opacity-20"
        />
        <DecorOrb color="orange" size="xl" className="-top-32 -left-32 opacity-25" />
        <div className="relative mx-auto max-w-7xl container-px">
          <MotionReveal>
            <SectionHeader heading={t("home.testimonialsHeading")} align="center" invert />
          </MotionReveal>
          <MotionReveal delay={150} className="mt-12">
            <TestimonialCarousel items={homepageTestimonials(typedLocale)} variant="dark" />
          </MotionReveal>
        </div>
      </section>

      <SectionBackground variant="light" pattern="grid">
        <div className="section-y mx-auto max-w-3xl container-px">
          <MotionReveal>
            <SectionHeader heading={t("trial.faqHeading")} align="center" />
          </MotionReveal>
          <MotionReveal delay={150} className="mt-10">
            <FaqAccordion questions={topFaq(typedLocale)} pageTitle={t("trial.faqHeading")} />
          </MotionReveal>
        </div>
      </SectionBackground>

      <CtaBanner
        heading={t("home.ctaBannerHeading")}
        body={t("home.ctaBannerBody")}
        variant="racing"
        imageUrl="/generated/sections/finish-line.png"
        cta={
          <BookingTrigger service="trial" size="lg" variant="primary" labelKey="common.bookTrial" />
        }
      />

      <StickyMobileCta href="/book" labelKey="trial.ctaSticky" />
    </>
  );
}
