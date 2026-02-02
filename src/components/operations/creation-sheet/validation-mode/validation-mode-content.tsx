import { useTranslation } from "react-i18next";
import { Loader2 } from "lucide-react";
import { ValidationField } from "./validation-field";
import { SignatureSelect } from "./signature-select";
import type {
  ExtractedData,
  SignatureStatusType,
} from "@/api/operations/schemas";

type ValidationFieldName = "fost" | "lieu" | "dateEngagement";

type ValidationModeContentProps = {
  isLoading: boolean;
  extractedData: ExtractedData | null;
  validatedFields: Set<ValidationFieldName>;
  signature: SignatureStatusType | null;
  onToggleFieldValidation: (field: ValidationFieldName) => void;
  onSignatureChange: (value: SignatureStatusType) => void;
};

export function ValidationModeContent({
  isLoading,
  extractedData,
  validatedFields,
  signature,
  onToggleFieldValidation,
  onSignatureChange,
}: ValidationModeContentProps) {
  const { t } = useTranslation("operations");

  if (isLoading) {
    return (
      <div className="mt-5 flex flex-1 flex-col items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">
            {t("creation.step2.loading")}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-5 flex flex-1 flex-col overflow-y-auto">
      <div className="space-y-6">
        <div className="space-y-1">
          <h3 className="text-base font-medium text-gray-200">
            {t("creation.step2.subtitle")}
          </h3>
        </div>

        <div className="space-y-4">
          <ValidationField
            label={t("creation.step2.fostLabel")}
            value={extractedData?.fost ?? ""}
            isValidated={validatedFields.has("fost")}
            onToggleValidation={() => onToggleFieldValidation("fost")}
          />

          <ValidationField
            label={t("creation.step2.lieuLabel")}
            value={extractedData?.lieu ?? ""}
            isValidated={validatedFields.has("lieu")}
            onToggleValidation={() => onToggleFieldValidation("lieu")}
          />

          <ValidationField
            label={t("creation.step2.dateEngagementLabel")}
            value={extractedData?.dateEngagement ?? ""}
            isValidated={validatedFields.has("dateEngagement")}
            onToggleValidation={() => onToggleFieldValidation("dateEngagement")}
          />

          <SignatureSelect value={signature} onChange={onSignatureChange} />
        </div>
      </div>
    </div>
  );
}
