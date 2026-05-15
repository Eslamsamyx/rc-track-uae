import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Hero, Breadcrumb, SectionHeader } from "@/features/design-system";
import { BookingTrigger } from "@/features/booking/components/BookingTrigger";
import { getEvents } from "@/features/content/events-data";
import { isLocale, type Locale } from "@/features/i18n/config";
import { Calendar, MapPin } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

export function generateStaticParams() {
  const events = getEvents("en");
  return events.flatMap((e) =>
    (["en", "ar"] as const).map((locale) => ({ locale, slug: e.slug })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const event = getEvents(locale).find((e) => e.slug === slug);
  if (!event) return {};
  return { title: event.title, description: event.description };
}

export default async function EventPage({ params }: Props) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const typedLocale: Locale = locale;
  setRequestLocale(typedLocale);
  const event = getEvents(typedLocale).find((e) => e.slug === slug);
  if (!event) notFound();
  const t = await getTranslations();
  return (
    <>
      <Hero
        eyebrow={event.category.replace("-", " ")}
        headline={event.title}
        body={event.description}
        primaryCta={<BookingTrigger service="trial" variant="primary" labelKey="common.bookNow" />}
      />
      <section className="section-y">
        <div className="mx-auto max-w-3xl container-px">
          <Breadcrumb
            items={[
              { label: t("nav.home"), href: `/${typedLocale}` },
              { label: t("nav.events"), href: `/${typedLocale}/events` },
              { label: event.title },
            ]}
          />
          <SectionHeader heading={event.title} className="mt-8" />
          <dl className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="flex items-center gap-3 rounded-[var(--radius-md)] bg-white p-4 ring-1 ring-[color:var(--color-border)]">
              <Calendar size={18} aria-hidden />
              <span>{formatDate(event.date, typedLocale)}</span>
            </div>
            <div className="flex items-center gap-3 rounded-[var(--radius-md)] bg-white p-4 ring-1 ring-[color:var(--color-border)]">
              <MapPin size={18} aria-hidden />
              <span>{event.location}</span>
            </div>
          </dl>
          <p className="mt-8 text-base text-[color:var(--color-muted-foreground)] leading-relaxed">
            {event.description}
          </p>
        </div>
      </section>
    </>
  );
}
