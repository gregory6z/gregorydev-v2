import type { SVGProps } from "react";
import type React from "react";
import { useTranslation } from "react-i18next";

import { cn } from "@/lib/utils";
import type { ConformityFilter } from "@/api/operations/schemas/list";
import {
  CheckCircleIcon,
  XCircleIcon,
  SquareRoundedIcon,
} from "@/components/icons";

type OperationsTabsProps = {
  activeTab: ConformityFilter;
  onTabChange: (tab: ConformityFilter) => void;
  counts: {
    all: number;
    conform: number;
    nonConform: number;
    nonAnalysed: number;
  };
  isLoading?: boolean;
};

export function OperationsTabs({
  activeTab,
  onTabChange,
  counts,
  isLoading,
}: OperationsTabsProps) {
  const { t } = useTranslation("operations");

  const tabs: {
    value: ConformityFilter;
    label: string;
    count: number;
    icon?: (props: SVGProps<SVGSVGElement>) => React.ReactElement;
  }[] = [
    { value: "all", label: t("tabs.all"), count: counts.all },
    {
      value: "conform",
      label: t("tabs.conform"),
      count: counts.conform,
      icon: CheckCircleIcon,
    },
    {
      value: "non_conform",
      label: t("tabs.nonConform"),
      count: counts.nonConform,
      icon: XCircleIcon,
    },
    {
      value: "non_analysed",
      label: t("tabs.nonAnalysed"),
      count: counts.nonAnalysed,
      icon: SquareRoundedIcon,
    },
  ];

  return (
    <div className="flex gap-6">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => onTabChange(tab.value)}
          className={cn(
            "flex items-center gap-2 pb-[18px] font-display text-lg font-semibold leading-[140%] transition-colors border-b-[3px]",
            activeTab === tab.value
              ? "border-primary-dark text-foreground"
              : "border-transparent text-foreground",
          )}
        >
          {tab.icon && <tab.icon className="size-[18px]" />}
          <span>{tab.label}</span>
          <span
            className={cn(
              "inline-flex items-center justify-center h-[26px] px-2 rounded-md font-display text-base font-semibold leading-5",
              activeTab === tab.value
                ? "bg-primary-dark-10 text-primary-dark"
                : "bg-gray-disabled-20 text-foreground",
              isLoading && "animate-pulse",
            )}
          >
            {tab.count}
          </span>
        </button>
      ))}
    </div>
  );
}
