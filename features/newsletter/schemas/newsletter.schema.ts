import { z } from "zod";

export const NewsletterSchema = z.object({
  email: z.string().trim().email("That email looks off."),
});

export type NewsletterInput = z.infer<typeof NewsletterSchema>;

export function parseNewsletter(input: unknown):
  | { ok: true; value: NewsletterInput }
  | { ok: false; error: string } {
  const parsed = NewsletterSchema.safeParse(input);
  if (parsed.success) return { ok: true, value: parsed.data };
  return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid email" };
}
