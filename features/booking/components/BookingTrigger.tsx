"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Modal } from "@/features/design-system";
import { BookingWidgetEmbed } from "./BookingWidgetEmbed";
import { cn } from "@/lib/utils";
import type { ServiceId } from "../schemas/bookingRequest.schema";

interface Props {
  service?: ServiceId;
  variant?: "primary" | "secondary" | "outline" | "white";
  size?: "sm" | "md" | "lg";
  labelKey?: string;
  className?: string;
}

const variantClasses: Record<NonNullable<Props["variant"]>, string> = {
  primary:
    "bg-[color:var(--color-track-orange)] text-white hover:bg-[color:var(--color-track-orange-600)]",
  secondary:
    "bg-[color:var(--color-racing-blue)] text-white hover:bg-[color:var(--color-racing-blue-700)]",
  outline:
    "border border-[color:var(--color-border)] bg-transparent text-[color:var(--color-foreground)] hover:bg-[color:var(--color-mist)]",
  white: "bg-white text-[color:var(--color-racing-blue)] hover:bg-white/90",
};

const sizeClasses: Record<NonNullable<Props["size"]>, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-base",
  lg: "h-14 px-7 text-lg",
};

export function BookingTrigger({
  service,
  variant = "primary",
  size = "md",
  labelKey = "common.bookTrial",
  className,
}: Props) {
  const t = useTranslations();
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-[var(--radius-md)] font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-track-orange)] focus-visible:ring-offset-2",
          variantClasses[variant],
          sizeClasses[size],
          className,
        )}
      >
        {t(labelKey)}
      </button>
      <Modal open={open} onClose={() => setOpen(false)} title={t("booking.title")}>
        <BookingWidgetEmbed service={service} />
      </Modal>
    </>
  );
}
