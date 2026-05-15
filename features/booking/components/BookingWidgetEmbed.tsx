"use client";

import { useEffect, useId, useRef } from "react";
import { useLocale } from "next-intl";
import { track } from "@/features/analytics/track";
import type { Locale } from "@/features/i18n/config";
import type { ServiceId } from "../schemas/bookingRequest.schema";
import { SIMPLYBOOK_SERVICE_IDS } from "../schemas/bookingRequest.schema";

declare global {
  interface Window {
    SimplybookWidget?: new (config: Record<string, unknown>) => {
      destroy?: () => void;
    };
  }
}

interface Props {
  service?: ServiceId;
}

export function BookingWidgetEmbed({ service }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const id = useId();
  const containerId = `simplybook-${id.replace(/[:]/g, "-")}`;
  const locale = useLocale() as Locale;
  const company = process.env.NEXT_PUBLIC_SIMPLYBOOK_COMPANY_LOGIN;
  const serviceId = service ? SIMPLYBOOK_SERVICE_IDS[service] : undefined;

  useEffect(() => {
    if (!company) return;
    track("booking_start", { service: service ?? "unknown" });

    const script = document.createElement("script");
    script.src = "https://widget.simplybook.me/v2/widget/widget.js";
    script.async = true;
    document.body.appendChild(script);

    let widget: { destroy?: () => void } | null = null;

    function init() {
      if (!window.SimplybookWidget || !containerRef.current) return;
      widget = new window.SimplybookWidget({
        widget_type: "iframe",
        url: `https://${company}.simplybook.me`,
        theme: "minimalistic",
        theme_settings: {
          timeline_modern_display: "as_slots",
          sb_base_color: "#F26B1F",
          body_bg_color: "#FFFFFF",
        },
        timeline: "modern",
        datepicker: "top_calendar",
        is_rtl: locale === "ar",
        app_config: serviceId ? { predefined: { service: serviceId } } : {},
        container_id: containerId,
      });
    }

    script.onload = init;

    return () => {
      widget?.destroy?.();
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, [company, containerId, locale, service, serviceId]);

  if (!company) {
    return (
      <div className="rounded-[var(--radius-md)] border border-dashed border-[color:var(--color-border)] bg-[color:var(--color-mist)] p-8 text-center">
        <p className="text-sm text-[color:var(--color-muted-foreground)]">
          The booking widget will appear here once SimplyBook.me is configured.
        </p>
      </div>
    );
  }

  return <div id={containerId} ref={containerRef} className="min-h-[600px] w-full" />;
}
