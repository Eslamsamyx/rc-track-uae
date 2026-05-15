import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  Hero,
  SectionHeader,
  ImageFeatureCard,
  AnimatedBadge,
  MotionReveal,
  SectionBackground,
  CtaBanner,
} from "@/features/design-system";
import { BookingTrigger } from "@/features/booking/components/BookingTrigger";
import { isLocale, type Locale } from "@/features/i18n/config";
import { experiencesCards } from "@/features/content/homepage-data";
import { Flag, Wrench, Cake, Briefcase, GraduationCap, Globe } from "lucide-react";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "experiences" });
  return { title: t("metaTitle"), description: t("metaDescription") };
}

const ICON_BY_ID: Record<string, React.ReactNode> = {
  trial: <Flag size={20} aria-hidden />,
  open: <Wrench size={20} aria-hidden />,
  birthday: <Cake size={20} aria-hidden />,
  corporate: <Briefcase size={20} aria-hidden />,
  schools: <GraduationCap size={20} aria-hidden />,
  tourist: <Globe size={20} aria-hidden />,
};

export default async function ExperiencesPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) return null;
  const typedLocale: Locale = locale;
  setRequestLocale(typedLocale);
  const t = await getTranslations();
  const cards = experiencesCards(t);

  return (
    <>
      <Hero
        variant="image"
        imageUrl="/generated/sections/paddock.png"
        eyebrow={t("nav.experiences")}
        headline={t("experiences.title")}
        body={t("experiences.intro")}
        topBadge={<AnimatedBadge variant="dark">Six ways to race</AnimatedBadge>}
        primaryCta={
          <BookingTrigger service="trial" size="lg" variant="primary" labelKey="common.bookTrial" />
        }
      />

      <SectionBackground variant="mist" pattern="dots">
        <div className="section-y mx-auto max-w-7xl container-px">
          <MotionReveal>
            <SectionHeader
              heading={t("home.experiencesHeading")}
              subhead={t("home.experiencesBody")}
              align="center"
              badge={<AnimatedBadge dotColor="orange">All ages welcome</AnimatedBadge>}
            />
          </MotionReveal>
          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {cards.map((card, i) => (
              <MotionReveal key={card.id} delay={i * 80}>
                <ImageFeatureCard
                  imageUrl={card.imageUrl}
                  eyebrow={card.badge}
                  title={card.title}
                  body={card.body}
                  href={`/${typedLocale}${card.href}`}
                  cta={t("common.learnMore")}
                  icon={ICON_BY_ID[card.id]}
                  aspect="portrait"
                />
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
