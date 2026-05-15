"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { CheckCircle } from "lucide-react";
import Link from "next/link";
import { whatsAppLink } from "@/features/_shared/whatsapp";
import { track } from "@/features/analytics/track";
import type { Locale } from "@/features/i18n/config";

export function BookingConfirmedCard() {
  const t = useTranslations();
  const locale = useLocale() as Locale;
  const [service, setService] = useState<string | null>(null);
  const [value, setValue] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const svc = params.get("service");
    const val = params.get("value");
    setService(svc);
    setValue(val);
    track("booking_complete", {
      service: svc ?? "unknown",
      value: val ? Number(val) : 0,
    });
  }, []);

  return (
    <div className="mx-auto max-w-2xl rounded-[var(--radius-lg)] border border-[color:var(--color-border)] bg-white p-10 shadow-[var(--shadow-md)]">
      <div className="flex items-center justify-center">
        <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
          <CheckCircle className="text-[color:var(--color-go-green)]" size={36} aria-hidden />
        </span>
      </div>
      <h1 className="mt-6 text-center font-[family-name:var(--font-display)] text-3xl font-bold text-[color:var(--color-racing-blue)]">
        {t("confirmed.title")}
      </h1>
      <p className="mt-3 text-center text-[color:var(--color-muted-foreground)]">
        {t("confirmed.body")}
      </p>
      {service ? (
        <dl className="mt-6 grid grid-cols-1 gap-2 rounded-[var(--radius-md)] bg-[color:var(--color-mist)] p-4 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-[color:var(--color-muted-foreground)]">Service</dt>
            <dd className="font-medium">{service}</dd>
          </div>
          {value ? (
            <div>
              <dt className="text-[color:var(--color-muted-foreground)]">Total</dt>
              <dd className="font-medium">AED {value}</dd>
            </div>
          ) : null}
        </dl>
      ) : null}
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <a
          href={whatsAppLink(t("whatsapp.messageDefault"), locale)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-12 items-center justify-center rounded-[var(--radius-md)] bg-[color:var(--color-go-green)] px-5 font-semibold text-white"
        >
          {t("confirmed.ctaWhatsapp")}
        </a>
        <Link
          href={`/${locale}`}
          className="inline-flex h-12 items-center justify-center rounded-[var(--radius-md)] border border-[color:var(--color-border)] px-5 font-semibold"
        >
          {t("confirmed.ctaHome")}
        </Link>
      </div>
    </div>
  );
}
