import { forwardRef, type InputHTMLAttributes, type TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const inputClass =
  "block w-full rounded-[var(--radius-md)] border border-[color:var(--color-border)] bg-white px-4 py-3 text-base text-[color:var(--color-foreground)] placeholder:text-[color:var(--color-muted-foreground)] focus:border-[color:var(--color-track-orange)] focus:outline-none focus:ring-2 focus:ring-[color:var(--color-track-orange)]/30 disabled:opacity-50 disabled:cursor-not-allowed";

export const Input = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement> & { invalid?: boolean }
>(({ className, invalid, ...props }, ref) => (
  <input
    ref={ref}
    aria-invalid={invalid || undefined}
    className={cn(inputClass, invalid && "border-[color:var(--color-stop-red)] focus:border-[color:var(--color-stop-red)] focus:ring-[color:var(--color-stop-red)]/30", className)}
    {...props}
  />
));
Input.displayName = "Input";

export const Textarea = forwardRef<
  HTMLTextAreaElement,
  TextareaHTMLAttributes<HTMLTextAreaElement> & { invalid?: boolean }
>(({ className, invalid, rows = 5, ...props }, ref) => (
  <textarea
    ref={ref}
    rows={rows}
    aria-invalid={invalid || undefined}
    className={cn(inputClass, "resize-y", invalid && "border-[color:var(--color-stop-red)]", className)}
    {...props}
  />
));
Textarea.displayName = "Textarea";

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: ReadonlyArray<{ value: string; label: string }>;
  placeholder?: string;
  invalid?: boolean;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, options, placeholder, invalid, ...props }, ref) => (
    <select
      ref={ref}
      aria-invalid={invalid || undefined}
      className={cn(
        inputClass,
        "pr-10 appearance-none bg-[length:14px_14px] bg-[right_0.75rem_center] bg-no-repeat",
        invalid && "border-[color:var(--color-stop-red)]",
        className,
      )}
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%236b7280'><path d='M7 10l5 5 5-5z'/></svg>\")",
      }}
      {...props}
    >
      {placeholder ? (
        <option value="" disabled hidden>
          {placeholder}
        </option>
      ) : null}
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  ),
);
Select.displayName = "Select";

export const Checkbox = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement> & { label?: string }
>(({ className, label, id, ...props }, ref) => (
  <label className="inline-flex items-start gap-3 cursor-pointer" htmlFor={id}>
    <input
      type="checkbox"
      id={id}
      ref={ref}
      className={cn(
        "mt-0.5 h-5 w-5 rounded border-[color:var(--color-border)] text-[color:var(--color-track-orange)] focus:ring-[color:var(--color-track-orange)] cursor-pointer",
        className,
      )}
      {...props}
    />
    {label ? <span className="text-sm text-[color:var(--color-foreground)]">{label}</span> : null}
  </label>
));
Checkbox.displayName = "Checkbox";

export const Switch = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement> & { label?: string }
>(({ className, label, id, checked, ...props }, ref) => (
  <label className="inline-flex items-center gap-3 cursor-pointer" htmlFor={id}>
    <span className="relative inline-block">
      <input
        ref={ref}
        type="checkbox"
        id={id}
        checked={checked}
        className={cn("peer sr-only", className)}
        {...props}
      />
      <span
        aria-hidden
        className="block h-6 w-11 rounded-full bg-[color:var(--color-border)] transition-colors peer-checked:bg-[color:var(--color-track-orange)]"
      />
      <span
        aria-hidden
        className={cn(
          "absolute top-0.5 inline-block h-5 w-5 rounded-full bg-white shadow transition-transform",
          checked ? "translate-x-5" : "translate-x-0.5",
          "rtl:[--tw-translate-x:calc(-1*var(--tx))]",
        )}
        style={{ insetInlineStart: checked ? "1.375rem" : "0.125rem" }}
      />
    </span>
    {label ? <span className="text-sm">{label}</span> : null}
  </label>
));
Switch.displayName = "Switch";

export interface RadioOption {
  value: string;
  label: string;
}

export function RadioGroup({
  options,
  name,
  value,
  onChange,
}: {
  options: ReadonlyArray<RadioOption>;
  name: string;
  value?: string;
  onChange?: (val: string) => void;
}) {
  return (
    <div role="radiogroup" className="flex flex-col gap-2">
      {options.map((opt) => (
        <label key={opt.value} className="inline-flex items-center gap-3 cursor-pointer">
          <input
            type="radio"
            name={name}
            value={opt.value}
            checked={value === opt.value}
            onChange={(e) => onChange?.(e.target.value)}
            className="h-5 w-5 border-[color:var(--color-border)] text-[color:var(--color-track-orange)]"
          />
          <span className="text-sm">{opt.label}</span>
        </label>
      ))}
    </div>
  );
}
