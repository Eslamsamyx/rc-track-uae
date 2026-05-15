import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Hero, SectionHeader, Breadcrumb } from "@/features/design-system";
import { MembershipSignupForm } from "@/features/forms/components/MembershipSignupForm";
import { isMembershipTier, type MembershipTierId } from "@/features/_shared/branded";
import { isLocale, type Locale } from "@/features/i18n/config";

interface Props {
  params: Promise<{ locale: string; tier: string }>;
}

export function generateStaticParams() {
  const tiers: MembershipTierId[] = ["bronze", "silver", "gold"];
  return tiers.flatMap((tier) =>
    (["en", "ar"] as const).map((locale) => ({ locale, tier })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, tier } = await params;
  if (!isMembershipTier(tier)) return {};
  const t = await getTranslations({ locale });
  const tierName = t(`memberships.tiers.${tier}Title`);
  return {
    title: t("memberships.joinTitle", { tier: tierName }),
    description: t("memberships.joinIntro"),
  };
}

export default async function MembershipJoinPage({ params }: Props) {
  const { locale, tier } = await params;
  if (!isLocale(locale) || !isMembershipTier(tier)) notFound();
  const typedLocale: Locale = locale;
  setRequestLocale(typedLocale);
  const t = await getTranslations();

  const tierName = t(`memberships.tiers.${tier}Title`);

  return (
    <>
      <Hero
        variant="compact"
        eyebrow={t("nav.memberships")}
        headline={t("memberships.joinTitle", { tier: tierName })}
        body={t("memberships.joinIntro")}
      />
      <section className="section-y">
        <div className="mx-auto max-w-3xl container-px">
          <Breadcrumb
            items={[
              { label: t("nav.home"), href: `/${typedLocale}` },
              { label: t("nav.memberships"), href: `/${typedLocale}/memberships` },
              { label: tierName },
            ]}
          />
          <SectionHeader heading={t("memberships.joinTitle", { tier: tierName })} className="mt-8" />
          <div className="mt-8 rounded-[var(--radius-lg)] bg-white p-6 ring-1 ring-[color:var(--color-border)] sm:p-8">
            <MembershipSignupForm tier={tier} />
          </div>
        </div>
      </section>
    </>
  );
}
