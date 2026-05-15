import Link from "next/link";

export default function GlobalNotFound() {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-5 py-24 text-center">
      <p className="text-7xl font-extrabold text-[color:var(--color-racing-blue)]">404</p>
      <h1 className="mt-4 text-3xl font-bold">Page not found</h1>
      <p className="mt-2 text-[color:var(--color-muted-foreground)]">The link you followed has retired.</p>
      <Link
        href="/en"
        className="mt-8 inline-flex h-12 items-center justify-center rounded-[var(--radius-md)] bg-[color:var(--color-track-orange)] px-6 font-semibold text-white"
      >
        Back to home
      </Link>
    </main>
  );
}
