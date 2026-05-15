"use client";

import { useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import { parseNewsletter } from "../schemas/newsletter.schema";
import { track } from "@/features/analytics/track";
import { cn } from "@/lib/utils";

type State = "idle" | "loading" | "success" | "error";

export function NewsletterEmbed({
  source,
  theme = "light",
  className,
}: {
  source: string;
  theme?: "light" | "dark";
  className?: string;
}) {
  const t = useTranslations();
  const [state, setState] = useState<State>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMsg("");
    const formData = new FormData(e.currentTarget);
    const parsed = parseNewsletter({ email: formData.get("email") });
    if (!parsed.ok) {
      setErrorMsg(parsed.error);
      setState("error");
      return;
    }

    setState("loading");
    const url = process.env.NEXT_PUBLIC_MAILCHIMP_FORM_ACTION_URL;
    if (!url) {
      // Without Mailchimp configured, simulate success to keep the UX working.
      setTimeout(() => {
        setState("success");
        track("newsletter_signup", { source, simulated: true });
      }, 600);
      return;
    }

    try {
      const body = new FormData();
      body.append("EMAIL", parsed.value.email);
      body.append("SOURCE", source);
      await fetch(url, { method: "POST", mode: "no-cors", body });
      setState("success");
      track("newsletter_signup", { source });
    } catch {
      setState("error");
      setErrorMsg(t("footer.newsletterError"));
    }
  }

  const inputColors =
    theme === "dark"
      ? "bg-white/10 text-white placeholder:text-white/60 border-white/20 focus:border-white"
      : "bg-white text-[color:var(--color-foreground)] placeholder:text-[color:var(--color-muted-foreground)] border-[color:var(--color-border)] focus:border-[color:var(--color-track-orange)]";

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className={cn("flex flex-col gap-2", className)}
      aria-label="Newsletter signup"
    >
      <div className="flex flex-col gap-2 sm:flex-row">
        <label htmlFor={`newsletter-email-${source}`} className="sr-only">
          Email
        </label>
        <input
          id={`newsletter-email-${source}`}
          type="email"
          name="email"
          required
          placeholder={t("footer.newsletterPlaceholder")}
          className={cn(
            "h-12 flex-1 rounded-[var(--radius-md)] border px-4 text-base outline-none focus:ring-2 focus:ring-[color:var(--color-track-orange)]/30",
            inputColors,
          )}
        />
        <button
          type="submit"
          disabled={state === "loading"}
          className="inline-flex h-12 items-center justify-center rounded-[var(--radius-md)] bg-[color:var(--color-track-orange)] px-5 font-semibold text-white transition-colors hover:bg-[color:var(--color-track-orange-600)] disabled:opacity-60"
        >
          {state === "loading" ? "..." : t("footer.newsletterSubmit")}
        </button>
      </div>
      {state === "success" ? (
        <p role="status" className={theme === "dark" ? "text-emerald-300" : "text-emerald-600"}>
          {t("footer.newsletterSuccess")}
        </p>
      ) : null}
      {state === "error" ? (
        <p role="alert" className={theme === "dark" ? "text-red-300" : "text-red-600"}>
          {errorMsg || t("footer.newsletterError")}
        </p>
      ) : null}
    </form>
  );
}
