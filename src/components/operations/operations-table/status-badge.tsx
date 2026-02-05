import { useTranslation } from "react-i18next";

import { OperationStatus } from "@/api/operations/schemas";
import { DotsHorizontalIcon, SquareOutlineIcon } from "@/components/icons";

type StatusBadgeProps = {
  status: (typeof OperationStatus)[keyof typeof OperationStatus];
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const { t } = useTranslation("operations");

  const config = {
    [OperationStatus.IN_PROGRESS]: {
      label: t("status.inProgress"),
      icon: DotsHorizontalIcon,
      color: "text-primary",
      borderColor: "border-primary",
    },
    [OperationStatus.DONE]: {
      label: t("status.done"),
      icon: SquareOutlineIcon,
      color: "text-primary-darker",
      borderColor: "border-primary-darker",
    },
  };

  const { label, icon: Icon, color, borderColor } = config[status];

  return (
    <span
      className={`inline-flex items-center justify-center gap-2 h-[30px] px-3 rounded-full border ${borderColor} ${color} bg-white font-body text-[13px] font-semibold leading-[140%] whitespace-nowrap`}
    >
      <Icon className="size-[18px]" />
      {label}
    </span>
  );
}
