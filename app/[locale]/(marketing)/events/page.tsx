import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  Hero,
  SectionHeader,
  EventCard,
  AnimatedBadge,
  MotionReveal,
  SectionBackground,
  CtaBanner,
} from "@/features/design-system";
import { BookingTrigger } from "@/features/booking/components/BookingTrigger";
import { getEvents } from "@/features/content/events-data";
import { isLocale, type Locale } from "@/features/i18n/config";
import { asset } from "@/lib/asset";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "events" });
  return { title: t("metaTitle"), description: t("metaDescription") };
}

export default async function EventsPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) return null;
  const typedLocale: Locale = locale;
  setRequestLocale(typedLocale);
  const t = await getTranslations();
  const events = getEvents(typedLocale);
  const featured = events[0];
  const rest = events.slice(1);

  return (
    <>
      <Hero
        variant="image"
        imageUrl="/generated/events/summer-night.png"
        eyebrow={t("nav.events")}
        headline={t("events.title")}
        body={t("events.intro")}
        topBadge={<AnimatedBadge variant="dark">Race nights · Championships · Demo days</AnimatedBadge>}
        primaryCta={
          <BookingTrigger service="trial" size="lg" variant="primary" labelKey="common.bookTrial" />
        }
      />

      {featured ? (
        <SectionBackground variant="dark" pattern="grid" orbs>
          <div className="section-y mx-auto max-w-7xl container-px">
            <MotionReveal>
              <SectionHeader
                eyebrow="Next on track"
                heading={featured.title}
                subhead={featured.description}
                invert
                badge={<AnimatedBadge dotColor="orange">Coming up</AnimatedBadge>}
              />
            </MotionReveal>
            <MotionReveal delay={150} className="mt-10">
              <div className="grid gap-6 overflow-hidden rounded-[var(--radius-lg)] bg-white/5 ring-1 ring-white/15 backdrop-blur md:grid-cols-[1.2fr_1fr]">
                <div className="relative aspect-[16/10] md:aspect-auto">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={asset(featured.imageUrl)}
                    alt=""
                    aria-hidden
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                </div>
                <div className="flex flex-col justify-center gap-4 p-8 md:p-10">
                  <p className="text-xs uppercase tracking-[0.18em] text-[color:var(--color-track-orange)]">
                    {featured.location}
                  </p>
                  <p className="font-[family-name:var(--font-display)] text-2xl font-bold md:text-3xl">
                    {new Date(featured.date).toLocaleDateString(typedLocale === "ar" ? "ar-AE" : "en-AE", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                  <p className="text-white/85">{featured.description}</p>
                  <div>
                    <BookingTrigger service="open-practice" variant="primary" labelKey="common.bookNow" />
                  </div>
                </div>
              </div>
            </MotionReveal>
          </div>
        </SectionBackground>
      ) : null}

      <SectionBackground variant="mist" pattern="dots">
        <div className="section-y mx-auto max-w-7xl container-px">
          <MotionReveal>
            <SectionHeader
              eyebrow="Calendar"
              heading="All upcoming events"
              align="center"
              badge={<AnimatedBadge dotColor="orange">{`${events.length} on the schedule`}</AnimatedBadge>}
            />
          </MotionReveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((e, i) => (
              <MotionReveal key={e.slug} delay={i * 90}>
                <EventCard event={e} locale={typedLocale} />
              </MotionReveal>
            ))}
          </div>
        </div>
      </SectionBackground>

      <CtaBanner
        heading={t("home.ctaBannerHeading")}
        body={t("home.ctaBannerBody")}
        variant="racing"
        imageUrl="/generated/sections/night-lights.png"
        cta={
          <BookingTrigger service="trial" size="lg" variant="primary" labelKey="common.bookTrial" />
        }
      />
    </>
  );
}
