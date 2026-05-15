"use client";

export function ManageCookiesButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      onClick={() => {
        window.dispatchEvent(new Event("open-cookie-prefs"));
      }}
      className="inline-flex h-12 items-center justify-center rounded-[var(--radius-md)] bg-[color:var(--color-track-orange)] px-5 font-semibold text-white"
    >
      {label}
    </button>
  );
}
