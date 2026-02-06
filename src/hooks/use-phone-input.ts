import { useState } from "react";
import { formatPhone } from "@/helpers/formatters";

type SetValue = (value: string, options?: { shouldDirty?: boolean; shouldValidate?: boolean }) => void;

/**
 * Hook for phone input with formatting.
 * Handles both national (0612345678) and international (+33612345678) formats.
 */
export const usePhoneInput = (
  initialValue: string,
  setValue: SetValue,
) => {
  const [phoneDisplay, setPhoneDisplay] = useState(() =>
    formatPhone(initialValue ?? ""),
  );

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;

    if (
      input.startsWith("+33") ||
      input.startsWith("+3") ||
      input.startsWith("+")
    ) {
      const digitsAfterPrefix = input.slice(1).replace(/\D/g, "");

      if (digitsAfterPrefix.startsWith("33")) {
        const phoneDigits = digitsAfterPrefix.slice(2, 11);
        const rawValue = `+33${phoneDigits}`;
        const formatted = formatPhone(rawValue);
        setPhoneDisplay(formatted);
        setValue(rawValue, { shouldValidate: false });
      } else if (digitsAfterPrefix.length <= 2) {
        setPhoneDisplay(input);
        setValue(input, { shouldValidate: false });
      }
    } else {
      const digits = input.replace(/\D/g, "").slice(0, 10);
      const formatted = formatPhone(digits);
      setPhoneDisplay(formatted);
      setValue(digits, { shouldValidate: false });
    }
  };

  return { phoneDisplay, handlePhoneChange };
};
