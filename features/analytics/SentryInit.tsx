"use client";

import { useEffect } from "react";

let initialized = false;

export function SentryInit() {
  useEffect(() => {
    if (initialized) return;
    const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN;
    if (!dsn) return;
    initialized = true;
    void import("@sentry/nextjs").then((Sentry) => {
      Sentry.init({
        dsn,
        tracesSampleRate: 0.1,
        replaysSessionSampleRate: 0,
        replaysOnErrorSampleRate: 0.1,
        sendDefaultPii: false,
        beforeSend(event) {
          if (event.request) {
            delete event.request.cookies;
          }
          if (event.user) {
            event.user = { id: event.user.id };
          }
          return event;
        },
      });
    });
  }, []);

  return null;
}
