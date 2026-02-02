import { useTranslation } from "react-i18next";
import type {
  DocumentBeneficiary,
  DocumentProfessional,
} from "@/api/operations/schemas";

type DocumentInfoProps = {
  beneficiary: DocumentBeneficiary;
  professional: DocumentProfessional;
  qrCodeUrl: string | null;
};

function QrCodePlaceholder({ url }: { url: string | null }) {
  if (url) {
    return (
      <img
        src={url}
        alt="QR Code Blockchain"
        className="size-[100px] rounded-md"
      />
    );
  }

  return (
    <div className="flex size-[100px] items-center justify-center rounded-md bg-surface">
      <span className="text-xs text-muted-foreground">QR Code</span>
    </div>
  );
}

export function DocumentInfo({
  beneficiary,
  professional,
  qrCodeUrl,
}: DocumentInfoProps) {
  const { t } = useTranslation("operations");

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <div data-slot="document-info" className="flex gap-6">
      {/* Left column: Beneficiary + Professional */}
      <div className="flex-1 space-y-6">
        {/* Beneficiary */}
        <div>
          <h3 className="font-display text-lg font-semibold text-primary">
            {t("documentDialog.beneficiary")}
          </h3>
          <p className="font-medium">{beneficiary.name}</p>
          <p className="text-sm text-muted-foreground">{beneficiary.address}</p>
          <p className="text-sm">
            {t("documentDialog.engagement", {
              date: formatDate(beneficiary.engagementDate),
            })}
          </p>
          <p className="text-sm">
            {beneficiary.ficheCEE} {beneficiary.ficheCEEDescription}
          </p>
          <p className="text-sm font-medium">
            {t("documentDialog.prime", { amount: beneficiary.prime })}
          </p>
        </div>

        {/* Professional */}
        <div>
          <h3 className="font-display text-lg font-semibold text-primary">
            {t("documentDialog.professional")}
          </h3>
          <p className="font-medium">{professional.name}</p>
          <p className="text-sm text-muted-foreground">{professional.address}</p>
        </div>
      </div>

      {/* Right column: QR Code */}
      <QrCodePlaceholder url={qrCodeUrl} />
    </div>
  );
}
