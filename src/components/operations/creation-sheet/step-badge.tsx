import { cn } from "@/lib/utils";

type StepBadgeProps = {
  current: number;
  total: number;
  className?: string;
};

export function StepBadge({ current, total, className }: StepBadgeProps) {
  return (
    <span
      data-slot="step-badge"
      className={cn(
        "inline-flex items-center rounded-md px-2 py-1",
        "bg-primary/10 text-sm font-medium text-primary",
        className,
      )}
    >
      {current}/{total}
    </span>
  );
}
