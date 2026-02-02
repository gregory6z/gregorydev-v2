import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  CoherenceStatus,
  type CoherenceStatusType,
} from "@/api/operations/schemas";

type VerificationStatusBadgeProps = {
  status: CoherenceStatusType;
};

export function VerificationStatusBadge({
  status,
}: VerificationStatusBadgeProps) {
  const config = {
    [CoherenceStatus.CONFORM]: {
      label: "C.",
      className: "bg-primary/10 text-primary",
      icon: Check,
    },
    [CoherenceStatus.NON_CONFORM]: {
      label: "N.C.",
      className: "bg-warning/10 text-warning",
      icon: X,
    },
    [CoherenceStatus.NOT_APPLICABLE]: {
      label: "N/A",
      className: "bg-muted text-muted-foreground",
      icon: null,
    },
  };

  const { label, className, icon: Icon } = config[status];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded px-2 py-0.5 text-xs font-medium",
        className,
      )}
    >
      {Icon && <Icon className="size-3" />}
      {label}
    </span>
  );
}
