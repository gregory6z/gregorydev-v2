import { useTranslation } from "react-i18next";
import { ValidationForm } from "./validation-form";
import type {
  ValidationFormState,
  SignatureStatusType,
} from "@/api/operations/schemas";
import { Loader2 } from "lucide-react";

type Step2FormProps = {
  isLoading: boolean;
  formState: ValidationFormState;
  onToggleFieldValidation: (field: "fost" | "lieu" | "dateEngagement") => void;
  onSignatureChange: (value: SignatureStatusType) => void;
};

export function Step2Form({
  isLoading,
  formState,
  onToggleFieldValidation,
  onSignatureChange,
}: Step2FormProps) {
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
      <ValidationForm
        formState={formState}
        onToggleFieldValidation={onToggleFieldValidation}
        onSignatureChange={onSignatureChange}
      />
    </div>
  );
}
