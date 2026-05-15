interface Props {
  label: string;
  logos: ReadonlyArray<{ id: string; name: string; svg: React.ReactNode }>;
}

export function TrustBar({ label, logos }: Props) {
  return (
    <section aria-label={label} className="bg-[color:var(--color-mist)] py-10">
      <div className="mx-auto max-w-7xl container-px">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--color-muted-foreground)]">
          {label}
        </p>
        <div className="mt-6 grid grid-cols-2 items-center gap-6 sm:grid-cols-3 md:grid-cols-6">
          {logos.map((logo) => (
            <div
              key={logo.id}
              className="flex h-12 items-center justify-center text-[color:var(--color-smoke)] opacity-80 grayscale transition-opacity hover:opacity-100 hover:grayscale-0"
              aria-label={logo.name}
              title={logo.name}
            >
              {logo.svg}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function generateMockLogos() {
  const names = ["GEMS", "Dubai Schools", "Aldar", "Emirates Karting", "Hobby Town", "PitMaster"];
  return names.map((name, i) => ({
    id: `${name}-${i}`,
    name,
    svg: (
      <span className="font-[family-name:var(--font-display)] text-lg font-extrabold tracking-wide">
        {name}
      </span>
    ),
  }));
}
