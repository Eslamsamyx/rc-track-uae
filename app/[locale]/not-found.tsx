import { getTranslations } from "next-intl/server";
import Link from "next/link";

export default async function NotFound() {
  const t = await getTranslations();
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center container-px py-24 text-center">
      <p className="font-[family-name:var(--font-display)] text-7xl font-extrabold text-[color:var(--color-racing-blue)]">404</p>
      <h1 className="mt-4 font-[family-name:var(--font-display)] text-3xl font-bold">{t("errors.notFoundTitle")}</h1>
      <p className="mt-2 text-[color:var(--color-muted-foreground)]">{t("errors.notFoundBody")}</p>
      <Link
        href="/"
        className="mt-8 inline-flex h-12 items-center justify-center rounded-[var(--radius-md)] bg-[color:var(--color-track-orange)] px-6 font-semibold text-white"
      >
        {t("errors.notFoundCta")}
      </Link>
    </main>
  );
}
