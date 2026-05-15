"use client";

import { MessageCircle } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { whatsAppLink } from "@/features/_shared/whatsapp";
import { track } from "@/features/analytics/track";
import { cn } from "@/lib/utils";
import type { Locale } from "@/features/i18n/config";

interface Props {
  messageKey: string;
  messageVars?: Record<string, string>;
  label?: string;
  className?: string;
  source?: string;
}

export function WhatsAppCta({ messageKey, messageVars, label, className, source }: Props) {
  const t = useTranslations();
  const locale = useLocale() as Locale;
  const message = messageVars ? t(messageKey, messageVars) : t(messageKey);
  return (
    <a
      href={whatsAppLink(message, locale)}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track("whatsapp_click", { source: source ?? "cta" })}
      className={cn(
        "inline-flex h-12 items-center justify-center gap-2 rounded-[var(--radius-md)] bg-[color:var(--color-go-green)] px-5 font-semibold text-white hover:bg-emerald-700",
        className,
      )}
    >
      <MessageCircle size={18} aria-hidden />
      {label ?? t("whatsapp.floatingLabel")}
    </a>
  );
}
