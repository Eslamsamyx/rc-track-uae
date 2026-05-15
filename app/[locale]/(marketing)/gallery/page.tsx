import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  Hero,
  SectionHeader,
  GalleryGrid,
  type GalleryImage,
  AnimatedBadge,
  MotionReveal,
  SectionBackground,
  CtaBanner,
} from "@/features/design-system";
import { BookingTrigger } from "@/features/booking/components/BookingTrigger";
import { isLocale, type Locale } from "@/features/i18n/config";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "gallery" });
  return { title: t("metaTitle"), description: t("metaDescription") };
}

const GALLERY_SLUGS = [
  "podium-1",
  "pitlane-1",
  "corner-1",
  "coach-1",
  "birthday-1",
  "night-1",
  "corp-1",
  "academy-1",
  "female-driver",
  "jump-1",
  "cars-line-1",
  "marshal-1",
];

const GALLERY_ALTS_EN: Record<string, string> = {
  "podium-1": "Three young winners on a track-orange podium",
  "pitlane-1": "Pit lane wide shot with cars on stands",
  "corner-1": "Low-angle action shot through a fast right-hander",
  "coach-1": "Coach helping a young student adjust their RC car",
  "birthday-1": "Birthday celebration at the RC venue",
  "night-1": "Night race with multiple cars under floodlights",
  "corp-1": "Corporate team cheering at the finish line",
  "academy-1": "Academy classroom with students and instructor",
  "female-driver": "Portrait of a female RC racer with her controller",
  "jump-1": "1:8 buggy mid-air over the triple-jump",
  "cars-line-1": "Row of touring cars on a starting grid",
  "marshal-1": "Marshal in a track-orange polo signalling with a flag",
};

const GALLERY_ALTS_AR: Record<string, string> = {
  "podium-1": "ثلاثة فائزين على منصة التتويج البرتقالية",
  "pitlane-1": "ممر صيانة عريض بالسيارات على الحوامل",
  "corner-1": "لقطة منخفضة الزاوية لمنعطف سريع",
  "coach-1": "مدرّب يساعد متسابقاً صغيراً على ضبط سيارته",
  "birthday-1": "احتفال عيد ميلاد في الحلبة",
  "night-1": "سباق ليلي تحت الأضواء",
  "corp-1": "فريق شركة يهتف عند خط النهاية",
  "academy-1": "صف الأكاديمية مع الطلاب والمدرّب",
  "female-driver": "صورة لمتسابقة آر سي مع جهاز التحكم",
  "jump-1": "سيارة باغي 1:8 في الهواء فوق القفزة الثلاثية",
  "cars-line-1": "صف سيارات تورينج على خط الانطلاق",
  "marshal-1": "مشرف بقميص برتقالي يلوّح بالعلم",
};

function buildGallery(locale: Locale): GalleryImage[] {
  const alts = locale === "ar" ? GALLERY_ALTS_AR : GALLERY_ALTS_EN;
  return GALLERY_SLUGS.map((slug) => ({
    id: slug,
    src: `/generated/gallery/${slug}.png`,
    srcLarge: `/generated/gallery/${slug}.png`,
    alt: alts[slug] ?? slug,
    width: 1024,
    height: 1024,
  }));
}

export default async function GalleryPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) return null;
  const typedLocale: Locale = locale;
  setRequestLocale(typedLocale);
  const t = await getTranslations();
  const images = buildGallery(typedLocale);
  return (
    <>
      <Hero
        variant="image"
        imageUrl="/generated/gallery/night-1.png"
        eyebrow={t("nav.gallery")}
        headline={t("gallery.title")}
        body={t("gallery.intro")}
        topBadge={<AnimatedBadge variant="dark">Real laps, real members</AnimatedBadge>}
        primaryCta={
          <BookingTrigger service="trial" size="lg" variant="primary" labelKey="common.bookTrial" />
        }
      />

      <SectionBackground variant="light" pattern="dots">
        <div className="section-y mx-auto max-w-7xl container-px">
          <MotionReveal>
            <SectionHeader
              heading="Moments from the track"
              align="center"
              badge={<AnimatedBadge dotColor="orange">{`${images.length} photos`}</AnimatedBadge>}
            />
          </MotionReveal>
          <MotionReveal delay={150} className="mt-12">
            <GalleryGrid images={images} />
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
    </>
  );
}
