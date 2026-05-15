"use client";

import { useLocale, useTranslations } from "next-intl";
import { MessageCircle } from "lucide-react";
import { whatsAppLink } from "@/features/_shared/whatsapp";
import type { Locale } from "@/features/i18n/config";
import { track } from "@/features/analytics/track";

export function WhatsAppFloatingButton() {
  const t = useTranslations();
  const locale = useLocale() as Locale;
  const message = t("whatsapp.messageDefault");

  return (
    <a
      href={whatsAppLink(message, locale)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t("whatsapp.floatingLabel")}
      title={t("whatsapp.tooltip")}
      onClick={() => track("whatsapp_click", { source: "floating_button" })}
      className="fixed bottom-6 end-6 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[color:var(--color-go-green)] text-white shadow-[var(--shadow-lg)] hover:bg-emerald-600 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-300"
    >
      <MessageCircle size={26} aria-hidden />
      <span className="sr-only">{t("whatsapp.floatingLabel")}</span>
    </a>
  );
}
