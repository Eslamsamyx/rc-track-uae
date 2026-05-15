"use client";

import { useState, type FormEvent } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Field, FieldLabel, FieldError, Input } from "@/features/design-system";
import { track } from "@/features/analytics/track";
import { z } from "zod";
import type { MembershipTierId } from "@/features/_shared/branded";

const Schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().regex(/^(\+971|0)5\d{8}$/),
  consent: z.literal(true),
});

const stripeLinkByTier: Record<MembershipTierId, string | undefined> = {
  bronze: process.env.NEXT_PUBLIC_STRIPE_LINK_MEMBERSHIP_BRONZE,
  silver: process.env.NEXT_PUBLIC_STRIPE_LINK_MEMBERSHIP_SILVER,
  gold: process.env.NEXT_PUBLIC_STRIPE_LINK_MEMBERSHIP_GOLD,
};

const fallbackByTier: Record<MembershipTierId, string> = {
  bronze: "https://buy.stripe.com/test_bronze",
  silver: "https://buy.stripe.com/test_silver",
  gold: "https://buy.stripe.com/test_gold",
};

export function MembershipSignupForm({ tier }: { tier: MembershipTierId }) {
  const t = useTranslations();
  const locale = useLocale();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setErrors({});
    const data = new FormData(e.currentTarget);
    const result = Schema.safeParse({
      name: data.get("name"),
      email: data.get("email"),
      phone: data.get("phone"),
      consent: data.get("consent") === "on",
    });
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of result.error.issues) {
        const key = String(issue.path[0] ?? "");
        if (key && !fieldErrors[key]) {
          fieldErrors[key] = t(`forms.errors.${key === "consent" ? "consent" : key}`);
        }
      }
      setErrors(fieldErrors);
      setSubmitting(false);
      return;
    }
    track("membership_join_start", { tier, locale });
    const link = stripeLinkByTier[tier] ?? fallbackByTier[tier];
    if (link) {
      window.location.href = link;
    } else {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5" noValidate>
      <Field>
        <FieldLabel htmlFor="name" required>
          {t("forms.fields.name")}
        </FieldLabel>
        <Input id="name" name="name" autoComplete="name" required invalid={Boolean(errors.name)} />
        <FieldError>{errors.name}</FieldError>
      </Field>
      <Field>
        <FieldLabel htmlFor="email" required>
          {t("forms.fields.email")}
        </FieldLabel>
        <Input id="email" name="email" type="email" autoComplete="email" required invalid={Boolean(errors.email)} />
        <FieldError>{errors.email}</FieldError>
      </Field>
      <Field>
        <FieldLabel htmlFor="phone" required>
          {t("forms.fields.phone")}
        </FieldLabel>
        <Input
          id="phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          required
          placeholder={t("forms.placeholders.phone")}
          invalid={Boolean(errors.phone)}
        />
        <FieldError>{errors.phone}</FieldError>
      </Field>
      <Field>
        <label className="inline-flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            name="consent"
            required
            className="mt-1 h-5 w-5 rounded border-[color:var(--color-border)] text-[color:var(--color-track-orange)]"
          />
          <span className="text-sm text-[color:var(--color-foreground)]">
            {t("forms.fields.consent")}
          </span>
        </label>
        <FieldError>{errors.consent}</FieldError>
      </Field>
      <button
        type="submit"
        disabled={submitting}
        className="inline-flex h-12 items-center justify-center rounded-[var(--radius-md)] bg-[color:var(--color-track-orange)] px-5 font-semibold text-white hover:bg-[color:var(--color-track-orange-600)] disabled:opacity-60"
      >
        {submitting ? t("forms.submitting") : t("memberships.tiers.joinSilver")}
      </button>
      <p className="text-xs text-[color:var(--color-muted-foreground)]">{t("memberships.joinIntro")}</p>
    </form>
  );
}
