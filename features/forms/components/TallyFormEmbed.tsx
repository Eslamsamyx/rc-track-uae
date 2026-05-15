"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";

declare global {
  interface Window {
    Tally?: { loadEmbeds?: () => void };
  }
}

export function TallyFormEmbed({
  formId,
  height = 600,
  title,
}: {
  formId: string | undefined;
  height?: number;
  title?: string;
}) {
  const t = useTranslations();
  useEffect(() => {
    if (!formId) return;
    if (window.Tally?.loadEmbeds) {
      window.Tally.loadEmbeds();
      return;
    }
    const existing = document.querySelector<HTMLScriptElement>(
      "script[src*='tally.so/widgets/embed.js']",
    );
    if (existing) {
      existing.addEventListener("load", () => window.Tally?.loadEmbeds?.());
      return;
    }
    const script = document.createElement("script");
    script.src = "https://tally.so/widgets/embed.js";
    script.async = true;
    document.body.appendChild(script);
  }, [formId]);

  if (!formId) {
    return (
      <div className="rounded-[var(--radius-md)] border border-dashed border-[color:var(--color-border)] bg-[color:var(--color-mist)] p-6">
        <p className="text-sm text-[color:var(--color-muted-foreground)]">
          {t("common.comingSoon")}
        </p>
      </div>
    );
  }

  return (
    <iframe
      data-tally-src={`https://tally.so/embed/${formId}?alignLeft=1&transparentBackground=1&hideTitle=1`}
      width="100%"
      height={height}
      title={title ?? "Form"}
      className="w-full"
    />
  );
}
