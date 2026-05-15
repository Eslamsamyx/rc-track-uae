import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Hero, SectionHeader } from "@/features/design-system";
import { TallyFormEmbed } from "@/features/forms/components/TallyFormEmbed";
import { isLocale, type Locale } from "@/features/i18n/config";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "careers" });
  return { title: t("metaTitle"), description: t("metaDescription") };
}

export default async function CareersPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) return null;
  const typedLocale: Locale = locale;
  setRequestLocale(typedLocale);
  const t = await getTranslations();
  const roles = [
    { id: "marshal", title: "Marshal", body: "Weekend shifts on track, full safety training provided." },
    { id: "instructor", title: "Academy Instructor", body: "Race-craft and tuning coaching for cohorts of 12." },
    { id: "mechanic", title: "RC Mechanic", body: "Setup, tuning, and front-of-house repairs in the hobby shop." },
    { id: "events", title: "Events Manager", body: "Plan and run birthdays, corporate events, and championships." },
  ];
  return (
    <>
      <Hero variant="compact" eyebrow={t("nav.careers")} headline={t("careers.title")} body={t("careers.intro")} />
      <section className="section-y">
        <div className="mx-auto max-w-7xl container-px">
          <SectionHeader heading="Open roles" />
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {roles.map((r) => (
              <div
                key={r.id}
                className="rounded-[var(--radius-lg)] bg-white p-6 ring-1 ring-[color:var(--color-border)]"
              >
                <p className="font-[family-name:var(--font-display)] text-xl font-semibold text-[color:var(--color-racing-blue)]">
                  {r.title}
                </p>
                <p className="mt-2 text-sm text-[color:var(--color-muted-foreground)]">{r.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section-y bg-[color:var(--color-mist)]">
        <div className="mx-auto max-w-3xl container-px">
          <SectionHeader heading="Apply" align="center" />
          <div className="mt-8 rounded-[var(--radius-lg)] bg-white p-6 ring-1 ring-[color:var(--color-border)]">
            <TallyFormEmbed
              formId={process.env.NEXT_PUBLIC_TALLY_FORM_CAREER}
              height={720}
              title="Career application"
            />
          </div>
        </div>
      </section>
    </>
  );
}
