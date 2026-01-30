import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ValidationForm } from "./validation-form";
import { useValidationForm } from "@/hooks/use-validation-form";
import { mockExtractData } from "@/api/operations/mocks";
import type { ExtractedData, SignatureStatusType } from "@/api/operations/schemas";
import { Loader2 } from "lucide-react";

type Step2FormProps = {
  onFormValidityChange: (isValid: boolean) => void;
  onFormStateChange: (state: {
    fost: string;
    lieu: string;
    dateEngagement: string;
    signature: SignatureStatusType | null;
  }) => void;
};

export function Step2Form({
  onFormValidityChange,
  onFormStateChange,
}: Step2FormProps) {
  const { t } = useTranslation("operations");
  const [extractedData, setExtractedData] = useState<ExtractedData | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);

  const { formState, toggleFieldValidation, setSignature, isFormValid } =
    useValidationForm(extractedData);

  // Extract data on mount
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const data = await mockExtractData();
      setExtractedData(data);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  // Notify parent of form validity changes
  useEffect(() => {
    onFormValidityChange(isFormValid);
  }, [isFormValid, onFormValidityChange]);

  // Notify parent of form state changes
  useEffect(() => {
    onFormStateChange({
      fost: formState.fost.value,
      lieu: formState.lieu.value,
      dateEngagement: formState.dateEngagement.value,
      signature: formState.signature,
    });
  }, [formState, onFormStateChange]);

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
        onToggleFieldValidation={toggleFieldValidation}
        onSignatureChange={setSignature}
      />
    </div>
  );
}
