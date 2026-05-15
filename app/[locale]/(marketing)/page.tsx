import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  Hero,
  SectionHeader,
  TestimonialCarousel,
  TrustBar,
  generateMockLogos,
  FaqAccordion,
  CtaBanner,
  IconStatCard,
  ImageFeatureCard,
  HowItWorksTimeline,
  AnimatedBadge,
  MotionReveal,
  Marquee,
  SectionBackground,
  DecorOrb,
} from "@/features/design-system";
import { NewsletterEmbed } from "@/features/newsletter/components/NewsletterEmbed";
import { BookingTrigger } from "@/features/booking/components/BookingTrigger";
import { isLocale, type Locale } from "@/features/i18n/config";
import { asset } from "@/lib/asset";
import {
  homepageStats,
  homepageTestimonials,
  howItWorksFeatures,
  experiencesCards,
  topFaq,
  galleryPreviewImages,
} from "@/features/content/homepage-data";
import Link from "next/link";
import {
  Flag,
  Trophy,
  Sparkles,
  Gauge,
  Users,
  Clock,
  Cake,
  Briefcase,
  GraduationCap,
  Plane,
  Calendar,
  ArrowRight,
  Zap,
  ShieldCheck,
  HeartHandshake,
} from "lucide-react";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: { canonical: `/${locale}` },
  };
}

