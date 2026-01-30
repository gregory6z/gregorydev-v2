import { useTranslation } from "react-i18next";
import { ValidationField } from "./validation-field";
import { SignatureSelect } from "./signature-select";
import type {
  ValidationFormState,
  SignatureStatusType,
} from "@/api/operations/schemas";

type ValidationFormProps = {
  formState: ValidationFormState;
  onToggleFieldValidation: (field: "fost" | "lieu" | "dateEngagement") => void;
  onSignatureChange: (value: SignatureStatusType) => void;
};

export function ValidationForm({
  formState,
  onToggleFieldValidation,
  onSignatureChange,
}: ValidationFormProps) {
  const { t } = useTranslation("operations");

  return (
    <div data-slot="validation-form" className="space-y-6">
      <div className="space-y-1">
        <h3 className="text-base font-medium text-gray-200">
          {t("creation.step2.subtitle")}
        </h3>
      </div>

      <div className="space-y-4">
        <ValidationField
          label={t("creation.step2.fostLabel")}
          value={formState.fost.value}
          isValidated={formState.fost.isValidated}
          onToggleValidation={() => onToggleFieldValidation("fost")}
        />

        <ValidationField
          label={t("creation.step2.lieuLabel")}
          value={formState.lieu.value}
          isValidated={formState.lieu.isValidated}
          onToggleValidation={() => onToggleFieldValidation("lieu")}
        />

        <ValidationField
          label={t("creation.step2.dateEngagementLabel")}
          value={formState.dateEngagement.value}
          isValidated={formState.dateEngagement.isValidated}
          onToggleValidation={() => onToggleFieldValidation("dateEngagement")}
        />

        <SignatureSelect
          value={formState.signature}
          onChange={onSignatureChange}
        />
      </div>
    </div>
  );
}
