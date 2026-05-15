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
  const t = await getTranslations({ locale, namespace: "members" });
  return { title: t("metaTitle"), description: t("metaDescription") };
}

export default async function MembersPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) return null;
  const typedLocale: Locale = locale;
  setRequestLocale(typedLocale);
  const t = await getTranslations();
  return (
    <>
      <Hero variant="compact" eyebrow={t("nav.members")} headline={t("members.title")} body={t("members.body")} />
      <section className="section-y">
        <div className="mx-auto max-w-2xl container-px">
          <SectionHeader heading={t("members.notifyTitle")} align="center" />
          <div className="mt-8 rounded-[var(--radius-lg)] bg-white p-6 ring-1 ring-[color:var(--color-border)]">
            <TallyFormEmbed
              formId={process.env.NEXT_PUBLIC_TALLY_FORM_WAITLIST}
              height={480}
              title="Waitlist signup"
            />
          </div>
        </div>
      </section>
    </>
  );
}
