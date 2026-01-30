import { useState } from "react";
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
  // Use key pattern: when extractedData changes, React will remount
  // the component using this hook if parent uses key={extractedData?.id}
  const [formState, setFormState] = useState<ValidationFormState>(() =>
    createInitialState(extractedData),
  );

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

  // Derived state - simple boolean expression
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
