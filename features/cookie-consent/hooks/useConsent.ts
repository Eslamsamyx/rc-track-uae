"use client";

import { useEffect, useState, useCallback } from "react";
import { DEFAULT_CONSENT, STORAGE_KEY, type ConsentState } from "../types";

export function useConsent(): {
  consent: ConsentState | null;
  hasResponded: boolean;
  setConsent: (next: ConsentState) => void;
  acceptAll: () => void;
  rejectAll: () => void;
  reset: () => void;
} {
  const [state, setState] = useState<ConsentState | null>(null);
  const [hasResponded, setHasResponded] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as ConsentState;
        setState(parsed);
        setHasResponded(true);
        return;
      }
    } catch {
      // ignore
    }
    setState(DEFAULT_CONSENT);
    setHasResponded(false);
  }, []);

  const persist = useCallback((next: ConsentState) => {
    setState(next);
    setHasResponded(true);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      window.dispatchEvent(new CustomEvent("consent-changed", { detail: next }));
    } catch {
      // ignore
    }
  }, []);

  return {
    consent: state,
    hasResponded,
    setConsent: persist,
    acceptAll: () =>
      persist({ necessary: true, analytics: true, marketing: true, personalisation: true }),
    rejectAll: () => persist({ ...DEFAULT_CONSENT }),
    reset: () => {
      try {
        window.localStorage.removeItem(STORAGE_KEY);
      } catch {
        // ignore
      }
      setState(DEFAULT_CONSENT);
      setHasResponded(false);
    },
  };
}
