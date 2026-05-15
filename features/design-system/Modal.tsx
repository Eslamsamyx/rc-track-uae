"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

interface BaseProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  className?: string;
}

function useDismiss(open: boolean, onClose: () => void) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose]);
}

export function Modal({ open, onClose, title, children, className }: BaseProps) {
  const ref = useRef<HTMLDivElement>(null);
  useDismiss(open, onClose);

  useEffect(() => {
    if (open && ref.current) {
      ref.current.focus();
    }
  }, [open]);

  if (!open) return null;
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
    >
      <button
        type="button"
        aria-label="Close dialog"
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in"
      />
      <div
        ref={ref}
        tabIndex={-1}
        className={cn(
          "relative w-full max-w-3xl max-h-[90vh] overflow-auto bg-white sm:rounded-[var(--radius-lg)] shadow-[var(--shadow-lg)] outline-none",
          className,
        )}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between bg-white px-6 py-4 border-b border-[color:var(--color-border)]">
          {title ? (
            <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold text-[color:var(--color-racing-blue)]">
              {title}
            </h2>
          ) : (
            <span />
          )}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="-mr-2 inline-flex h-10 w-10 items-center justify-center rounded-full text-[color:var(--color-foreground)] hover:bg-[color:var(--color-mist)]"
          >
            <X size={20} aria-hidden />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

export function Drawer({ open, onClose, title, children, className }: BaseProps & { side?: "start" | "end" }) {
  useDismiss(open, onClose);
  if (!open) return null;
  return (
    <div role="dialog" aria-modal="true" aria-label={title} className="fixed inset-0 z-50">
      <button
        type="button"
        aria-label="Close drawer"
        onClick={onClose}
        className="absolute inset-0 bg-black/60"
      />
      <div
        className={cn(
          "absolute inset-y-0 end-0 flex w-[85vw] max-w-sm flex-col bg-white shadow-[var(--shadow-lg)]",
          className,
        )}
      >
        <div className="flex items-center justify-between border-b border-[color:var(--color-border)] px-5 py-4">
          {title ? <h2 className="text-lg font-semibold">{title}</h2> : <span />}
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full hover:bg-[color:var(--color-mist)]"
          >
            <X size={20} aria-hidden />
          </button>
        </div>
        <div className="flex-1 overflow-auto p-5">{children}</div>
      </div>
    </div>
  );
}

export function BottomSheet({ open, onClose, title, children, className }: BaseProps) {
  useDismiss(open, onClose);
  if (!open) return null;
  return (
    <div role="dialog" aria-modal="true" aria-label={title} className="fixed inset-0 z-50">
      <button
        type="button"
        aria-label="Close sheet"
        onClick={onClose}
        className="absolute inset-0 bg-black/60"
      />
      <div className={cn("absolute inset-x-0 bottom-0 max-h-[85vh] rounded-t-[var(--radius-lg)] bg-white p-6 overflow-auto", className)}>
        <div aria-hidden className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-[color:var(--color-border)]" />
        {title ? <h2 className="mb-4 text-xl font-semibold">{title}</h2> : null}
        {children}
      </div>
    </div>
  );
}
