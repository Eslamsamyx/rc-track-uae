import { cn } from "@/lib/utils";

interface Props {
  height?: number;
  className?: string;
  variant?: "orange-white" | "blue-orange";
}

export function CurbStrip({ height = 14, className, variant = "orange-white" }: Props) {
  const stops =
    variant === "blue-orange"
      ? "var(--color-racing-blue), var(--color-racing-blue) 32px, var(--color-track-orange) 32px, var(--color-track-orange) 64px"
      : "var(--color-track-orange), var(--color-track-orange) 32px, var(--color-pit-white) 32px, var(--color-pit-white) 64px";
  return (
    <div
      aria-hidden
      style={{
        height,
        backgroundImage: `repeating-linear-gradient(90deg, ${stops})`,
      }}
      className={cn("w-full", className)}
    />
  );
}
