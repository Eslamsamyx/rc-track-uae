"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    if (typeof console !== "undefined") {
      console.error(error);
    }
  }, [error]);

  return (
    <html lang="en">
      <body className="bg-white text-[color:var(--color-foreground)]">
        <main className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center px-5 py-24 text-center">
          <h1 className="text-3xl font-bold">Something went wrong</h1>
          <p className="mt-2 text-[color:var(--color-muted-foreground)]">
            An unexpected error occurred. Our team has been notified.
          </p>
          <button
            type="button"
            onClick={reset}
            className="mt-6 inline-flex h-12 items-center justify-center rounded-[var(--radius-md)] bg-[color:var(--color-track-orange)] px-6 font-semibold text-white"
          >
            Reload the page
          </button>
        </main>
      </body>
    </html>
  );
}
