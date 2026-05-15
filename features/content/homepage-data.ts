import type { Testimonial, Feature, FaqQuestion } from "@/features/design-system";
import type { Locale } from "@/features/i18n/config";

export interface HomepageStats {
  laps: number;
  trackMetres: number;
  members: number;
  ageFrom: number;
}

export const homepageStats: HomepageStats = {
  laps: 18420,
  trackMetres: 420,
  members: 480,
  ageFrom: 7,
};

export function homepageTestimonials(locale: Locale): Testimonial[] {
  if (locale === "ar") {
    return [
      {
        id: "t1",
        quote:
          "خمس دقائق من الشرح ونصف ساعة من الضحك. عاد ابني الأسبوع الذي يليه بنفسه.",
        author: "أم خالد",
        meta: "زائرة، حلبة المدينة",
        avatarUrl: "/generated/portraits/fatima.png",
        rating: 5,
      },
      {
        id: "t2",
        quote:
          "أفضل تجربة بناء فريق نفذناها هذا العام. الجميع شارك.",
        author: "آلاء حسين",
        meta: "مديرة موارد بشرية في بنك متعدد الجنسيات",
        avatarUrl: "/generated/portraits/sarah.png",
        rating: 5,
      },
      {
        id: "t3",
        quote: "الأكاديمية حسّنت مهارات ابني بشكل ملحوظ. الآن يكسب سباقات النادي.",
        author: "ماجد القاسم",
        meta: "أب وعضو ذهبي",
        avatarUrl: "/generated/portraits/rahul.png",
        rating: 5,
      },
      {
        id: "t4",
        quote:
          "حلبة احترافية بمعايير مدروسة. أمنّيتي ينافسوا على بطولة عالمية قريباً.",
        author: "د. خليفة المنصوري",
        meta: "نائب رئيس النادي الإماراتي للسيارات",
        avatarUrl: "/generated/portraits/ahmed.png",
        rating: 5,
      },
    ];
  }
  return [
    {
      id: "t1",
      quote:
        "Five minutes of safety briefing, then thirty minutes of laughs. My son came back the week after on his own.",
      author: "Umm Khaled",
      meta: "Visitor, City Track",
      avatarUrl: "/generated/portraits/fatima.png",
      rating: 5,
    },
    {
      id: "t2",
      quote:
        "Best team-building day we ran this year. Everyone joined in, including the CFO. Energy was great.",
      author: "Alaa Hussein",
      meta: "HR Director, multinational bank",
      avatarUrl: "/generated/portraits/sarah.png",
      rating: 5,
    },
    {
      id: "t3",
      quote:
        "Academy lifted my son's race craft significantly. He's winning at our club nights now.",
      author: "Majed Al Qassim",
      meta: "Parent, Gold member",
      avatarUrl: "/generated/portraits/rahul.png",
      rating: 5,
    },
    {
      id: "t4",
      quote:
        "World-class layout, with detail you only get from real racers. Looking forward to seeing them at international rounds.",
      author: "Dr. Khalifa Al Mansouri",
      meta: "Vice Chair, UAE Auto Club",
      avatarUrl: "/generated/portraits/ahmed.png",
      rating: 5,
    },
  ];
}

export function howItWorksFeatures(t: (k: string) => string): Feature[] {
  return [
    {
      id: "step1",
      title: t("home.howItWorksSteps.step1Title"),
      body: t("home.howItWorksSteps.step1Body"),
    },
    {
      id: "step2",
      title: t("home.howItWorksSteps.step2Title"),
      body: t("home.howItWorksSteps.step2Body"),
    },
    {
      id: "step3",
      title: t("home.howItWorksSteps.step3Title"),
      body: t("home.howItWorksSteps.step3Body"),
    },
  ];
}

export interface ExperienceCard {
  id: string;
  title: string;
  body: string;
  imageUrl: string;
  href: string;
  badge?: string;
}

