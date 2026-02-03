import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useRegister } from "@/api/users/mutations";
import { formatPhone } from "@/helpers/formatters";
import type { RegisterFormData } from "@/api/users/schemas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/ui/password-input";

type RegisterStepUserProps = {
  onBack: () => void;
  onComplete: () => void;
};

export const RegisterStepUser = ({
  onBack,
  onComplete,
}: RegisterStepUserProps) => {
  const { t } = useTranslation("auth");
  const registerMutation = useRegister();

  const {
    register,
    setValue,
    trigger,
    getValues,
    formState: { errors },
  } = useFormContext<RegisterFormData>();

  const [phoneDisplay, setPhoneDisplay] = useState(() =>
    formatPhone(getValues("userPhoneNumber") ?? ""),
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
        setValue("userPhoneNumber", rawValue, { shouldValidate: false });
      } else if (digitsAfterPrefix.length <= 2) {
        // User is still typing +3 or +33
        setPhoneDisplay(input);
        setValue("userPhoneNumber", input, { shouldValidate: false });
      }
    } else {
      // National format: 10 digits
      const digits = input.replace(/\D/g, "").slice(0, 10);
      const formatted = formatPhone(digits);
      setPhoneDisplay(formatted);
      setValue("userPhoneNumber", digits, { shouldValidate: false });
    }
  };

  const handleSubmit = async () => {
    const valid = await trigger([
      "userLastName",
      "userFirstName",
      "userEmail",
      "userPhoneNumber",
      "userPassword",
      "userPasswordConfirmation",
    ]);
    if (!valid) return;

    const values = getValues();

    if (values.userPassword !== values.userPasswordConfirmation) return;

    registerMutation.mutate(values, {
      onSuccess: () => onComplete(),
    });
  };

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-3.5">
        <div className="flex flex-col gap-1.5">
          <Label variant="auth">{t("register.step3.lastName")}</Label>
          <Input
            variant="auth"
            placeholder={t("register.step3.lastNamePlaceholder")}
            aria-invalid={!!errors.userLastName}
            {...register("userLastName")}
          />
          {errors.userLastName && (
            <p className="text-base text-primary">
              {t(errors.userLastName.message as string)}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label variant="auth">{t("register.step3.firstName")}</Label>
          <Input
            variant="auth"
            placeholder={t("register.step3.firstNamePlaceholder")}
            aria-invalid={!!errors.userFirstName}
            {...register("userFirstName")}
          />
          {errors.userFirstName && (
            <p className="text-base text-primary">
              {t(errors.userFirstName.message as string)}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label variant="auth">{t("register.step3.email")}</Label>
          <Input
            variant="auth"
            type="email"
            placeholder={t("register.step3.emailPlaceholder")}
            aria-invalid={!!errors.userEmail}
            {...register("userEmail")}
          />
          {errors.userEmail && (
            <p className="text-base text-primary">
              {t(errors.userEmail.message as string)}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label variant="auth">{t("register.step3.phone")}</Label>
          <Input
            variant="auth"
            placeholder={t("register.step3.phonePlaceholder")}
            type="tel"
            aria-invalid={!!errors.userPhoneNumber}
            value={phoneDisplay}
            onChange={handlePhoneChange}
          />
          {errors.userPhoneNumber && (
            <p className="text-base text-primary">
              {t(errors.userPhoneNumber.message as string)}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label variant="auth">{t("register.step3.password")}</Label>
          <PasswordInput
            variant="auth"
            placeholder={t("register.step3.passwordPlaceholder")}
            aria-invalid={!!errors.userPassword}
            {...register("userPassword")}
          />
          {errors.userPassword && (
            <p className="text-base text-primary">
              {t(errors.userPassword.message as string)}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label variant="auth">{t("register.step3.confirmPassword")}</Label>
          <PasswordInput
            variant="auth"
            placeholder={t("register.step3.confirmPasswordPlaceholder")}
            aria-invalid={!!errors.userPasswordConfirmation}
            {...register("userPasswordConfirmation")}
          />
          {errors.userPasswordConfirmation && (
            <p className="text-base text-primary">
              {t(errors.userPasswordConfirmation.message as string)}
            </p>
          )}
        </div>
      </div>

      {registerMutation.isError && (
        <p className="text-base text-primary">
          {t(`register.errors.${registerMutation.error.message}`)}
        </p>
      )}

      <div className="flex gap-4 [&>*]:min-w-0 [&>*]:flex-1">
        <Button
          type="button"
          variant="auth-secondary"
          size="auth"
          onClick={onBack}
        >
          {t("register.step3.back")}
        </Button>
        <Button
          type="button"
          size="auth"
          disabled={registerMutation.isPending}
          onClick={handleSubmit}
        >
          {t("register.step3.submit")}
        </Button>
      </div>
    </div>
  );
};
