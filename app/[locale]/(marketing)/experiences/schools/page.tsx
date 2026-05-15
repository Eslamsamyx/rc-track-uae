import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  Hero,
  SectionHeader,
  FeatureRow,
  AnimatedBadge,
  MotionReveal,
  SectionBackground,
  IconStatCard,
  CtaBanner,
} from "@/features/design-system";
import { TallyFormEmbed } from "@/features/forms/components/TallyFormEmbed";
import { WhatsAppCta } from "@/features/shop/components/WhatsAppCta";
import { isLocale, type Locale } from "@/features/i18n/config";
import { Calculator, FlaskConical, GraduationCap, Sparkles, BookOpen, Trophy } from "lucide-react";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "schools" });
  return { title: t("metaTitle"), description: t("metaDescription") };
}

export default async function SchoolsPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) return null;
  const typedLocale: Locale = locale;
  setRequestLocale(typedLocale);
  const t = await getTranslations();

  const features = [
    {
      id: "stem",
      icon: <Calculator size={22} aria-hidden />,
      title: "STEM-aligned",
      body: "Curriculum-mapped sessions tied to physics, maths, and engineering.",
    },
    {
      id: "labs",
      icon: <FlaskConical size={22} aria-hidden />,
      title: "Hands-on",
      body: "Build, tune, then race. Students learn cause-and-effect at speed.",
    },
    {
      id: "grad",
      icon: <GraduationCap size={22} aria-hidden />,
      title: "Term programmes",
      body: "Six-week after-school clubs ending with a race night.",
    },
    {
      id: "camps",
      icon: <Sparkles size={22} aria-hidden />,
      title: "Holiday camps",
      body: "Full-week camps over UAE school holidays.",
    },
  ];

  return (
    <>
      <Hero
        eyebrow={t("schools.heroEyebrow")}
        headline={t("schools.heroHeadline")}
        body={t("schools.heroBody")}
        imageUrl="/generated/hero/schools.png"
        topBadge={<AnimatedBadge variant="dark">Schools · After-school clubs · Holiday camps</AnimatedBadge>}
        primaryCta={
          <a
            href="#quote"
            className="inline-flex h-14 items-center justify-center rounded-[var(--radius-md)] bg-[color:var(--color-track-orange)] px-7 text-lg font-semibold text-white shadow-[var(--shadow-md)] transition-transform hover:-translate-y-0.5"
          >
            {t("schools.ctaQuote")}
          </a>
        }
        secondaryCta={<WhatsAppCta messageKey="whatsapp.messageSchool" source="schools_hero" />}
      />

      <SectionBackground variant="dark" pattern="grid" orbs>
        <div className="section-y mx-auto max-w-7xl container-px">
          <MotionReveal>
            <SectionHeader
              eyebrow="By the numbers"
              heading="Where curriculum meets the racing line"
              align="center"
              invert
            />
          </MotionReveal>
          <div className="mt-12 grid gap-4 md:grid-cols-4">
            <IconStatCard
              value={6}
              suffix=" weeks"
              label="Standard term programme"
              variant="orange"
              icon={<BookOpen size={22} aria-hidden />}
            />
            <IconStatCard
              value={24}
              label="Pupils per cohort"
              variant="blue"
              icon={<GraduationCap size={22} aria-hidden />}
            />
            <IconStatCard
              value={1}
              label="Race night graduation"
              variant="dark"
              icon={<Trophy size={22} aria-hidden />}
            />
            <IconStatCard
              value={100}
              suffix="%"
              label="KHDA-friendly content"
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
              eyebrow="What schools get"
              heading="Programmes built for learning, not just driving"
              align="center"
              badge={<AnimatedBadge dotColor="orange">Tailored to your year group</AnimatedBadge>}
            />
          </MotionReveal>
          <MotionReveal delay={150} className="mt-12">
            <FeatureRow features={features} cols={4} />
          </MotionReveal>
        </div>
      </SectionBackground>

      <SectionBackground variant="light" id="quote">
        <div className="section-y mx-auto max-w-3xl container-px">
          <MotionReveal>
            <SectionHeader
              eyebrow="Get a quote"
              heading={t("schools.ctaQuote")}
              align="center"
              badge={<AnimatedBadge dotColor="green">Reply within 24 hours</AnimatedBadge>}
            />
          </MotionReveal>
          <MotionReveal delay={150} className="mt-10">
            <div className="rounded-[var(--radius-lg)] bg-white p-6 shadow-[var(--shadow-md)] ring-1 ring-[color:var(--color-border)]">
              <TallyFormEmbed
                formId={process.env.NEXT_PUBLIC_TALLY_FORM_SCHOOL_QUOTE}
                height={720}
                title="School quote request"
              />
            </div>
          </MotionReveal>
        </div>
      </SectionBackground>

      <CtaBanner
        heading={t("home.ctaBannerHeading")}
        body={t("home.ctaBannerBody")}
        variant="racing"
        imageUrl="/generated/sections/finish-line.png"
        cta={<WhatsAppCta messageKey="whatsapp.messageSchool" source="schools_footer" />}
      />
    </>
  );
}
