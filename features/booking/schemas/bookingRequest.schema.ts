import { z } from "zod";

export const BookingRequestSchema = z.object({
  service: z.enum([
    "trial",
    "open-practice",
    "birthday-bronze",
    "birthday-silver",
    "birthday-gold",
    "academy-beginner",
    "academy-intermediate",
    "academy-advanced",
    "corporate-enquiry",
  ]),
  name: z.string().trim().min(2, "Please enter your full name."),
  email: z.string().trim().email("That email looks off."),
  phone: z.string().regex(/^(\+971|0)5\d{8}$/, "Use UAE format like +971501234567."),
  preferredDate: z.string().optional(),
  notes: z.string().max(2000).optional(),
});

export type BookingRequest = z.infer<typeof BookingRequestSchema>;

export type ServiceId = BookingRequest["service"];

export const SIMPLYBOOK_SERVICE_IDS: Record<ServiceId, number> = {
  trial: 1,
  "open-practice": 2,
  "birthday-bronze": 3,
  "birthday-silver": 4,
  "birthday-gold": 5,
  "academy-beginner": 6,
  "academy-intermediate": 7,
  "academy-advanced": 8,
  "corporate-enquiry": 9,
};

export function parseBookingRequest(
  input: unknown,
):
  | { ok: true; value: BookingRequest }
  | { ok: false; error: string } {
  const parsed = BookingRequestSchema.safeParse(input);
  if (parsed.success) return { ok: true, value: parsed.data };
  return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid input" };
}
