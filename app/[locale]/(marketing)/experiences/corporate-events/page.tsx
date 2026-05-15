import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  Hero,
  SectionHeader,
  PackageCard,
  AnimatedBadge,
  MotionReveal,
  SectionBackground,
  IconStatCard,
  CtaBanner,
} from "@/features/design-system";
import { TallyFormEmbed } from "@/features/forms/components/TallyFormEmbed";
import { WhatsAppCta } from "@/features/shop/components/WhatsAppCta";
import { isLocale, type Locale } from "@/features/i18n/config";
import { Briefcase, Trophy, Users, Sparkles } from "lucide-react";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "corporate" });
  return { title: t("metaTitle"), description: t("metaDescription") };
}

export default async function CorporatePage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) return null;
  const typedLocale: Locale = locale;
  setRequestLocale(typedLocale);
  const t = await getTranslations();

  const tiers = ["starter", "pro", "executive"] as const;

  return (
    <>
      <Hero
        eyebrow={t("corporate.heroEyebrow")}
        headline={t("corporate.heroHeadline")}
        body={t("corporate.heroBody")}
        imageUrl="/generated/hero/corporate.png"
        topBadge={<AnimatedBadge variant="dark">Team-building · DEWA, Aldar and more</AnimatedBadge>}
        primaryCta={
          <a
            href="#quote"
            className="inline-flex h-14 items-center justify-center rounded-[var(--radius-md)] bg-[color:var(--color-track-orange)] px-7 text-lg font-semibold text-white shadow-[var(--shadow-md)] transition-transform hover:-translate-y-0.5"
          >
            {t("corporate.ctaQuote")}
          </a>
        }
        secondaryCta={<WhatsAppCta messageKey="whatsapp.messageCorporate" source="corporate_hero" />}
      />

      <SectionBackground variant="dark" pattern="grid" orbs>
        <div className="section-y mx-auto max-w-7xl container-px">
          <MotionReveal>
            <SectionHeader
              eyebrow="Why teams love it"
              heading="Bond on the grid, not in a meeting room"
              align="center"
              invert
            />
          </MotionReveal>
          <div className="mt-12 grid gap-4 md:grid-cols-4">
            <IconStatCard
              value={40}
              label="Max team size, mixed heats"
              variant="orange"
              icon={<Users size={22} aria-hidden />}
            />
            <IconStatCard
              value={3}
              suffix=" hrs"
              label="Standard event slot"
              variant="blue"
              icon={<Briefcase size={22} aria-hidden />}
            />
            <IconStatCard
              value={1}
              label="Trophy ceremony at the podium"
              variant="dark"
              icon={<Trophy size={22} aria-hidden />}
            />
            <IconStatCard
              value={100}
              suffix="%"
              label="Custom branding available"
              variant="dark"
              icon={<Sparkles size={22} aria-hidden />}
            />
          </div>
        </div>
      </SectionBackground>

      <SectionBackground variant="mist" pattern="dots">
        <div className="section-y mx-auto max-w-7xl container-px">
          <MotionReveal>
            <SectionHeader
              eyebrow="Tiers"
              heading={t("corporate.tiersHeading")}
              align="center"
              badge={<AnimatedBadge dotColor="orange">All-inclusive packages</AnimatedBadge>}
            />
          </MotionReveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {tiers.map((tier, i) => (
              <MotionReveal key={tier} delay={i * 120}>
                <PackageCard
                  title={t(`corporate.${tier}.title`)}
                  price={t(`corporate.${tier}.price`)}
                  items={t.raw(`corporate.${tier}.items`) as string[]}
                  variant={tier === "pro" ? "highlight" : "default"}
                  cta={
                    <a
                      href="#quote"
                      className={
                        "inline-flex h-11 items-center justify-center rounded-[var(--radius-md)] px-5 text-sm font-semibold " +
                        (tier === "pro"
                          ? "bg-white text-[color:var(--color-racing-blue)]"
                          : "bg-[color:var(--color-track-orange)] text-white")
                      }
                    >
                      {t("corporate.ctaQuote")}
                    </a>
                  }
                />
              </MotionReveal>
            ))}
          </div>
        </div>
      </SectionBackground>

      <SectionBackground variant="light" id="quote">
        <div className="section-y mx-auto max-w-3xl container-px">
          <MotionReveal>
            <SectionHeader
              eyebrow="Get a quote"
              heading={t("corporate.ctaQuote")}
              align="center"
              badge={<AnimatedBadge dotColor="green">Reply within 24 hours</AnimatedBadge>}
            />
          </MotionReveal>
          <MotionReveal delay={150} className="mt-10">
            <div className="rounded-[var(--radius-lg)] bg-white p-6 shadow-[var(--shadow-md)] ring-1 ring-[color:var(--color-border)]">
              <TallyFormEmbed
                formId={process.env.NEXT_PUBLIC_TALLY_FORM_CORPORATE_QUOTE}
                height={720}
                title="Corporate quote request"
              />
            </div>
          </MotionReveal>
        </div>
      </SectionBackground>

      <CtaBanner
        heading={t("home.ctaBannerHeading")}
        body={t("home.ctaBannerBody")}
        variant="racing"
        imageUrl="/generated/sections/paddock.png"
        cta={<WhatsAppCta messageKey="whatsapp.messageCorporate" source="corporate_footer" />}
      />
    </>
  );
}
