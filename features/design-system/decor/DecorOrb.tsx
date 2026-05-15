import { cn } from "@/lib/utils";

interface Props {
  color?: "orange" | "blue" | "violet" | "green" | "white";
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  animate?: boolean;
  blur?: "md" | "lg" | "xl" | "2xl" | "3xl";
}

const colors: Record<NonNullable<Props["color"]>, string> = {
  orange: "bg-[color:var(--color-track-orange)]",
  blue: "bg-[color:var(--color-racing-blue)]",
  violet: "bg-violet-600",
  green: "bg-[color:var(--color-go-green)]",
  white: "bg-white",
};

const sizes: Record<NonNullable<Props["size"]>, string> = {
  sm: "w-40 h-40",
  md: "w-72 h-72",
  lg: "w-[28rem] h-[28rem]",
  xl: "w-[40rem] h-[40rem]",
};

const blurs: Record<NonNullable<Props["blur"]>, string> = {
  md: "blur-2xl",
  lg: "blur-3xl",
  xl: "blur-[80px]",
  "2xl": "blur-[100px]",
  "3xl": "blur-[140px]",
};

export function DecorOrb({
  color = "orange",
  size = "lg",
  className,
  animate = true,
  blur = "3xl",
}: Props) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute rounded-full opacity-30 mix-blend-screen",
        colors[color],
        sizes[size],
        blurs[blur],
        animate && "animate-orb-drift",
        className,
      )}
    />
  );
}
