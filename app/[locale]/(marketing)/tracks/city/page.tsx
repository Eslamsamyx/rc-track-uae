import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  Hero,
  SectionHeader,
  MapEmbed,
  Breadcrumb,
  AnimatedBadge,
  MotionReveal,
  SectionBackground,
  CtaBanner,
} from "@/features/design-system";
import { BookingTrigger } from "@/features/booking/components/BookingTrigger";
import { isLocale, type Locale } from "@/features/i18n/config";
import { Ruler, Trophy, Timer, MapPin } from "lucide-react";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  return { title: t("tracks.city.title"), description: t("tracks.city.tagline") };
}

export default async function CityTrackPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) return null;
  const typedLocale: Locale = locale;
  setRequestLocale(typedLocale);
  const t = await getTranslations();

  return (
    <>
      <Hero
        variant="image"
        imageUrl="/generated/hero/track-city.png"
        eyebrow={t("nav.tracks")}
        headline={t("tracks.city.title")}
        body={t("tracks.city.tagline")}
        topBadge={<AnimatedBadge variant="dark">{t("tracks.city.layout")}</AnimatedBadge>}
        primaryCta={
          <BookingTrigger service="open-practice" variant="primary" size="lg" labelKey="common.bookNow" />
        }
      />

      <SectionBackground variant="light">
        <div className="section-y mx-auto max-w-7xl container-px">
          <Breadcrumb
            items={[
              { label: t("nav.home"), href: `/${typedLocale}` },
              { label: t("nav.tracks"), href: `/${typedLocale}/tracks` },
              { label: t("tracks.city.title") },
            ]}
          />
          <div className="mt-10 grid items-center gap-10 lg:grid-cols-2">
            <MotionReveal>
              <SectionHeader
                eyebrow="The city circuit"
                heading={t("tracks.city.title")}
                subhead={t("tracks.city.tagline")}
                badge={<AnimatedBadge dotColor="orange">Flagship layout</AnimatedBadge>}
              />
              <dl className="mt-8 grid grid-cols-2 gap-4">
                <Stat icon={<Ruler size={18} aria-hidden />} label="Length" value={t("tracks.city.length")} />
                <Stat icon={<Trophy size={18} aria-hidden />} label="Best for" value={t("tracks.city.best")} />
                <Stat icon={<Timer size={18} aria-hidden />} label="Lap record" value={t("tracks.city.lapRecord")} />
                <Stat icon={<MapPin size={18} aria-hidden />} label="Layout" value={t("tracks.city.layout")} />
              </dl>
            </MotionReveal>
            <MotionReveal delay={150}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-lg)] shadow-[var(--shadow-md)] ring-1 ring-[color:var(--color-border)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/generated/sections/circuit-aerial.png"
                  alt={t("tracks.city.title")}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                <span className="absolute bottom-4 inset-inline-start-4 inline-flex items-center gap-2 rounded-[var(--radius-pill)] bg-white/95 px-3 py-1.5 text-xs font-semibold text-[color:var(--color-racing-blue)] backdrop-blur">
                  <MapPin size={14} aria-hidden />
                  Aerial view
                </span>
              </div>
            </MotionReveal>
          </div>
        </div>
      </SectionBackground>

      <SectionBackground variant="mist" pattern="dots">
        <div className="section-y mx-auto max-w-7xl container-px">
          <MotionReveal>
            <SectionHeader
              eyebrow="Find us"
              heading="One venue, two layouts"
              align="center"
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
        imageUrl="/generated/sections/night-lights.png"
        cta={
          <BookingTrigger service="open-practice" variant="primary" size="lg" labelKey="common.bookNow" />
        }
      />
    </>
  );
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3 rounded-[var(--radius-md)] bg-white p-4 ring-1 ring-[color:var(--color-border)] shadow-[var(--shadow-sm)]">
      <span className="mt-0.5 text-[color:var(--color-track-orange-600)]">{icon}</span>
      <div>
        <dt className="text-xs uppercase tracking-wider text-[color:var(--color-muted-foreground)]">
          {label}
        </dt>
        <dd className="mt-1 font-medium text-[color:var(--color-foreground)]">{value}</dd>
      </div>
    </div>
  );
}
