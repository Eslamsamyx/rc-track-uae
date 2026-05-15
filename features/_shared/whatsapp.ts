import type { Locale } from "@/features/i18n/config";

const DEFAULT_NUMBER = "971501234567";

export function whatsAppLink(message: string, _locale: Locale = "en"): string {
  void _locale;
  const number =
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/[^0-9]/g, "") ||
    DEFAULT_NUMBER;
  const text = encodeURIComponent(message);
  return `https://wa.me/${number}?text=${text}`;
}

export function whatsAppNumberForDisplay(): string {
  const raw = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? DEFAULT_NUMBER;
  const digits = raw.replace(/[^0-9]/g, "");
  if (digits.length < 10) return raw;
  const country = digits.slice(0, 3);
  const op = digits.slice(3, 5);
  const part1 = digits.slice(5, 8);
  const part2 = digits.slice(8);
  return `+${country} ${op} ${part1} ${part2}`;
}
