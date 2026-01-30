import { useState, useEffect } from "react";
import type {
  ExtractedData,
  ValidationFormState,
  SignatureStatusType,
} from "@/api/operations/schemas";
import { SignatureStatus } from "@/api/operations/schemas";

type UseValidationFormReturn = {
  formState: ValidationFormState;
  toggleFieldValidation: (field: "fost" | "lieu" | "dateEngagement") => void;
  setSignature: (value: SignatureStatusType) => void;
  isFormValid: boolean;
  reset: () => void;
};

const createInitialState = (
  extractedData: ExtractedData | null,
): ValidationFormState => ({
  fost: { value: extractedData?.fost ?? "", isValidated: false },
  lieu: { value: extractedData?.lieu ?? "", isValidated: false },
  dateEngagement: {
    value: extractedData?.dateEngagement ?? "",
    isValidated: false,
  },
  signature: extractedData?.signatureDetected
    ? SignatureStatus.PRESENT
    : SignatureStatus.ABSENT,
});

export const useValidationForm = (
  extractedData: ExtractedData | null,
): UseValidationFormReturn => {
  const [formState, setFormState] = useState<ValidationFormState>(() =>
    createInitialState(extractedData),
  );

  // Update form state when extracted data changes
  useEffect(() => {
    setFormState(createInitialState(extractedData));
  }, [extractedData]);

  const toggleFieldValidation = (field: "fost" | "lieu" | "dateEngagement") => {
    setFormState((prev) => ({
      ...prev,
      [field]: {
        ...prev[field],
        isValidated: !prev[field].isValidated,
      },
    }));
  };

  const setSignature = (value: SignatureStatusType) => {
    setFormState((prev) => ({
      ...prev,
      signature: value,
    }));
  };

  // Simple boolean expression - no need for useMemo
  const isFormValid =
    formState.fost.isValidated &&
    formState.lieu.isValidated &&
    formState.dateEngagement.isValidated &&
    formState.signature !== null;

  const reset = () => {
    setFormState(createInitialState(extractedData));
  };

  return {
    formState,
    toggleFieldValidation,
    setSignature,
    isFormValid,
    reset,
  };
};
