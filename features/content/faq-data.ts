import type { FaqQuestion } from "@/features/design-system";
import type { Locale } from "@/features/i18n/config";

export interface FaqCategoryGroup {
  id: string;
  labelKey: string;
  questions: FaqQuestion[];
}

export function fullFaq(locale: Locale): FaqCategoryGroup[] {
  if (locale === "ar") {
    return [
      {
        id: "booking",
        labelKey: "faq.categories.booking",
        questions: [
          {
            id: "b1",
            question: "كيف أحجز؟",
            answer:
              "اضغط زر احجز في أي صفحة لفتح نافذة الحجز. اختر الخدمة والموعد وادفع عربوناً. الباقي في الموقع.",
          },
          {
            id: "b2",
            question: "هل أستطيع الإلغاء؟",
            answer:
              "نعم، بدون رسوم قبل 24 ساعة من الموعد. بعد ذلك، نحتفظ بالعربون.",
          },
          {
            id: "b3",
            question: "هل تقبلون الزوار بدون حجز؟",
            answer: "نعم عند توفر مواعيد. الحجز المسبق يوفر مكاناً مضموناً.",
          },
        ],
      },
      {
        id: "ageSafety",
        labelKey: "faq.categories.ageSafety",
        questions: [
          {
            id: "a1",
            question: "ما الحد الأدنى للعمر؟",
            answer: "7 سنوات. الأطفال دون 12 يلبسون خوذة على المسار التقني.",
          },
          {
            id: "a2",
            question: "هل توجد مشرفون على المسار؟",
            answer: "نعم، مشرف على كل جولة، وكاميرات على الحلبة.",
          },
        ],
      },
      {
        id: "venue",
        labelKey: "faq.categories.venue",
        questions: [
          {
            id: "v1",
            question: "هل المكان متاح لكل المستخدمين؟",
            answer: "نعم، الدخول وممرات الحلبة وخدمات الحمامات متاحة للكراسي المتحركة.",
          },
          {
            id: "v2",
            question: "هل توجد مواقف؟",
            answer: "نعم، مواقف مجانية للزوار. ولدينا محطات شحن للسيارات الكهربائية.",
          },
        ],
      },
      {
        id: "memberships",
        labelKey: "faq.categories.memberships",
        questions: [
          {
            id: "m1",
            question: "متى تبدأ ميزات العضوية؟",
            answer: "خلال 24 ساعة من إتمام الدفع نتواصل معك على واتساب لتفعيل المزايا.",
          },
        ],
      },
      {
        id: "shop",
        labelKey: "faq.categories.shop",
        questions: [
          {
            id: "s1",
            question: "كم تستغرق الشحنات؟",
            answer: "1-3 أيام داخل الإمارات. ولديك خيار الاستلام من الحلبة.",
          },
        ],
      },
    ];
  }
  return [
    {
      id: "booking",
      labelKey: "faq.categories.booking",
      questions: [
        {
          id: "b1",
          question: "How do I book?",
          answer:
            "Tap any Book button to open the booking modal. Choose a service, pick a slot, and pay a small deposit. The rest is settled at the venue.",
        },
        {
          id: "b2",
          question: "Can I cancel a booking?",
          answer:
            "Yes, free of charge up to 24 hours before your slot. After that we keep the deposit.",
        },
        {
          id: "b3",
          question: "Do you take walk-ins?",
          answer:
            "Yes when slots are open. We recommend booking ahead, especially on weekends.",
        },
        {
          id: "b4",
          question: "What forms of payment do you accept?",
          answer:
            "Card, Apple Pay, Google Pay, Tabby, and Tamara at the till. Online deposits go through Stripe.",
        },
      ],
    },
    {
      id: "ageSafety",
      labelKey: "faq.categories.ageSafety",
      questions: [
        {
          id: "a1",
          question: "What is the minimum age?",
          answer: "Seven years and up. Under-12s wear a helmet on the technical layout.",
        },
        {
          id: "a2",
          question: "Are marshals on track?",
          answer:
            "Yes, a marshal supervises every heat and we have multiple safety cameras on the track.",
        },
        {
          id: "a3",
          question: "What if I crash?",
          answer:
            "We tune cars between heats, so a minor knock is free. Big damage is rare and not charged unless reckless.",
        },
      ],
    },
    {
      id: "venue",
      labelKey: "faq.categories.venue",
      questions: [
        {
          id: "v1",
          question: "Is the venue accessible?",
          answer:
            "Yes. Entry ramps, accessible toilets, and wheelchair-friendly viewing platforms.",
        },
        {
          id: "v2",
          question: "Is there parking?",
          answer:
            "Free visitor parking plus EV charging on the south side of the building.",
        },
        {
          id: "v3",
          question: "Do you have food and drink?",
          answer:
            "A cafe runs from 10 AM to 11 PM with coffee, sandwiches, and packaged snacks.",
        },
      ],
    },
    {
      id: "memberships",
      labelKey: "faq.categories.memberships",
      questions: [
        {
          id: "m1",
          question: "When do my membership benefits start?",
          answer:
            "Within 24 hours of payment we reach out on WhatsApp to activate everything and book your free hours.",
        },
        {
          id: "m2",
          question: "Can I share my membership?",
          answer:
            "Bronze is per individual. Silver and Gold include scheduled guest passes.",
        },
      ],
    },
    {
      id: "shop",
      labelKey: "faq.categories.shop",
      questions: [
        {
          id: "s1",
          question: "How fast is shipping?",
          answer:
            "1 to 3 business days inside the UAE. Pickup at the track is free.",
        },
        {
          id: "s2",
          question: "Do you ship to GCC?",
          answer:
            "Yes via Aramex and DHL. Duties and taxes are calculated at checkout.",
        },
      ],
    },
  ];
}
