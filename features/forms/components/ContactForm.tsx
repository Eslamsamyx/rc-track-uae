"use client";

import { useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import { z } from "zod";
import { Field, FieldLabel, FieldError, Input, Textarea } from "@/features/design-system";
import { track } from "@/features/analytics/track";

const ContactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().regex(/^(\+971|0)5\d{8}$/),
  message: z.string().min(10).max(2000),
});

export function ContactForm() {
  const t = useTranslations();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [state, setState] = useState<"idle" | "submitting" | "success" | "error">("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});
    const data = new FormData(e.currentTarget);
    const result = ContactSchema.safeParse({
      name: data.get("name"),
      email: data.get("email"),
      phone: data.get("phone"),
      message: data.get("message"),
    });
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of result.error.issues) {
        const key = String(issue.path[0] ?? "");
        if (key && !fieldErrors[key]) {
          fieldErrors[key] =
            key === "message"
              ? t("forms.errors.required")
              : t(`forms.errors.${key}` as Parameters<typeof t>[0]);
        }
      }
      setErrors(fieldErrors);
      return;
    }
    setState("submitting");
    try {
      // Replace with Formspree endpoint when configured.
      await new Promise((r) => setTimeout(r, 700));
      track("contact_submit", { status: "ok" });
      setState("success");
      e.currentTarget.reset();
    } catch {
      setState("error");
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-4">
      <Field>
        <FieldLabel htmlFor="contact-name" required>
          {t("forms.fields.name")}
        </FieldLabel>
        <Input id="contact-name" name="name" autoComplete="name" required invalid={Boolean(errors.name)} />
        <FieldError>{errors.name}</FieldError>
      </Field>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field>
          <FieldLabel htmlFor="contact-email" required>
            {t("forms.fields.email")}
          </FieldLabel>
          <Input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            invalid={Boolean(errors.email)}
          />
          <FieldError>{errors.email}</FieldError>
        </Field>
        <Field>
          <FieldLabel htmlFor="contact-phone" required>
            {t("forms.fields.phone")}
          </FieldLabel>
          <Input
            id="contact-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            required
            placeholder={t("forms.placeholders.phone")}
            invalid={Boolean(errors.phone)}
          />
          <FieldError>{errors.phone}</FieldError>
        </Field>
      </div>
      <Field>
        <FieldLabel htmlFor="contact-message" required>
          {t("forms.fields.message")}
        </FieldLabel>
        <Textarea
          id="contact-message"
          name="message"
          rows={6}
          placeholder={t("forms.placeholders.message")}
          required
          invalid={Boolean(errors.message)}
        />
        <FieldError>{errors.message}</FieldError>
      </Field>
      <button
        type="submit"
        disabled={state === "submitting"}
        className="inline-flex h-12 items-center justify-center rounded-[var(--radius-md)] bg-[color:var(--color-track-orange)] px-5 font-semibold text-white hover:bg-[color:var(--color-track-orange-600)] disabled:opacity-60"
      >
        {state === "submitting" ? t("forms.submitting") : t("common.submit")}
      </button>
      {state === "success" ? (
        <p role="status" className="text-sm text-[color:var(--color-go-green)]">
          {t("forms.submitSuccess")}
        </p>
      ) : null}
      {state === "error" ? (
        <p role="alert" className="text-sm text-[color:var(--color-stop-red)]">
          {t("forms.submitError")}
        </p>
      ) : null}
    </form>
  );
}
