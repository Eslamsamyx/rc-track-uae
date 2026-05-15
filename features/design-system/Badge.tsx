import { cva, type VariantProps } from "class-variance-authority";
import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const badge = cva(
  "inline-flex items-center gap-1.5 font-medium whitespace-nowrap",
  {
    variants: {
      variant: {
        default: "bg-[color:var(--color-mist)] text-[color:var(--color-foreground)]",
        primary: "bg-[color:var(--color-track-orange-50)] text-[color:var(--color-track-orange-600)]",
        secondary: "bg-[color:var(--color-racing-blue-50)] text-[color:var(--color-racing-blue)]",
        success: "bg-emerald-50 text-emerald-700",
        warning: "bg-amber-50 text-amber-700",
        danger: "bg-red-50 text-red-700",
      },
      size: {
        sm: "h-6 px-2 text-xs rounded-[var(--radius-sm)]",
        md: "h-7 px-3 text-sm rounded-[var(--radius-md)]",
        lg: "h-8 px-4 text-sm rounded-[var(--radius-md)]",
      },
      shape: {
        rect: "",
        pill: "rounded-[var(--radius-pill)]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      shape: "rect",
    },
  },
);

export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badge> {}

export function Badge({ className, variant, size, shape, ...props }: BadgeProps) {
  return <span className={cn(badge({ variant, size, shape }), className)} {...props} />;
}

export function Pill(props: BadgeProps) {
  return <Badge {...props} shape="pill" />;
}

export function Chip({
  active,
  className,
  ...props
}: HTMLAttributes<HTMLButtonElement> & { active?: boolean }) {
  return (
    <button
      type="button"
      className={cn(
        "inline-flex h-9 items-center gap-1.5 rounded-[var(--radius-pill)] border px-4 text-sm font-medium transition-colors",
        active
          ? "border-[color:var(--color-track-orange)] bg-[color:var(--color-track-orange-50)] text-[color:var(--color-track-orange-600)]"
          : "border-[color:var(--color-border)] bg-white text-[color:var(--color-foreground)] hover:bg-[color:var(--color-mist)]",
        className,
      )}
      aria-pressed={active}
      {...props}
    />
  );
}
