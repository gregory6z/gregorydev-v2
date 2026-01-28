import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useRegister } from "@/api/auth/mutations";
import { formatPhone } from "@/helpers/formatters";
import type { RegisterFormData } from "@/api/auth/schemas";
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
    formatPhone(getValues("userPhone") ?? ""),
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
        setValue("userPhone", rawValue, { shouldValidate: false });
      } else if (digitsAfterPrefix.length <= 2) {
        // User is still typing +3 or +33
        setPhoneDisplay(input);
        setValue("userPhone", input, { shouldValidate: false });
      }
    } else {
      // National format: 10 digits
      const digits = input.replace(/\D/g, "").slice(0, 10);
      const formatted = formatPhone(digits);
      setPhoneDisplay(formatted);
      setValue("userPhone", digits, { shouldValidate: false });
    }
  };

  const handleSubmit = async () => {
    const valid = await trigger([
      "lastName",
      "firstName",
      "email",
      "userPhone",
      "password",
      "confirmPassword",
    ]);
    if (!valid) return;

    const values = getValues();

    if (values.password !== values.confirmPassword) return;

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
            aria-invalid={!!errors.lastName}
            {...register("lastName")}
          />
          {errors.lastName && (
            <p className="text-base text-primary">
              {t(errors.lastName.message as string)}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label variant="auth">{t("register.step3.firstName")}</Label>
          <Input
            variant="auth"
            placeholder={t("register.step3.firstNamePlaceholder")}
            aria-invalid={!!errors.firstName}
            {...register("firstName")}
          />
          {errors.firstName && (
            <p className="text-base text-primary">
              {t(errors.firstName.message as string)}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label variant="auth">{t("register.step3.email")}</Label>
          <Input
            variant="auth"
            type="email"
            placeholder={t("register.step3.emailPlaceholder")}
            aria-invalid={!!errors.email}
            {...register("email")}
          />
          {errors.email && (
            <p className="text-base text-primary">
              {t(errors.email.message as string)}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label variant="auth">{t("register.step3.phone")}</Label>
          <Input
            variant="auth"
            placeholder={t("register.step3.phonePlaceholder")}
            type="tel"
            aria-invalid={!!errors.userPhone}
            value={phoneDisplay}
            onChange={handlePhoneChange}
          />
          {errors.userPhone && (
            <p className="text-base text-primary">
              {t(errors.userPhone.message as string)}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label variant="auth">{t("register.step3.password")}</Label>
          <PasswordInput
            variant="auth"
            placeholder={t("register.step3.passwordPlaceholder")}
            aria-invalid={!!errors.password}
            {...register("password")}
          />
          {errors.password && (
            <p className="text-base text-primary">
              {t(errors.password.message as string)}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label variant="auth">{t("register.step3.confirmPassword")}</Label>
          <PasswordInput
            variant="auth"
            placeholder={t("register.step3.confirmPasswordPlaceholder")}
            aria-invalid={!!errors.confirmPassword}
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <p className="text-base text-primary">
              {t(errors.confirmPassword.message as string)}
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
