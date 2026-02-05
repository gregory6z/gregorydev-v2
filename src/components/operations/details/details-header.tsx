import { useTranslation } from "react-i18next";
import { ArrowLeftIcon } from "@/components/icons";
import { StatusBadge } from "@/components/operations/status-badge";
import type { Status } from "@/api/operations/schemas/common";

type DetailsHeaderProps = {
  beneficiaryName: string | null;
  reference: string;
  conformity: Status | null;
  onBack: () => void;
};

export function DetailsHeader({
  beneficiaryName,
  reference,
  conformity,
  onBack,
}: DetailsHeaderProps) {
  const { t } = useTranslation("operations");

  return (
    <div className="flex items-center gap-4 mb-4">
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center justify-center size-9 rounded-md hover:bg-muted transition-colors"
      >
        <ArrowLeftIcon className="size-[18px]" />
      </button>

      <h1 className="font-display text-[42px] font-normal leading-[140%]">
        {beneficiaryName ?? t("details.unknownBeneficiary")}
      </h1>

      <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary-darker/10 text-primary-darkest font-display text-base font-semibold leading-[140%]">
        {reference}
      </span>

      <StatusBadge code={conformity?.code ?? null} type="conformity" />
    </div>
  );
}
