import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Hero, SectionHeader, MapEmbed } from "@/features/design-system";
import { ContactForm } from "@/features/forms/components/ContactForm";
import { WhatsAppCta } from "@/features/shop/components/WhatsAppCta";
import { isLocale, type Locale } from "@/features/i18n/config";
import { Mail, Phone } from "lucide-react";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  return { title: t("metaTitle"), description: t("metaDescription") };
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) return null;
  const typedLocale: Locale = locale;
  setRequestLocale(typedLocale);
  const t = await getTranslations();
  return (
    <>
      <Hero variant="compact" imageUrl="/generated/hero/contact.png" eyebrow={t("nav.contact")} headline={t("contact.title")} body={t("contact.intro")} />
      <section className="section-y">
        <div className="mx-auto max-w-7xl container-px">
          <SectionHeader heading={t("contact.channelsHeading")} />
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-[var(--radius-lg)] bg-white p-6 ring-1 ring-[color:var(--color-border)]">
              <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-[color:var(--color-racing-blue)]">
                {t("contact.whatsappLabel")}
              </h3>
              <p className="mt-2 text-sm text-[color:var(--color-muted-foreground)]">{t("contact.whatsappBody")}</p>
              <div className="mt-4">
                <WhatsAppCta messageKey="whatsapp.messageDefault" source="contact_page" />
              </div>
            </div>
            <div className="rounded-[var(--radius-lg)] bg-white p-6 ring-1 ring-[color:var(--color-border)]">
              <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-[color:var(--color-racing-blue)]">
                {t("contact.emailLabel")}
              </h3>
              <a
                href="mailto:hello@rctrack.ae"
                className="mt-2 inline-flex items-center gap-2 text-sm text-[color:var(--color-track-orange-600)]"
              >
                <Mail size={16} aria-hidden /> {t("contact.emailBody")}
              </a>
            </div>
            <div className="rounded-[var(--radius-lg)] bg-white p-6 ring-1 ring-[color:var(--color-border)]">
              <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-[color:var(--color-racing-blue)]">
                {t("contact.phoneLabel")}
              </h3>
              <a
                href="tel:+97140000000"
                className="mt-2 inline-flex items-center gap-2 text-sm text-[color:var(--color-track-orange-600)]"
              >
                <Phone size={16} aria-hidden /> +971 4 000 0000
              </a>
              <p className="mt-2 text-sm text-[color:var(--color-muted-foreground)]">{t("contact.phoneBody")}</p>
            </div>
          </div>
        </div>
      </section>
      <section className="section-y bg-[color:var(--color-mist)]">
        <div className="mx-auto max-w-3xl container-px">
          <SectionHeader heading={t("contact.formHeading")} align="center" />
          <div className="mt-8 rounded-[var(--radius-lg)] bg-white p-6 ring-1 ring-[color:var(--color-border)] sm:p-8">
            <ContactForm />
          </div>
        </div>
      </section>
      <section className="section-y">
        <div className="mx-auto max-w-7xl container-px">
          <MapEmbed />
        </div>
      </section>
    </>
  );
}
