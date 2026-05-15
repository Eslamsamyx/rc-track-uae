import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface Feature {
  id: string;
  icon?: ReactNode;
  title: string;
  body: string;
}

export function FeatureRow({
  features,
  cols = 3,
  className,
}: {
  features: Feature[];
  cols?: 2 | 3 | 4;
  className?: string;
}) {
  const gridCols =
    cols === 2 ? "sm:grid-cols-2" : cols === 4 ? "sm:grid-cols-2 lg:grid-cols-4" : "sm:grid-cols-2 lg:grid-cols-3";
  return (
    <div className={cn("grid gap-6", gridCols, className)}>
      {features.map((f) => (
        <FeatureCard key={f.id} feature={f} />
      ))}
    </div>
  );
}

function FeatureCard({ feature }: { feature: Feature }) {
  return (
    <div className="flex flex-col gap-3 rounded-[var(--radius-lg)] bg-white p-6 ring-1 ring-[color:var(--color-border)] shadow-[var(--shadow-sm)] transition-shadow hover:shadow-[var(--shadow-md)]">
      {feature.icon ? (
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-[var(--radius-md)] bg-[color:var(--color-track-orange-50)] text-[color:var(--color-track-orange-600)]">
          {feature.icon}
        </div>
      ) : null}
      <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold text-[color:var(--color-racing-blue)]">
        {feature.title}
      </h3>
      <p className="text-sm text-[color:var(--color-muted-foreground)] leading-relaxed">{feature.body}</p>
    </div>
  );
}
