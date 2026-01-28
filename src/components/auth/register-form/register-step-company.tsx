import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { formatPhone } from "@/helpers/formatters";
import type { RegisterFormData } from "@/api/auth/schemas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type RegisterStepCompanyProps = {
  onNext: () => void;
  onBack: () => void;
};

export const RegisterStepCompany = ({
  onNext,
  onBack,
}: RegisterStepCompanyProps) => {
  const { t } = useTranslation("auth");

  const {
    register,
    setValue,
    trigger,
    getValues,
    formState: { errors },
  } = useFormContext<RegisterFormData>();

  const [phoneDisplay, setPhoneDisplay] = useState(() =>
    formatPhone(getValues("phone") ?? ""),
  );

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;

    // Check if user is typing international format (+33)
    if (
      input.startsWith("+33") ||
      input.startsWith("+3") ||
      input.startsWith("+")
    ) {
      // Extract digits after +33
      const digitsAfterPrefix = input.slice(1).replace(/\D/g, "");

      // Limit to +33 + 9 digits
      if (digitsAfterPrefix.startsWith("33")) {
        const phoneDigits = digitsAfterPrefix.slice(2, 11); // max 9 digits after 33
        const rawValue = `+33${phoneDigits}`;
        const formatted = formatPhone(rawValue);
        setPhoneDisplay(formatted);
        setValue("phone", rawValue, { shouldValidate: false });
      } else if (digitsAfterPrefix.length <= 2) {
        // User is still typing +3 or +33
        setPhoneDisplay(input);
        setValue("phone", input, { shouldValidate: false });
      }
    } else {
      // National format: 10 digits
      const digits = input.replace(/\D/g, "").slice(0, 10);
      const formatted = formatPhone(digits);
      setPhoneDisplay(formatted);
      setValue("phone", digits, { shouldValidate: false });
    }
  };

  const handleNext = async () => {
    const valid = await trigger("phone");
    if (!valid) return;
    onNext();
  };

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-3.5">
        <div className="flex flex-col gap-1.5">
          <Label variant="auth">{t("register.step2.companyName")}</Label>
          <Input
            variant="auth"
            readOnly
            className="opacity-60"
            {...register("companyName")}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label variant="auth">{t("register.step2.address")}</Label>
          <Input
            variant="auth"
            readOnly
            className="opacity-60"
            {...register("address")}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label variant="auth">{t("register.step2.phone")}</Label>
          <Input
            variant="auth"
            placeholder={t("register.step2.phonePlaceholder")}
            type="tel"
            aria-invalid={!!errors.phone}
            value={phoneDisplay}
            onChange={handlePhoneChange}
          />
          {errors.phone && (
            <p className="text-base text-primary">
              {t(errors.phone.message as string)}
            </p>
          )}
        </div>
      </div>

      <div className="flex gap-4 [&>*]:min-w-0 [&>*]:flex-1">
        <Button
          type="button"
          variant="auth-secondary"
          size="auth"
          onClick={onBack}
        >
          {t("register.step2.back")}
        </Button>
        <Button type="button" size="auth" onClick={handleNext}>
          {t("register.step2.next")}
        </Button>
      </div>
    </div>
  );
};
