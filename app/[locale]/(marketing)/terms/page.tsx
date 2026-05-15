import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Hero } from "@/features/design-system";
import { isLocale, type Locale } from "@/features/i18n/config";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "terms" });
  return { title: t("metaTitle"), description: t("title") };
}

export default async function TermsPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) return null;
  const typedLocale: Locale = locale;
  setRequestLocale(typedLocale);
  const t = await getTranslations();
  return (
    <>
      <Hero variant="compact" eyebrow={t("terms.title")} headline={t("terms.title")} body={`${t("terms.lastUpdated")}: 2026-05-15`} />
      <section className="section-y">
        <div className="mx-auto max-w-3xl container-px prose">
          <h2>Bookings and payments</h2>
          <p>
            A small deposit is required to confirm a booking. Cancellations more than 24 hours in advance are
            refunded in full. Within 24 hours, the deposit is non-refundable.
          </p>
          <h2>Safety</h2>
          <p>
            All visitors agree to follow marshal instructions. Helmets are mandatory for under-12s on the
            technical layout.
          </p>
          <h2>Hobby shop</h2>
          <p>
            Returns accepted within 14 days for unopened items. Race-prepared cars are sold as-is once raced.
          </p>
          <h2>Memberships</h2>
          <p>
            Memberships are annual and non-transferable. Benefits start after payment is confirmed by Stripe.
          </p>
          <h2>Liability</h2>
          <p>
            We carry public liability insurance. Personal items left on the premises are at the owner&apos;s risk.
          </p>
        </div>
      </section>
    </>
  );
}
