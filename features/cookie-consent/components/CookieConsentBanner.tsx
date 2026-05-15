"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useConsent } from "../hooks/useConsent";
import { Switch } from "@/features/design-system";
import { Settings } from "lucide-react";

export function CookieConsentBanner() {
  const t = useTranslations("cookies");
  const { hasResponded, acceptAll, rejectAll, setConsent, consent } = useConsent();
  const [open, setOpen] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const [personalisation, setPersonalisation] = useState(false);

  useEffect(() => {
    setAnalytics(consent?.analytics ?? false);
    setMarketing(consent?.marketing ?? false);
    setPersonalisation(consent?.personalisation ?? false);
  }, [consent]);

  useEffect(() => {
    function onOpen() {
      setOpen(true);
    }
    window.addEventListener("open-cookie-prefs", onOpen);
    return () => window.removeEventListener("open-cookie-prefs", onOpen);
  }, []);

  if (hasResponded && !open) return null;

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-label={t("title")}
      className="fixed inset-x-0 bottom-0 z-50 border-t border-[color:var(--color-border)] bg-white shadow-[var(--shadow-lg)]"
    >
      <div className="mx-auto max-w-5xl px-5 py-5 md:px-8">
        {!open ? (
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <p className="max-w-2xl text-sm leading-relaxed text-[color:var(--color-foreground)]">
              {t("body")}
            </p>
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="inline-flex items-center gap-2 rounded-[var(--radius-md)] border border-[color:var(--color-border)] px-4 py-2 text-sm font-medium hover:bg-[color:var(--color-mist)]"
              >
                <Settings size={16} aria-hidden />
                {t("manage")}
              </button>
              <button
                type="button"
                onClick={rejectAll}
                className="inline-flex items-center rounded-[var(--radius-md)] border border-[color:var(--color-border)] px-4 py-2 text-sm font-medium hover:bg-[color:var(--color-mist)]"
              >
                {t("rejectAll")}
              </button>
              <button
                type="button"
                onClick={acceptAll}
                className="inline-flex items-center rounded-[var(--radius-md)] bg-[color:var(--color-track-orange)] px-4 py-2 text-sm font-semibold text-white hover:bg-[color:var(--color-track-orange-600)]"
              >
                {t("acceptAll")}
              </button>
            </div>
          </div>
        ) : (
          <div>
            <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold text-[color:var(--color-racing-blue)]">
              {t("title")}
            </h2>
            <p className="mt-2 text-sm text-[color:var(--color-muted-foreground)]">{t("body")}</p>
            <div className="mt-5 divide-y divide-[color:var(--color-border)] border-y border-[color:var(--color-border)]">
              <Row
                title={t("necessaryTitle")}
                body={t("necessaryBody")}
                control={
                  <span className="text-sm font-semibold text-[color:var(--color-go-green)]">●</span>
                }
              />
              <Row
                title={t("analyticsTitle")}
                body={t("analyticsBody")}
                control={
                  <Switch
                    id="analytics"
                    checked={analytics}
                    onChange={(e) => setAnalytics(e.currentTarget.checked)}
                  />
                }
              />
              <Row
                title={t("marketingTitle")}
                body={t("marketingBody")}
                control={
                  <Switch
                    id="marketing"
                    checked={marketing}
                    onChange={(e) => setMarketing(e.currentTarget.checked)}
                  />
                }
              />
              <Row
                title={t("personalisationTitle")}
                body={t("personalisationBody")}
                control={
                  <Switch
                    id="personalisation"
                    checked={personalisation}
                    onChange={(e) => setPersonalisation(e.currentTarget.checked)}
                  />
                }
              />
            </div>
            <div className="mt-5 flex flex-wrap justify-end gap-2">
              <button
                type="button"
                onClick={rejectAll}
                className="rounded-[var(--radius-md)] border border-[color:var(--color-border)] px-4 py-2 text-sm font-medium hover:bg-[color:var(--color-mist)]"
              >
                {t("rejectAll")}
              </button>
              <button
                type="button"
                onClick={() => {
                  setConsent({
                    necessary: true,
                    analytics,
                    marketing,
                    personalisation,
                  });
                  setOpen(false);
                }}
                className="rounded-[var(--radius-md)] border border-[color:var(--color-racing-blue)] px-4 py-2 text-sm font-semibold text-[color:var(--color-racing-blue)] hover:bg-[color:var(--color-racing-blue-50)]"
              >
                {t("savePreferences")}
              </button>
              <button
                type="button"
                onClick={() => {
                  acceptAll();
                  setOpen(false);
                }}
                className="rounded-[var(--radius-md)] bg-[color:var(--color-track-orange)] px-4 py-2 text-sm font-semibold text-white hover:bg-[color:var(--color-track-orange-600)]"
              >
                {t("acceptAll")}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Row({
  title,
  body,
  control,
}: {
  title: string;
  body: string;
  control: React.ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-4 py-3">
      <div>
        <p className="font-medium">{title}</p>
        <p className="text-sm text-[color:var(--color-muted-foreground)]">{body}</p>
      </div>
      <div className="shrink-0 pt-1">{control}</div>
    </div>
  );
}
