import { useState, useCallback, useMemo, useEffect } from "react";
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

export const useValidationForm = (
  extractedData: ExtractedData | null,
): UseValidationFormReturn => {
  const createInitialState = useCallback(
    (): ValidationFormState => ({
      fost: { value: extractedData?.fost ?? "", isValidated: false },
      lieu: { value: extractedData?.lieu ?? "", isValidated: false },
      dateEngagement: {
        value: extractedData?.dateEngagement ?? "",
        isValidated: false,
      },
      signature: extractedData?.signatureDetected
        ? SignatureStatus.PRESENT
        : SignatureStatus.ABSENT,
    }),
    [extractedData],
  );

  const [formState, setFormState] =
    useState<ValidationFormState>(createInitialState());

  // Update form state when extracted data changes
  useEffect(() => {
    setFormState(createInitialState());
  }, [createInitialState]);

  const toggleFieldValidation = useCallback(
    (field: "fost" | "lieu" | "dateEngagement") => {
      setFormState((prev) => ({
        ...prev,
        [field]: {
          ...prev[field],
          isValidated: !prev[field].isValidated,
        },
      }));
    },
    [],
  );

  const setSignature = useCallback((value: SignatureStatusType) => {
    setFormState((prev) => ({
      ...prev,
      signature: value,
    }));
  }, []);

  const isFormValid = useMemo(() => {
    return (
      formState.fost.isValidated &&
      formState.lieu.isValidated &&
      formState.dateEngagement.isValidated &&
      formState.signature !== null
    );
  }, [formState]);

  const reset = useCallback(() => {
    setFormState(createInitialState());
  }, [createInitialState]);

  return {
    formState,
    toggleFieldValidation,
    setSignature,
    isFormValid,
    reset,
  };
};
