import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  Hero,
  SectionHeader,
  FeatureRow,
  CtaBanner,
  AnimatedBadge,
  MotionReveal,
  SectionBackground,
  IconStatCard,
} from "@/features/design-system";
import { BookingTrigger } from "@/features/booking/components/BookingTrigger";
import { Shield, Users, Trophy, Sparkles, Flag, Gauge } from "lucide-react";
import { isLocale, type Locale } from "@/features/i18n/config";
import { asset } from "@/lib/asset";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return { title: t("metaTitle"), description: t("metaDescription") };
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) return null;
  const typedLocale: Locale = locale;
  setRequestLocale(typedLocale);
  const t = await getTranslations();

  const values = [
    {
      id: "safety",
      icon: <Shield size={22} aria-hidden />,
      title: t("about.values.safetyTitle"),
      body: t("about.values.safetyBody"),
    },
    {
      id: "community",
      icon: <Users size={22} aria-hidden />,
      title: t("about.values.communityTitle"),
      body: t("about.values.communityBody"),
    },
    {
      id: "performance",
      icon: <Trophy size={22} aria-hidden />,
      title: t("about.values.performanceTitle"),
      body: t("about.values.performanceBody"),
    },
  ];

  const team = [
    { name: "Khalid", role: "Founder and Track Designer", image: "/generated/portraits/marco.png" },
    { name: "Coach Layla", role: "Head of Academy", image: "/generated/portraits/layla.png" },
    { name: "Marshal Hamad", role: "Lead Marshal", image: "/generated/portraits/ahmed.png" },
    { name: "Yousef Khan", role: "Hobby Shop Lead", image: "/generated/portraits/rahul.png" },
  ];

  return (
    <>
      <Hero
        variant="image"
        imageUrl="/generated/hero/about.png"
        eyebrow={t("nav.about")}
        headline={t("about.title")}
        body={t("about.intro")}
        topBadge={<AnimatedBadge variant="dark">Built by racers, for racers</AnimatedBadge>}
        primaryCta={
          <BookingTrigger service="trial" size="lg" variant="primary" labelKey="common.bookTrial" />
        }
      />

      <SectionBackground variant="light" pattern="dots">
        <div className="section-y mx-auto max-w-7xl container-px">
          <MotionReveal>
            <SectionHeader
              eyebrow="Values"
              heading={t("about.valuesHeading")}
              badge={<AnimatedBadge dotColor="orange">Our north stars</AnimatedBadge>}
            />
          </MotionReveal>
          <MotionReveal delay={150} className="mt-12">
            <FeatureRow features={values} cols={3} />
          </MotionReveal>
        </div>
      </SectionBackground>

      <SectionBackground variant="dark" pattern="grid" orbs>
        <div className="section-y mx-auto max-w-7xl container-px">
          <MotionReveal>
            <SectionHeader
              eyebrow="By the numbers"
              heading="Two years on track, growing fast"
              align="center"
              invert
            />
          </MotionReveal>
          <div className="mt-12 grid gap-4 md:grid-cols-4">
            <IconStatCard
              value={2}
              suffix=" yrs"
              label="Operating in the UAE"
              variant="orange"
              icon={<Flag size={22} aria-hidden />}
            />
            <IconStatCard
              value={48}
              suffix=" weeks"
              label="Open per year"
              variant="blue"
              icon={<Sparkles size={22} aria-hidden />}
            />
            <IconStatCard
              value={6}
              label="Race series hosted"
              variant="dark"
              icon={<Trophy size={22} aria-hidden />}
            />
            <IconStatCard
              value={420}
              suffix=" m"
              label="Of painted asphalt"
              variant="dark"
              icon={<Gauge size={22} aria-hidden />}
            />
          </div>
        </div>
      </SectionBackground>

      <SectionBackground variant="mist">
        <div className="section-y mx-auto max-w-7xl container-px">
          <MotionReveal>
            <SectionHeader
              heading={t("about.teamHeading")}
              badge={<AnimatedBadge dotColor="green">The crew</AnimatedBadge>}
            />
          </MotionReveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((person, i) => (
              <MotionReveal key={person.name} delay={i * 100}>
                <div className="group relative overflow-hidden rounded-[var(--radius-lg)] bg-white shadow-[var(--shadow-sm)] ring-1 ring-[color:var(--color-border)] transition-shadow hover:shadow-[var(--shadow-md)]">
                  <div className="relative aspect-square overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={asset(person.image)}
                      alt=""
                      aria-hidden
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  </div>
                  <div className="p-5">
                    <p className="font-[family-name:var(--font-display)] text-lg font-semibold text-[color:var(--color-racing-blue)]">
                      {person.name}
                    </p>
                    <p className="text-sm text-[color:var(--color-muted-foreground)]">{person.role}</p>
                  </div>
                </div>
              </MotionReveal>
            ))}
          </div>
        </div>
      </SectionBackground>

      <CtaBanner
        heading={t("home.ctaBannerHeading")}
        body={t("home.ctaBannerBody")}
        variant="racing"
        imageUrl="/generated/sections/paddock.png"
        cta={<BookingTrigger service="trial" size="lg" variant="primary" labelKey="common.bookTrial" />}
      />
    </>
  );
}
