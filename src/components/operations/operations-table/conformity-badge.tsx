import { useTranslation } from "react-i18next";

import { ConformityStatus } from "@/api/operations/schemas";
import {
  CheckCircleIcon,
  XCircleIcon,
  SquareRoundedIcon,
} from "@/components/icons";

type ConformityBadgeProps = {
  conformity: (typeof ConformityStatus)[keyof typeof ConformityStatus];
};

export function ConformityBadge({ conformity }: ConformityBadgeProps) {
  const { t } = useTranslation("operations");

  const config = {
    [ConformityStatus.CONFORM]: {
      label: t("conformity.conform"),
      icon: CheckCircleIcon,
      className: "bg-[#E6F9F6] text-primary",
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
  };

  const { label, icon: Icon, className } = config[conformity];

  return (
    <span
      className={`inline-flex items-center gap-2 h-[30px] px-3 rounded-full font-body text-[13px] font-semibold leading-[140%] whitespace-nowrap ${className}`}
    >
      <Icon className="size-[18px]" />
      {label}
    </span>
  );
}
