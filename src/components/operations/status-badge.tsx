import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import {
  OperationStatus,
  ConformityStatus,
  FileStatus,
  CoherenceStatus,
  type OperationStatusType,
  type ConformityStatusType,
  type FileStatusType,
  type CoherenceStatusType,
} from "@/api/operations/schemas";
import {
  CheckCircleIcon,
  XCircleIcon,
  SquareRoundedIcon,
  SquareDashedIcon,
  DotsHorizontalIcon,
  SquareOutlineIcon,
  LoadingIcon,
} from "@/components/icons";

type StatusType =
  | OperationStatusType
  | ConformityStatusType
  | FileStatusType
  | CoherenceStatusType;

type StatusBadgeProps = {
  status: StatusType;
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const { t } = useTranslation("operations");

  const config: Record<
    StatusType,
    {
      label: string;
      icon: React.ComponentType<{ className?: string }>;
      className: string;
    }
  > = {
    // Operation Status
    [OperationStatus.IN_PROGRESS]: {
      label: t("status.inProgress"),
      icon: DotsHorizontalIcon,
      className: "border border-primary text-primary bg-white",
    },
    [OperationStatus.DONE]: {
      label: t("status.done"),
      icon: SquareOutlineIcon,
      className: "border border-primary-darker text-primary-darker bg-white",
    },

    // Conformity Status
    [ConformityStatus.CONFORM]: {
      label: t("conformity.conform"),
      icon: CheckCircleIcon,
      className: "bg-primary/10 text-primary",
    },
    [ConformityStatus.NON_CONFORM]: {
      label: t("conformity.nonConform"),
      icon: XCircleIcon,
      className: "bg-primary-darker/10 text-primary-darker",
    },
    [ConformityStatus.NOT_ANALYZED]: {
      label: t("conformity.notAnalyzed"),
      icon: SquareRoundedIcon,
      className: "bg-surface/40 text-gray-disabled",
    },

    // File Status (CONFORM and NON_CONFORM use same values as ConformityStatus)
    [FileStatus.ANALYZING]: {
      label: t("status.analyzing"),
      icon: LoadingIcon,
      className: "bg-surface/40 text-muted-foreground",
    },

    // Coherence Status (CONFORM and NON_CONFORM use same values as ConformityStatus)
    [CoherenceStatus.NOT_APPLICABLE]: {
      label: t("coherenceStatus.notApplicable"),
      icon: SquareDashedIcon,
      className: "bg-surface/40 text-[#BABABA]",
    },
  };

  const { label, icon: Icon, className } = config[status];

  return (
    <span
      className={cn(
        "inline-flex items-center justify-center gap-2 h-[30px] px-3 rounded-full font-body text-[13px] font-semibold leading-[140%] whitespace-nowrap",
        className,
      )}
    >
      <Icon className="size-[18px]" />
      {label}
    </span>
  );
}
