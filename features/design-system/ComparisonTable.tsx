import { Check, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ComparisonRow {
  label: string;
  values: ReadonlyArray<string | boolean>;
}

interface Props {
  columns: ReadonlyArray<string>;
  rows: ReadonlyArray<ComparisonRow>;
  highlightedColumnIndex?: number;
  firstColumnLabel?: string;
  className?: string;
}

export function ComparisonTable({
  columns,
  rows,
  highlightedColumnIndex,
  firstColumnLabel,
  className,
}: Props) {
  return (
    <div className={cn("overflow-x-auto", className)}>
      <table className="min-w-full rounded-[var(--radius-lg)] border border-[color:var(--color-border)] bg-white">
        <thead>
          <tr>
            <th
              scope="col"
              className="px-6 py-4 text-start text-sm font-semibold text-[color:var(--color-muted-foreground)]"
            >
              {firstColumnLabel ?? ""}
            </th>
            {columns.map((col, i) => (
              <th
                key={col}
                scope="col"
                className={cn(
                  "px-6 py-4 text-start text-base font-bold",
                  highlightedColumnIndex === i
                    ? "bg-[color:var(--color-racing-blue)] text-white"
                    : "text-[color:var(--color-racing-blue)]",
                )}
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-[color:var(--color-border)]">
          {rows.map((row) => (
            <tr key={row.label}>
              <th
                scope="row"
                className="px-6 py-4 text-start text-sm font-medium text-[color:var(--color-foreground)]"
              >
                {row.label}
              </th>
              {row.values.map((v, i) => (
                <td
                  key={i}
                  className={cn(
                    "px-6 py-4 text-sm",
                    highlightedColumnIndex === i && "bg-[color:var(--color-racing-blue-50)]/40",
                  )}
                >
                  {typeof v === "boolean" ? (
                    v ? (
                      <Check
                        size={18}
                        aria-label="Included"
                        className="text-[color:var(--color-go-green)]"
                      />
                    ) : (
                      <Minus
                        size={18}
                        aria-label="Not included"
                        className="text-[color:var(--color-smoke)]"
                      />
                    )
                  ) : (
                    <span>{v}</span>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
