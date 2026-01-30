import { cn } from "@/lib/utils";

type InfoFieldProps = {
  label: string;
  value: string | null | undefined;
  className?: string;
  /** Use vertical layout (label on top, value below) instead of horizontal grid */
  vertical?: boolean;
};

export function InfoField({
  label,
  value,
  className,
  vertical = false,
}: InfoFieldProps) {
  if (value === null || value === undefined) return null;

  if (vertical) {
    return (
      <div className={className}>
        <dt className="text-[24px] font-medium leading-[140%] text-primary font-display">
          {label}
        </dt>
        <dd className="text-sm font-medium leading-5 pl-4 text-foreground">
          {value}
        </dd>
      </div>
    );
  }

  return (
    <div className={cn("grid grid-cols-[200px_1fr]", className)}>
      <dt className="text-sm font-light leading-5 pl-4 text-foreground">
        {label}
      </dt>
      <dd className="text-sm font-medium leading-5 text-foreground">{value}</dd>
    </div>
  );
}
