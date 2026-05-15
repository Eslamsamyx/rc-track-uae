import type { EventEntry } from "@/features/design-system";
import type { Locale } from "@/features/i18n/config";

export function getEvents(locale: Locale): EventEntry[] {
  const en: EventEntry[] = [
    {
      slug: "summer-night-grand-prix",
      title: "Summer Night Grand Prix",
      description:
        "An open race night with heats across 1:10 touring and 1:8 buggy. Trophies, music, and a food truck on the paddock.",
      date: "2026-06-13",
      location: "City Track, Sheikh Zayed Road",
      category: "race-night",
      imageUrl: "/generated/events/summer-night.png",
    },
    {
      slug: "uae-rc-championship-r3",
      title: "UAE RC Championship: Round 3",
      description:
        "Round 3 of the 8-round championship. Practice from 1 PM, qualifiers at 4 PM, finals under the lights.",
      date: "2026-07-04",
      location: "City Track, Sheikh Zayed Road",
      category: "championship",
      imageUrl: "/generated/events/championship-r3.png",
    },
    {
      slug: "traxxas-demo-day",
      title: "Traxxas Demo Day",
      description:
        "Try the latest 4WD platforms from Traxxas on the village layout. Tech experts on site.",
      date: "2026-08-09",
      location: "Village Track",
      category: "demo",
      imageUrl: "/generated/events/traxxas-demo.png",
    },
    {
      slug: "back-to-school-academy-open-day",
      title: "Academy Open Day",
      description:
        "Free coached sessions for kids ages 7-14. Meet our instructors and join a starter race.",
      date: "2026-09-05",
      location: "City Track",
      category: "festival",
      imageUrl: "/generated/events/academy-open-day.png",
    },
    {
      slug: "winter-endurance-12-hour",
      title: "Winter Endurance: 12 Hour",
      description:
        "Team-of-four endurance event with rotating drivers, hot food, and live commentary. Trophies for first three teams.",
      date: "2026-12-12",
      location: "City Track",
      category: "championship",
      imageUrl: "/generated/events/winter-endurance.png",
    },
    {
      slug: "open-race-night-monthly",
      title: "Monthly Open Race Night",
      description:
        "Last Saturday of every month. Drop-in race format, all classes welcome. Best lap takes a free coffee.",
      date: "2026-05-30",
      location: "City Track",
      category: "race-night",
      imageUrl: "/generated/events/open-race-night.png",
    },
  ];

  if (locale === "ar") {
    return en.map((e, i) => ({
      ...e,
      title: [
        "جراند بري الصيف الليلي",
        "بطولة الإمارات للآر سي: الجولة 3",
        "يوم عرض ترافكسس",
        "يوم الأكاديمية المفتوح",
        "تحدي الشتاء: 12 ساعة",
        "ليلة السباق المفتوحة الشهرية",
      ][i] ?? e.title,
      description: [
        "ليلة سباق مفتوحة بفئات تورينج 1:10 وباغي 1:8. كؤوس وموسيقى وعربة طعام في الحظيرة.",
        "الجولة الثالثة من البطولة. تدريب من 1 ظهراً، تأهيلي 4 عصراً، النهائيات تحت الأضواء.",
        "جرّب أحدث منصات Traxxas الرباعية الدفع على حلبة القرية. خبراء الفنيين في الموقع.",
        "جلسات مجانية بقيادة مدربين للأطفال 7-14. قابل المدربين وانضم لسباق المبتدئين.",
        "حدث تحمل لفرق من أربعة سائقين بتناوب، طعام ساخن وتعليق مباشر.",
        "آخر سبت من كل شهر. سباق دخول مباشر لكل الفئات. أفضل لفّة تربح قهوة مجانية.",
      ][i] ?? e.description,
      location: ["حلبة المدينة، شارع الشيخ زايد", "حلبة القرية"][e.location.includes("Village") ? 1 : 0] ?? e.location,
    }));
  }
  return en;
}
