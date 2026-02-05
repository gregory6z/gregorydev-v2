import { useTranslation } from "react-i18next";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  SignatureStatus,
  type SignatureStatusType,
} from "@/api/operations/schemas";

type SignatureSelectProps = {
  value: SignatureStatusType | null;
  onChange: (value: SignatureStatusType) => void;
};

export function SignatureSelect({ value, onChange }: SignatureSelectProps) {
  const { t } = useTranslation("operations");

  return (
    <div data-slot="signature-select" className="space-y-2">
      <Label>{t("creation.step2.signatureLabel")}</Label>
      <Select
        value={value ?? undefined}
        onValueChange={(v) => onChange(v as SignatureStatusType)}
      >
        <SelectTrigger className="w-full !h-[50px] !bg-white focus-visible:ring-0 focus-visible:border-border">
          <SelectValue placeholder={t("creation.step2.signaturePlaceholder")}>
            {value === SignatureStatus.PRESENT &&
              t("creation.step2.signaturePresent")}
            {value === SignatureStatus.ABSENT &&
              t("creation.step2.signatureAbsent")}
          </SelectValue>
        </SelectTrigger>
        <SelectContent
          alignItemWithTrigger={false}
          className="min-w-[var(--anchor-width)] rounded-md p-1"
        >
          <SelectItem
            value={SignatureStatus.PRESENT}
            className="rounded-sm px-3 py-2"
          >
            {t("creation.step2.signaturePresent")}
          </SelectItem>
          <SelectItem
            value={SignatureStatus.ABSENT}
            className="rounded-sm px-3 py-2"
          >
            {t("creation.step2.signatureAbsent")}
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
