import { useTranslation } from "react-i18next";
import type {
  DocumentBeneficiary,
  DocumentProfessional,
} from "@/api/operations/schemas/document";

type ValidationModeInfoProps = {
  beneficiary: DocumentBeneficiary;
  professional: DocumentProfessional;
};

export function ValidationModeInfo({
  beneficiary,
  professional,
}: ValidationModeInfoProps) {
  const { t } = useTranslation("operations");

  const formattedDate = new Date(beneficiary.engagementDate).toLocaleDateString(
    "fr-FR",
    {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    },
  );

  return (
    <div className="rounded-lg bg-[#00B48F]/10 p-4">
      {/* Beneficiary */}
      <div>
        <h4 className="font-display text-[20px] font-medium leading-[17px] text-primary">
          {t("documentDialog.beneficiary")}
        </h4>
        <p className="text-[14px] font-medium leading-[17px] text-black">
          {beneficiary.name}
        </p>
        <p className="text-sm text-black">{beneficiary.address}</p>
        <p className="text-sm text-black">
          {t("documentDialog.engagement", { date: formattedDate })}
        </p>
        <p className="text-sm text-black">
          {beneficiary.ficheCEE} {beneficiary.ficheCEEDescription}
        </p>
        <p className="text-sm text-black">
          {t("documentDialog.prime", {
            amount: beneficiary.prime.toLocaleString("fr-FR"),
          })}
        </p>
      </div>

      {/* Professional */}
      <div className="mt-4">
        <h4 className="font-display text-[20px] font-medium leading-[17px] text-primary">
          {t("documentDialog.professional")}
        </h4>
        <p className="text-[14px] font-medium leading-[17px] text-black">
          {professional.name}
        </p>
        <p className="text-sm text-black">{professional.address}</p>
      </div>
    </div>
  );
}