export function experiencesCards(t: (k: string) => string): ExperienceCard[] {
  return [
    {
      id: "trial",
      title: t("experiences.trial.title"),
      body: t("experiences.trial.body"),
      imageUrl: "/generated/hero/trial.png",
      href: "/experiences/trial",
      badge: "From AED 99",
    },
    {
      id: "open",
      title: t("experiences.openPractice.title"),
      body: t("experiences.openPractice.body"),
      imageUrl: "/generated/hero/open-practice.png",
      href: "/experiences/open-practice",
      badge: "AED 75 / hr",
    },
    {
      id: "birthday",
      title: t("experiences.birthday.title"),
      body: t("experiences.birthday.body"),
      imageUrl: "/generated/hero/birthday.png",
      href: "/experiences/birthday-parties",
      badge: "From AED 2,800",
    },
    {
      id: "corporate",
      title: t("experiences.corporate.title"),
      body: t("experiences.corporate.body"),
      imageUrl: "/generated/hero/corporate.png",
      href: "/experiences/corporate-events",
      badge: "Quote on request",
    },
    {
      id: "schools",
      title: t("experiences.schools.title"),
      body: t("experiences.schools.body"),
      imageUrl: "/generated/hero/schools.png",
      href: "/experiences/schools",
      badge: "STEM-aligned",
    },
    {
      id: "tourist",
      title: t("experiences.tourist.title"),
      body: t("experiences.tourist.body"),
      imageUrl: "/generated/hero/tourist.png",
      href: "/tourist",
      badge: "Visitor pack",
    },
  ];
}

export function experiencesFeatures(t: (k: string) => string): Feature[] {
  return [
    { id: "trial", title: t("experiences.trial.title"), body: t("experiences.trial.body") },
    {
      id: "open",
      title: t("experiences.openPractice.title"),
      body: t("experiences.openPractice.body"),
    },
    { id: "birthday", title: t("experiences.birthday.title"), body: t("experiences.birthday.body") },
    { id: "corporate", title: t("experiences.corporate.title"), body: t("experiences.corporate.body") },
    { id: "schools", title: t("experiences.schools.title"), body: t("experiences.schools.body") },
    { id: "tourist", title: t("experiences.tourist.title"), body: t("experiences.tourist.body") },
  ];
}

export const galleryPreviewImages: string[] = [
  "/generated/gallery/jump-1.png",
  "/generated/gallery/corner-1.png",
  "/generated/gallery/night-1.png",
  "/generated/gallery/female-driver.png",
  "/generated/gallery/coach-1.png",
  "/generated/gallery/cars-line-1.png",
];

export function topFaq(locale: Locale): FaqQuestion[] {
  if (locale === "ar") {
    return [
      {
        id: "age",
        question: "ما هو الحد الأدنى للعمر؟",
        answer: "نقبل المتسابقين من عمر 7 سنوات وما فوق. لدينا سيارات بمقاييس مختلفة لتناسب الجميع.",
      },
      {
        id: "experience",
        question: "هل أحتاج خبرة سابقة؟",
        answer:
          "لا. كل جلسة تبدأ بشرح خمس دقائق ويبقى المشرفون على الحلبة. الكثير من الزوار يجربون لأول مرة في حياتهم.",
      },
      {
        id: "duration",
        question: "كم تستغرق الجلسة التجريبية؟",
        answer:
          "ثلاثون دقيقة على الحلبة، بالإضافة إلى شرح السلامة وصورة عند خط النهاية. خصص ساعة كاملة عند الزيارة.",
      },
      {
        id: "price",
        question: "ما هو السعر؟",
        answer:
          "99 درهماً للسعر التعريفي و195 درهماً للسعر الاعتيادي. توجد عضويات تخفض السعر ساعة عضوية.",
      },
    ];
  }
  return [
    {
      id: "age",
      question: "What is the minimum age to race?",
      answer:
        "We accept racers from 7 years and up. We have multiple car scales to suit kids, teens, and adults.",
    },
    {
      id: "experience",
      question: "Do I need any prior experience?",
      answer:
        "Not at all. Every session begins with a five-minute safety briefing and marshals stay on track for guidance. Most visitors race for the first time in their lives.",
    },
    {
      id: "duration",
      question: "How long does a trial session take?",
      answer:
        "Thirty minutes of guided track time, plus a safety briefing and a finish-line photo. Allow about an hour for your visit.",
    },
    {
      id: "price",
      question: "How much does a trial cost?",
      answer:
        "AED 99 for the introductory rate (weekdays before 6 PM) or AED 195 for the standard rate. Memberships drop the per-hour cost significantly.",
    },
  ];
}
