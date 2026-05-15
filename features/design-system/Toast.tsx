"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { X, CheckCircle, AlertCircle, Info } from "lucide-react";

type ToastVariant = "info" | "success" | "error";
interface ToastEntry {
  id: number;
  message: string;
  variant: ToastVariant;
}

interface ToastContextType {
  toast: (message: string, variant?: ToastVariant) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export function useToast(): ToastContextType {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    return { toast: () => undefined };
  }
  return ctx;
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastEntry[]>([]);

  const toast = useCallback<ToastContextType["toast"]>((message, variant = "info") => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, variant }]);
  }, []);

  useEffect(() => {
    if (toasts.length === 0) return;
    const timer = setTimeout(() => {
      setToasts((prev) => prev.slice(1));
    }, 4000);
    return () => clearTimeout(timer);
  }, [toasts]);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div
        aria-live="polite"
        aria-atomic="true"
        className="pointer-events-none fixed inset-x-0 bottom-4 z-[60] flex flex-col items-center gap-2 px-4"
      >
        {toasts.map((t) => (
          <div
            key={t.id}
            role="status"
            className={cn(
              "pointer-events-auto flex items-center gap-3 rounded-[var(--radius-md)] bg-white px-4 py-3 shadow-[var(--shadow-lg)] border border-[color:var(--color-border)] max-w-md w-full",
            )}
          >
            <ToastIcon variant={t.variant} />
            <p className="flex-1 text-sm">{t.message}</p>
            <button
              type="button"
              aria-label="Dismiss"
              onClick={() => setToasts((prev) => prev.filter((p) => p.id !== t.id))}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full hover:bg-[color:var(--color-mist)]"
            >
              <X size={16} aria-hidden />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

function ToastIcon({ variant }: { variant: ToastVariant }) {
  if (variant === "success")
    return <CheckCircle aria-hidden className="text-[color:var(--color-go-green)]" size={20} />;
  if (variant === "error")
    return <AlertCircle aria-hidden className="text-[color:var(--color-stop-red)]" size={20} />;
  return <Info aria-hidden className="text-[color:var(--color-racing-blue)]" size={20} />;
}
