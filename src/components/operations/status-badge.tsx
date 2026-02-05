import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import {
  LIFE_CYCLE_STATUS_CODES,
  CONFORMITY_STATUS_CODES,
  type StatusBadgeType,
} from "@/api/operations/schemas/common";
import {
  CheckCircleIcon,
  XCircleIcon,
  SquareRoundedIcon,
  SquareDashedIcon,
  DotsHorizontalIcon,
  SquareOutlineIcon,
  LoadingIcon,
} from "@/components/icons";

type StatusConfig = {
  label: string;
  shortLabel: string;
  icon: React.ComponentType<{ className?: string }>;
  className: string;
};

type StatusBadgeProps = {
  code: string | null;
  type: StatusBadgeType;
  short?: boolean;
};

export function StatusBadge({ code, type, short = false }: StatusBadgeProps) {
  const { t } = useTranslation("operations");

  const config = resolveConfig(code, type, t);

  return (
    <span
      className={cn(
        "inline-flex items-center justify-center gap-2 h-[30px] px-3 rounded-full font-body text-[13px] font-semibold leading-[140%] whitespace-nowrap",
        config.className,
      )}
    >
      <config.icon className="size-[18px]" />
      {short ? config.shortLabel : config.label}
    </span>
  );
}

const resolveConfig = (
  code: string | null,
  type: StatusBadgeType,
  t: (key: string, options?: Record<string, string>) => string,
): StatusConfig => {
  // ── Life Cycle ───────────────────────────────
  if (type === "lifeCycle") {
    switch (code) {
      case LIFE_CYCLE_STATUS_CODES.DONE:
        return {
          label: t("status.done"),
          shortLabel: t("status.doneShort", { defaultValue: "T." }),
          icon: SquareOutlineIcon,
          className:
            "border border-primary-darker text-primary-darker bg-white",
        };
      case LIFE_CYCLE_STATUS_CODES.IN_PROGRESS:
      default:
        return {
          label: t("status.inProgress"),
          shortLabel: t("status.inProgressShort", { defaultValue: "E.C." }),
          icon: DotsHorizontalIcon,
          className: "border border-primary text-primary bg-white",
        };
    }
  }

  // ── Conformity ──
  switch (code) {
    case CONFORMITY_STATUS_CODES.CONFORME:
      return {
        label: t("conformity.conform"),
        shortLabel: t("conformity.conformShort", { defaultValue: "C." }),
        icon: CheckCircleIcon,
        className: "bg-primary/10 text-primary",
      };
    case CONFORMITY_STATUS_CODES.NON_CONFORME:
      return {
        label: t("conformity.nonConform"),
        shortLabel: t("conformity.nonConformShort", { defaultValue: "N.C." }),
        icon: XCircleIcon,
        className: "bg-primary-darker/10 text-primary-darker",
      };
    case CONFORMITY_STATUS_CODES.ANALYSIS_IN_PROGRESS:
      return {
        label: t("status.analyzing"),
        shortLabel: t("status.analyzingShort", { defaultValue: "A." }),
        icon: LoadingIcon,
        className: "bg-surface/40 text-muted-foreground",
      };
    case CONFORMITY_STATUS_CODES.ANALYSIS_ERROR:
      return {
        label: t("status.analysisError"),
        shortLabel: t("status.analysisErrorShort", { defaultValue: "Err." }),
        icon: XCircleIcon,
        className: "bg-primary-darker/10 text-primary-darker",
      };
    case CONFORMITY_STATUS_CODES.NON_ANALYSED:
    default: // null = not analyzed
      return {
        label: t("conformity.notAnalyzed"),
        shortLabel: t("conformity.notAnalyzedShort", {
          defaultValue: "N.A.",
        }),
        icon: SquareRoundedIcon,
        className: "bg-surface/40 text-gray-disabled",
      };
  }
};
