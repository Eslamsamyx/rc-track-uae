import type { ReactNode, LabelHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function FieldLabel({
  className,
  required,
  children,
  ...props
}: LabelHTMLAttributes<HTMLLabelElement> & { required?: boolean }) {
  return (
    <label
      className={cn(
        "block text-sm font-medium text-[color:var(--color-foreground)] mb-1.5",
        className,
      )}
      {...props}
    >
      {children}
      {required ? (
        <span aria-hidden className="ml-1 text-[color:var(--color-stop-red)]">
          *
        </span>
      ) : null}
    </label>
  );
}

export function FieldError({ children }: { children?: ReactNode }) {
  if (!children) return null;
  return (
    <p
      role="alert"
      className="mt-1.5 text-sm text-[color:var(--color-stop-red)]"
    >
      {children}
    </p>
  );
}

export function FormHelper({ children }: { children?: ReactNode }) {
  if (!children) return null;
  return (
    <p className="mt-1.5 text-sm text-[color:var(--color-muted-foreground)]">
      {children}
    </p>
  );
}

export function Field({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("flex flex-col", className)}>{children}</div>;
}
