import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  Hero,
  SectionHeader,
  PackageCard,
  FaqAccordion,
  AnimatedBadge,
  MotionReveal,
  SectionBackground,
  CtaBanner,
  IconStatCard,
} from "@/features/design-system";
import { BookingTrigger } from "@/features/booking/components/BookingTrigger";
import { WhatsAppCta } from "@/features/shop/components/WhatsAppCta";
import { isLocale, type Locale } from "@/features/i18n/config";
import { topFaq } from "@/features/content/homepage-data";
import { Cake, PartyPopper, Trophy, Smile } from "lucide-react";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "birthday" });
  return { title: t("metaTitle"), description: t("metaDescription") };
}

export default async function BirthdayPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) return null;
  const typedLocale: Locale = locale;
  setRequestLocale(typedLocale);
  const t = await getTranslations();

  const tiers = ["bronze", "silver", "gold"] as const;

  return (
    <>
      <Hero
        eyebrow={t("birthday.heroEyebrow")}
        headline={t("birthday.heroHeadline")}
        body={t("birthday.heroBody")}
        imageUrl="/generated/hero/birthday.png"
        topBadge={<AnimatedBadge variant="dark">Ages 6 to 16 · Up to 20 kids</AnimatedBadge>}
        primaryCta={
          <BookingTrigger service="birthday-bronze" variant="primary" size="lg" labelKey="common.bookNow" />
        }
        secondaryCta={<WhatsAppCta messageKey="whatsapp.messageBirthday" source="birthday_hero" />}
      />

      <SectionBackground variant="dark" pattern="grid" orbs>
        <div className="section-y mx-auto max-w-7xl container-px">
          <MotionReveal>
            <SectionHeader
              eyebrow="The party plan"
              heading="A birthday they'll talk about all year"
              align="center"
              invert
            />
          </MotionReveal>
          <div className="mt-12 grid gap-4 md:grid-cols-4">
            <IconStatCard
              value={90}
              suffix=" min"
              label="Driving time per party"
              variant="orange"
              icon={<PartyPopper size={22} aria-hidden />}
            />
            <IconStatCard
              value={20}
              label="Kids per booking"
              variant="blue"
              icon={<Smile size={22} aria-hidden />}
            />
            <IconStatCard
              value={3}
              label="Race heats and a podium"
              variant="dark"
              icon={<Trophy size={22} aria-hidden />}
            />
            <IconStatCard
              value={1}
              label="Cake-cutting moment captured"
              variant="dark"
              icon={<Cake size={22} aria-hidden />}
            />
          </div>
        </div>
      </SectionBackground>

      <SectionBackground variant="mist" pattern="dots">
        <div className="section-y mx-auto max-w-7xl container-px">
          <MotionReveal>
            <SectionHeader
              eyebrow="Packages"
              heading={t("birthday.packagesHeading")}
              align="center"
              badge={<AnimatedBadge dotColor="orange">Includes marshals and helmets</AnimatedBadge>}
            />
          </MotionReveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {tiers.map((tier, i) => {
              const items = t.raw(`birthday.${tier}.items`) as string[];
              return (
                <MotionReveal key={tier} delay={i * 120}>
                  <PackageCard
                    title={t(`birthday.${tier}.title`)}
                    price={t(`birthday.${tier}.price`)}
                    duration={t(`birthday.${tier}.duration`)}
                    guests={t(`birthday.${tier}.guests`)}
                    items={items}
                    variant={tier === "silver" ? "highlight" : "default"}
                    cta={
                      <BookingTrigger
                        service={`birthday-${tier}` as never}
                        variant={tier === "silver" ? "white" : "primary"}
                        labelKey="common.bookNow"
                      />
                    }
                  />
                </MotionReveal>
              );
            })}
          </div>
        </div>
      </SectionBackground>

      <SectionBackground variant="light">
        <div className="section-y mx-auto max-w-5xl container-px">
          <MotionReveal>
            <SectionHeader
              eyebrow="Make it extra"
              heading={t("birthday.addonsHeading")}
              align="center"
            />
          </MotionReveal>
          <ul className="mt-10 grid gap-3 sm:grid-cols-2">
            {(t.raw("birthday.addons") as string[]).map((a, i) => (
              <MotionReveal key={i} delay={i * 60}>
                <li className="flex items-start gap-3 rounded-[var(--radius-md)] bg-white p-4 ring-1 ring-[color:var(--color-border)] shadow-[var(--shadow-sm)]">
                  <span className="mt-1.5 inline-block h-2 w-2 rounded-full bg-[color:var(--color-track-orange)]" />
                  {a}
                </li>
              </MotionReveal>
            ))}
          </ul>
        </div>
      </SectionBackground>

      <SectionBackground variant="mist" pattern="grid">
        <div className="section-y mx-auto max-w-3xl container-px">
          <MotionReveal>
            <SectionHeader heading="Birthday FAQs" align="center" />
          </MotionReveal>
          <MotionReveal delay={150} className="mt-10">
            <FaqAccordion questions={topFaq(typedLocale)} pageTitle="Birthday FAQs" />
          </MotionReveal>
        </div>
      </SectionBackground>

      <CtaBanner
        heading={t("home.ctaBannerHeading")}
        body={t("home.ctaBannerBody")}
        variant="racing"
        imageUrl="/generated/sections/confetti.png"
        cta={
          <BookingTrigger service="birthday-bronze" size="lg" variant="primary" labelKey="common.bookNow" />
        }
      />
    </>
  );
}
