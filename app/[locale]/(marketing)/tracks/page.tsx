import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Link from "next/link";
import {
  Hero,
  SectionHeader,
  MapEmbed,
  AnimatedBadge,
  MotionReveal,
  SectionBackground,
  CtaBanner,
} from "@/features/design-system";
import { BookingTrigger } from "@/features/booking/components/BookingTrigger";
import { isLocale, type Locale } from "@/features/i18n/config";
import { asset } from "@/lib/asset";
import { ArrowRight, MapPin, Timer, Ruler, Trophy } from "lucide-react";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "tracks" });
  return { title: t("metaTitle"), description: t("metaDescription") };
}

export default async function TracksPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) return null;
  const typedLocale: Locale = locale;
  setRequestLocale(typedLocale);
  const t = await getTranslations();

  const tracks = [
    {
      slug: "city",
      title: t("tracks.city.title"),
      tagline: t("tracks.city.tagline"),
      length: t("tracks.city.length"),
      layout: t("tracks.city.layout"),
      best: t("tracks.city.best"),
      lapRecord: t("tracks.city.lapRecord"),
      image: "/generated/hero/track-city.png",
      accent: "from-[color:var(--color-racing-blue)]",
    },
    {
      slug: "village",
      title: t("tracks.village.title"),
      tagline: t("tracks.village.tagline"),
      length: t("tracks.village.length"),
      layout: t("tracks.village.layout"),
      best: t("tracks.village.best"),
      lapRecord: t("tracks.village.lapRecord"),
      image: "/generated/hero/track-village.png",
      accent: "from-[color:var(--color-track-orange-600)]",
    },
  ];

  return (
    <>
      <Hero
        variant="image"
        imageUrl="/generated/hero/tracks.png"
        eyebrow={t("nav.tracks")}
        headline={t("tracks.title")}
        body={t("tracks.intro")}
        topBadge={<AnimatedBadge variant="dark">Two layouts · One venue</AnimatedBadge>}
        primaryCta={
          <BookingTrigger service="trial" size="lg" variant="primary" labelKey="common.bookTrial" />
        }
      />

      <SectionBackground variant="mist" pattern="dots">
        <div className="section-y mx-auto max-w-7xl container-px">
          <MotionReveal>
            <SectionHeader
              eyebrow="The circuits"
              heading="Two layouts, very different feel"
              align="center"
              badge={<AnimatedBadge dotColor="orange">Pick your line</AnimatedBadge>}
            />
          </MotionReveal>
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {tracks.map((tr, i) => (
              <MotionReveal key={tr.slug} delay={i * 120}>
                <article className="group relative overflow-hidden rounded-[var(--radius-lg)] bg-white shadow-[var(--shadow-md)] ring-1 ring-[color:var(--color-border)] transition-transform hover:-translate-y-1">
                  <div className="relative aspect-[16/9] overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={asset(tr.image)}
                      alt=""
                      aria-hidden
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute top-4 inset-inline-start-4">
                      <span className="inline-flex items-center gap-2 rounded-[var(--radius-pill)] bg-white/95 px-3 py-1.5 text-xs font-semibold text-[color:var(--color-racing-blue)] backdrop-blur">
                        <MapPin size={14} aria-hidden />
                        {tr.title}
                      </span>
                    </div>
                  </div>
                  <div className="p-7">
                    <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-[color:var(--color-racing-blue)] md:text-3xl">
                      {tr.title}
                    </h2>
                    <p className="mt-2 font-medium text-[color:var(--color-track-orange-600)]">
                      {tr.tagline}
                    </p>
                    <dl className="mt-6 grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-start gap-3 rounded-[var(--radius-md)] bg-[color:var(--color-mist)] p-3">
                        <Ruler
                          size={18}
                          aria-hidden
                          className="text-[color:var(--color-track-orange-600)]"
                        />
                        <div>
                          <dt className="text-xs uppercase tracking-wider text-[color:var(--color-muted-foreground)]">
                            Length
                          </dt>
                          <dd className="font-semibold">{tr.length}</dd>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 rounded-[var(--radius-md)] bg-[color:var(--color-mist)] p-3">
                        <Timer
                          size={18}
                          aria-hidden
                          className="text-[color:var(--color-track-orange-600)]"
                        />
                        <div>
                          <dt className="text-xs uppercase tracking-wider text-[color:var(--color-muted-foreground)]">
                            Lap record
                          </dt>
                          <dd className="font-semibold">{tr.lapRecord}</dd>
                        </div>
                      </div>
                    </dl>
                    <p className="mt-5 text-[color:var(--color-muted-foreground)]">{tr.layout}</p>
                    <p className="mt-2 flex items-start gap-2 text-sm text-[color:var(--color-muted-foreground)]">
                      <Trophy
                        size={14}
                        aria-hidden
                        className="mt-1 text-[color:var(--color-track-orange-600)]"
                      />
                      {tr.best}
                    </p>
                    <div className="mt-6">
                      <Link
                        href={`/${typedLocale}/tracks/${tr.slug}`}
                        className="inline-flex items-center gap-2 font-semibold text-[color:var(--color-track-orange-600)] underline-offset-4 hover:underline"
                      >
                        {t("common.learnMore")}
                        <ArrowRight size={16} className="rtl:rotate-180" aria-hidden />
                      </Link>
                    </div>
                  </div>
                </article>
              </MotionReveal>
            ))}
          </div>
        </div>
      </SectionBackground>

      <SectionBackground variant="light">
        <div className="section-y mx-auto max-w-7xl container-px">
          <MotionReveal>
            <SectionHeader
              eyebrow="Find us"
              heading="One venue, two layouts"
              badge={<AnimatedBadge dotColor="green">Free parking</AnimatedBadge>}
            />
          </MotionReveal>
          <MotionReveal delay={150} className="mt-10">
            <MapEmbed />
          </MotionReveal>
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