const EXPERIENCE_ICONS: Record<string, React.ReactNode> = {
  trial: <Zap size={18} aria-hidden />,
  open: <Clock size={18} aria-hidden />,
  birthday: <Cake size={18} aria-hidden />,
  corporate: <Briefcase size={18} aria-hidden />,
  schools: <GraduationCap size={18} aria-hidden />,
  tourist: <Plane size={18} aria-hidden />,
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) return null;
  const typedLocale: Locale = locale;
  setRequestLocale(typedLocale);
  const t = await getTranslations();

  const experiences = experiencesCards(t);
  const howSteps = howItWorksFeatures(t).map((s) => ({
    id: s.id,
    title: s.title,
    body: s.body,
    icon:
      s.id === "step1" ? (
        <Calendar size={22} aria-hidden />
      ) : s.id === "step2" ? (
        <Flag size={22} aria-hidden />
      ) : (
        <Trophy size={22} aria-hidden />
      ),
  }));

  const marqueeItems = [
    "City Track open",
    "Trial AED 99",
    "Birthday parties",
    "Corporate team-builds",
    "Academy enrolling",
    "Open practice nightly",
    "Free spectator access",
    "GCC expansion soon",
  ].map((label, i) => (
    <span
      key={i}
      className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-white/80"
    >
      <Flag size={14} aria-hidden className="text-[color:var(--color-track-orange)]" />
      {label}
    </span>
  ));

  return (
    <>
      <Hero
        eyebrow={t("home.heroEyebrow")}
        headline={t("home.heroHeadline")}
        body={t("home.heroBody")}
        variant={process.env.NEXT_PUBLIC_VIMEO_HERO_VIDEO_ID ? "video" : "image"}
        videoId={process.env.NEXT_PUBLIC_VIMEO_HERO_VIDEO_ID}
        imageUrl="/generated/hero/home.png"
        topBadge={
          <AnimatedBadge dotColor="green" variant="dark">
            Now booking · City Track
          </AnimatedBadge>
        }
        primaryCta={
          <BookingTrigger
            service="trial"
            size="lg"
            labelKey="home.heroCtaPrimary"
            variant="primary"
          />
        }
        secondaryCta={
          <a
            href="#how-it-works"
            className="inline-flex h-14 items-center justify-center gap-2 rounded-[var(--radius-md)] border border-white/30 bg-white/10 px-7 text-lg font-semibold text-white backdrop-blur transition-colors hover:bg-white/20"
          >
            {t("home.heroCtaSecondary")}
            <ArrowRight size={18} className="rtl:rotate-180" aria-hidden />
          </a>
        }
        statRow={
          <div className="grid max-w-2xl grid-cols-3 gap-3 sm:gap-6 text-white">
            <div>
              <div className="font-[family-name:var(--font-display)] text-2xl font-bold sm:text-3xl">
                <span className="text-[color:var(--color-track-orange)]">{homepageStats.laps.toLocaleString()}+</span>
              </div>
              <div className="text-xs uppercase tracking-wider text-white/70">{t("home.stats.lapsRunMonthly")}</div>
            </div>
            <div>
              <div className="font-[family-name:var(--font-display)] text-2xl font-bold sm:text-3xl">
                <span className="text-[color:var(--color-track-orange)]">{homepageStats.trackMetres}m</span>
              </div>
              <div className="text-xs uppercase tracking-wider text-white/70">{t("home.stats.trackLength")}</div>
            </div>
            <div>
              <div className="font-[family-name:var(--font-display)] text-2xl font-bold sm:text-3xl">
                <span className="text-[color:var(--color-track-orange)]">{homepageStats.members}+</span>
              </div>
              <div className="text-xs uppercase tracking-wider text-white/70">{t("home.stats.memberFamilies")}</div>
            </div>
          </div>
        }
      />

      {/* Marquee ticker */}
      <div className="relative bg-[color:var(--color-checkered-black)] py-4">
        <Marquee items={marqueeItems} speed={40} />
      </div>

      <TrustBar label={t("home.trustHeading")} logos={generateMockLogos()} />

      {/* Stats with icons + dark gradient */}
      <SectionBackground variant="dark" pattern="grid" orbs>
        <div className="section-y mx-auto max-w-7xl container-px">
          <MotionReveal>
            <SectionHeader
              eyebrow={t("home.stats.title")}
              heading="Numbers that matter"
              align="center"
              invert
              badge={<AnimatedBadge variant="dark">Live · this month</AnimatedBadge>}
            />
          </MotionReveal>
          <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
            <MotionReveal delay={0}>
              <IconStatCard
                value={homepageStats.laps}
                suffix="+"
                label={t("home.stats.lapsRunMonthly")}
                variant="dark"
                icon={<Gauge size={22} aria-hidden />}
              />
            </MotionReveal>
            <MotionReveal delay={100}>
              <IconStatCard
                value={homepageStats.trackMetres}
                suffix="m"
                label={t("home.stats.trackLength")}
                variant="orange"
                icon={<Flag size={22} aria-hidden />}
              />
            </MotionReveal>
            <MotionReveal delay={200}>
              <IconStatCard
                value={homepageStats.members}
                suffix="+"
                label={t("home.stats.memberFamilies")}
                variant="blue"
                icon={<Users size={22} aria-hidden />}
              />
            </MotionReveal>
            <MotionReveal delay={300}>
              <IconStatCard
                value={homepageStats.ageFrom}
                suffix="+"
                label={t("home.stats.ageFrom")}
                variant="dark"
                icon={<HeartHandshake size={22} aria-hidden />}
              />
            </MotionReveal>
          </div>
        </div>
      </SectionBackground>

      {/* Experiences grid with image cards */}
      <SectionBackground variant="mist" pattern="dots">
        <div className="section-y mx-auto max-w-7xl container-px">
          <MotionReveal>
            <SectionHeader
              eyebrow={t("nav.experiences")}
              heading={t("home.experiencesHeading")}
              subhead={t("home.experiencesBody")}
              align="center"
              badge={<AnimatedBadge dotColor="orange">Six ways to race</AnimatedBadge>}
            />
          </MotionReveal>
          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {experiences.map((card, i) => (
              <MotionReveal key={card.id} delay={i * 80}>
                <ImageFeatureCard
                  imageUrl={card.imageUrl}
                  eyebrow={card.badge}
                  title={card.title}
                  body={card.body}
                  href={`/${typedLocale}${card.href}`}
                  cta={t("common.learnMore")}
                  icon={EXPERIENCE_ICONS[card.id]}
                  aspect="portrait"
                  size="md"
                />
              </MotionReveal>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link
              href={`/${typedLocale}/experiences`}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-[var(--radius-md)] bg-[color:var(--color-racing-blue)] px-7 font-semibold text-white shadow-[var(--shadow-md)] transition-transform hover:-translate-y-0.5 hover:bg-[color:var(--color-racing-blue-700)]"
            >
              {t("common.viewAll")}
              <ArrowRight size={18} className="rtl:rotate-180" aria-hidden />
            </Link>
          </div>
        </div>
      </SectionBackground>

      {/* How it works — timeline on dark gradient with circuit-aerial image fade */}
      <section
        id="how-it-works"
        className="relative isolate overflow-hidden bg-racing-gradient text-white section-y"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={asset("/generated/sections/circuit-aerial.png")}
          alt=""
          aria-hidden
          className="absolute inset-0 -z-10 h-full w-full object-cover opacity-25 mix-blend-screen"
        />
        <div aria-hidden className="absolute inset-0 -z-10 racing-grid-bg-dark opacity-40" />
        <DecorOrb color="orange" size="xl" className="-top-32 -right-32 opacity-25" />
        <DecorOrb color="blue" size="lg" className="bottom-0 -left-32 opacity-30" />

        <div className="relative mx-auto max-w-7xl container-px">
          <MotionReveal>
            <SectionHeader
              eyebrow="How it works"
              heading={t("home.howItWorksHeading")}
              align="center"
              invert
              badge={<AnimatedBadge variant="dark">Three simple steps</AnimatedBadge>}
            />
          </MotionReveal>
          <MotionReveal delay={150} className="mt-16">
            <HowItWorksTimeline steps={howSteps} variant="dark" />
          </MotionReveal>
          <div className="mt-14 text-center">
            <BookingTrigger
              service="trial"
              size="lg"
              variant="primary"
              labelKey="common.bookTrial"
            />
          </div>
        </div>
      </section>

      {/* Gallery preview marquee */}
      <SectionBackground variant="light">
        <div className="section-y mx-auto max-w-7xl container-px">
          <MotionReveal>
            <SectionHeader
              eyebrow="Race nights"
              heading="Moments from the track"
              subhead="Real members, real laps, real noise. Tap to see the full gallery."
              align="center"
            />
          </MotionReveal>
          <MotionReveal delay={150} className="mt-12">
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
              {galleryPreviewImages.map((src, i) => (
                <Link
                  key={src}
                  href={`/${typedLocale}/gallery`}
                  className="group relative aspect-square overflow-hidden rounded-[var(--radius-md)] ring-1 ring-[color:var(--color-border)]"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={asset(src)}
                    alt=""
                    aria-hidden
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                  <span className="sr-only">{`Gallery image ${i + 1}`}</span>
                </Link>
              ))}
            </div>
          </MotionReveal>
          <div className="mt-10 text-center">
            <Link
              href={`/${typedLocale}/gallery`}
              className="inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--color-track-orange-600)] underline-offset-4 hover:underline"
            >
              Open the gallery
              <ArrowRight size={16} className="rtl:rotate-180" aria-hidden />
            </Link>
          </div>
        </div>
      </SectionBackground>

      {/* Testimonials — dark gradient with confetti image fade */}
      <section className="relative isolate overflow-hidden bg-racing-gradient text-white section-y">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={asset("/generated/sections/confetti.png")}
          alt=""
          aria-hidden
          className="absolute inset-0 -z-10 h-full w-full object-cover opacity-20"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/60 via-transparent to-black/70" />
        <DecorOrb color="orange" size="lg" className="-top-20 -left-32 opacity-30" />
        <DecorOrb color="violet" size="md" className="bottom-10 -right-20 opacity-20" />
        <div className="relative mx-auto max-w-7xl container-px">
          <MotionReveal>
            <SectionHeader
              heading={t("home.testimonialsHeading")}
              align="center"
              invert
              badge={<AnimatedBadge variant="dark">Rated 4.9 / 5</AnimatedBadge>}
            />
          </MotionReveal>
          <MotionReveal delay={150} className="mt-12">
            <TestimonialCarousel items={homepageTestimonials(typedLocale)} variant="dark" />
          </MotionReveal>
        </div>
      </section>

      {/* Members highlight + Newsletter — split */}
      <SectionBackground variant="mist" orbs>
        <div className="section-y mx-auto max-w-7xl container-px">
          <div className="grid items-stretch gap-6 lg:grid-cols-2">
            {/* Members card */}
            <MotionReveal>
              <div className="group relative isolate flex h-full flex-col justify-between overflow-hidden rounded-[var(--radius-lg)] bg-white p-8 shadow-[var(--shadow-md)] ring-1 ring-[color:var(--color-border)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={asset("/generated/hero/memberships.png")}
                  alt=""
                  aria-hidden
                  className="absolute inset-0 -z-10 h-full w-full object-cover opacity-25"
                />
                <div className="absolute inset-0 -z-10 bg-gradient-to-br from-white/95 via-white/85 to-white/70" />
                <div>
                  <SectionHeader
                    eyebrow={
                      <>
                        <Sparkles size={14} className="inline" aria-hidden /> Track perks
                      </>
                    }
                    heading="Why members race more"
                  />
                  <ul className="mt-6 grid gap-4">
                    {[
                      {
                        icon: <Trophy size={20} aria-hidden />,
                        label: t("memberships.tiers.bronzeFeatures.0"),
                      },
                      {
                        icon: <Flag size={20} aria-hidden />,
                        label: t("memberships.tiers.silverFeatures.3"),
                      },
                      {
                        icon: <ShieldCheck size={20} aria-hidden />,
                        label: t("memberships.tiers.goldFeatures.5"),
                      },
                    ].map((row, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 rounded-[var(--radius-md)] bg-white p-4 ring-1 ring-[color:var(--color-border)] shadow-[var(--shadow-sm)] transition-shadow hover:shadow-[var(--shadow-md)]"
                      >
                        <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-[var(--radius-md)] bg-[color:var(--color-track-orange-50)] text-[color:var(--color-track-orange-600)]">
                          {row.icon}
                        </span>
                        <p className="text-sm leading-relaxed">{row.label}</p>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-8">
                  <Link
                    href={`/${typedLocale}/memberships`}
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-[var(--radius-md)] bg-[color:var(--color-racing-blue)] px-6 font-semibold text-white transition-colors hover:bg-[color:var(--color-racing-blue-700)]"
                  >
                    {t("nav.memberships")}
                    <ArrowRight size={18} className="rtl:rotate-180" aria-hidden />
                  </Link>
                </div>
              </div>
            </MotionReveal>

            {/* Newsletter card — dark gradient */}
            <MotionReveal delay={150}>
              <div className="relative isolate flex h-full flex-col justify-between overflow-hidden rounded-[var(--radius-lg)] bg-racing-gradient p-8 text-white shadow-[var(--shadow-md)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={asset("/generated/sections/night-lights.png")}
                  alt=""
                  aria-hidden
                  className="absolute inset-0 -z-10 h-full w-full object-cover opacity-25"
                />
                <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[color:var(--color-racing-blue)]/95 to-[color:var(--color-racing-blue)]/40" />
                <DecorOrb color="orange" size="md" className="-top-10 -right-10 opacity-40" blur="2xl" />
                <div>
                  <AnimatedBadge variant="dark">Weekly drop</AnimatedBadge>
                  <h3 className="mt-4 font-[family-name:var(--font-display)] text-3xl font-bold leading-tight md:text-4xl">
                    {t("home.newsletterHeading")}
                  </h3>
                  <p className="mt-3 text-white/85 text-pretty">{t("home.newsletterBody")}</p>
                </div>
                <div className="mt-6">
                  <NewsletterEmbed source="homepage" theme="dark" />
                </div>
              </div>
            </MotionReveal>
          </div>
        </div>
      </SectionBackground>

      {/* FAQ teaser */}
      <SectionBackground variant="light" pattern="grid">
        <div className="section-y mx-auto max-w-5xl container-px">
          <MotionReveal>
            <SectionHeader heading={t("home.faqTeaserHeading")} align="center" />
          </MotionReveal>
          <MotionReveal delay={150} className="mt-10">
            <FaqAccordion questions={topFaq(typedLocale)} pageTitle={t("home.faqTeaserHeading")} />
          </MotionReveal>
          <div className="mt-10 text-center">
            <Link
              href={`/${typedLocale}/faq`}
              className="inline-flex items-center gap-2 text-[color:var(--color-track-orange-600)] font-semibold underline-offset-4 hover:underline"
            >
              {t("home.faqTeaserCta")}
              <ArrowRight size={16} className="rtl:rotate-180" aria-hidden />
            </Link>
          </div>
        </div>
      </SectionBackground>

      <CtaBanner
        heading={t("home.ctaBannerHeading")}
        body={t("home.ctaBannerBody")}
        variant="racing"
        imageUrl="/generated/sections/finish-line.png"
        cta={
          <BookingTrigger
            service="trial"
            size="lg"
            variant="primary"
            labelKey="common.bookTrial"
          />
        }
      />
    </>
  );
}
