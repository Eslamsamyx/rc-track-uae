import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

const button = cva(
  "inline-flex items-center justify-center gap-2 font-semibold transition-colors duration-200 ease-[var(--ease-standard)] disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-track-orange)] focus-visible:ring-offset-2 whitespace-nowrap",
  {
    variants: {
      variant: {
        primary:
          "bg-[color:var(--color-track-orange)] text-[color:var(--color-pit-white)] hover:bg-[color:var(--color-track-orange-600)]",
        secondary:
          "bg-[color:var(--color-racing-blue)] text-[color:var(--color-pit-white)] hover:bg-[color:var(--color-racing-blue-700)]",
        outline:
          "border border-[color:var(--color-border)] bg-transparent text-[color:var(--color-foreground)] hover:bg-[color:var(--color-mist)]",
        ghost:
          "bg-transparent text-[color:var(--color-foreground)] hover:bg-[color:var(--color-mist)]",
        link: "bg-transparent text-[color:var(--color-track-orange)] underline-offset-4 hover:underline px-0",
        white:
          "bg-white text-[color:var(--color-racing-blue)] hover:bg-white/90",
      },
      size: {
        sm: "h-9 px-3 text-sm rounded-[var(--radius-sm)]",
        md: "h-11 px-5 text-base rounded-[var(--radius-md)]",
        lg: "h-14 px-7 text-lg rounded-[var(--radius-md)]",
        xl: "h-16 px-8 text-xl rounded-[var(--radius-lg)]",
        icon: "h-11 w-11 rounded-[var(--radius-md)]",
      },
      fullWidth: {
        true: "w-full",
        false: "",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      fullWidth: false,
    },
  },
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof button> {
  loading?: boolean;
  iconStart?: ReactNode;
  iconEnd?: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      loading,
      disabled,
      iconStart,
      iconEnd,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        className={cn(button({ variant, size, fullWidth }), className)}
        disabled={disabled || loading}
        aria-busy={loading || undefined}
        {...props}
      >
        {loading ? (
          <span
            className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-r-transparent"
            aria-hidden
          />
        ) : (
          iconStart
        )}
        <span>{children}</span>
        {!loading && iconEnd}
      </button>
    );
  },
);
Button.displayName = "Button";
