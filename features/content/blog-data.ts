import type { BlogPostSummary } from "@/features/design-system";
import type { Locale } from "@/features/i18n/config";

export interface BlogPostDetail extends BlogPostSummary {
  bodyParagraphs: string[];
}

export function getBlogPosts(locale: Locale): BlogPostDetail[] {
  const enPosts: BlogPostDetail[] = [
    {
      slug: "first-lap-tips-for-beginners",
      title: "Your first lap: five tips that change everything",
      excerpt:
        "Steering smoothly, looking ahead, and trusting the suspension. Three habits that turn first-time visitors into confident drivers.",
      date: "2026-04-10",
      readingMinutes: 6,
      author: "Coach Layla",
      category: "Tutorials",
      imageUrl: "/generated/blog/first-lap-tips.png",
      bodyParagraphs: [
        "Your first lap is the hardest. The car is small, the cones look closer than they are, and your thumbs forget about half the controls. We have run thousands of trial sessions, and the patterns are the same:",
        "Trust the suspension, lift before the corner, and look two corners ahead. If you do these three things, your second lap will be twice as fast and three times as smooth.",
        "Most first-time visitors panic on lift-off. The car drops, the back end steps out, and they pull the throttle full again. Resist. Lift smoothly, settle the chassis, then re-apply.",
        "If you remember nothing else from your trial, remember the third tip: keep your eyes on where you want the car to go, not on where it is. Hands follow eyes. Always.",
      ],
    },
    {
      slug: "build-a-1-10-touring-on-a-budget",
      title: "Building a competitive 1:10 touring on a budget",
      excerpt:
        "What to buy, what to skip, and how to keep your first build under AED 2,500 without driving slowly.",
      date: "2026-03-28",
      readingMinutes: 9,
      author: "Yousef, Hobby Shop",
      category: "Builds",
      imageUrl: "/generated/blog/budget-build.png",
      bodyParagraphs: [
        "A competitive 1:10 touring car does not need to be expensive. Spend on the chassis, save on the bodyshell.",
        "Our budget-build recipe: a Tamiya TT-02 chassis, a Hobbywing QuicRun 1080 ESC, and a Sanwa MX-6 radio. The total comes to AED 2,300 and lasts seasons.",
        "Upgrade in this order: tyres, then springs, then a brushless setup. Bodyshell last. A pretty car that handles badly is no fun on lap five.",
      ],
    },
    {
      slug: "academy-graduation-march",
      title: "Academy graduation report: March 2026 cohort",
      excerpt:
        "Twelve graduates, three trophies, and one absolute upset by a 9-year-old with a Tamiya TT-02.",
      date: "2026-03-15",
      readingMinutes: 4,
      author: "Coach Layla",
      category: "Race Reports",
      imageUrl: "/generated/blog/academy-graduation.png",
      bodyParagraphs: [
        "This year's Beginner cohort finished with a graduation race night on the city track. Twelve students, six weeks of coaching, and one absolutely brilliant final.",
        "Mariam, age 9, took the win on a Tamiya TT-02 against a field of brushless XRAYs. The lesson: setup beats horsepower, every time.",
        "Next term starts in May. Spots fill quickly because we cap each cohort at 12.",
      ],
    },
    {
      slug: "best-tyres-for-the-uae-heat",
      title: "Best tyres for the UAE summer: a field test",
      excerpt:
        "We ran five compounds back-to-back in 42 C heat. Here is what survived.",
      date: "2026-02-20",
      readingMinutes: 7,
      author: "Marshal Hamad",
      category: "Gear",
      imageUrl: "/generated/blog/tyres-uae-heat.png",
      bodyParagraphs: [
        "UAE summer is brutal on rubber. We ran five popular compounds back-to-back in 42 C heat on the city track. The results were not what we expected.",
        "Pirelli T1S melted by lap 12. Sweep 32S held shape but lost grip after lap 40. The surprise winner: Pro-Line Hole Shot, hard compound, on the village layout.",
      ],
    },
  ];

  if (locale === "ar") {
    return enPosts.map((p, i) => ({
      ...p,
      title: [
        "أول لفّة: خمس نصائح تغيّر كل شيء",
        "بناء سيارة تورينج 1:10 منافسة بميزانية محدودة",
        "تقرير تخرّج الأكاديمية: دفعة مارس 2026",
        "أفضل إطارات لصيف الإمارات: اختبار ميداني",
      ][i] ?? p.title,
      excerpt: [
        "توجيه سلس، نظر للأمام، وثقة في التعليق. ثلاث عادات تحوّل المبتدئ إلى سائق واثق.",
        "ماذا تشتري، ماذا تتجنب، وكيف تبني أول سيارة بأقل من 2,500 درهم.",
        "اثنا عشر متخرّجاً، ثلاث كؤوس، ومفاجأة من طفلة بعمر 9 سنوات.",
        "اختبرنا خمسة مكونات في درجة 42. هذه النتائج.",
      ][i] ?? p.excerpt,
      category: ["دروس", "بناءات", "تقارير سباق", "معدات"][i] ?? p.category,
      bodyParagraphs: p.bodyParagraphs.map((b) => `[نسخة عربية] ${b}`),
    }));
  }
  return enPosts;
}
