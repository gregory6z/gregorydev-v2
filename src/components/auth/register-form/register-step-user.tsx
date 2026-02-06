import { useFormContext, useFormState } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useRegister } from "@/api/users/mutations";
import { usePhoneInput } from "@/hooks/use-phone-input";
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

  const { register, setValue, trigger, getValues, control } =
    useFormContext<RegisterFormData>();

  // useFormState subscribes to formState changes and triggers re-renders
  const { errors } = useFormState({ control });

  const { phoneDisplay, handlePhoneChange } = usePhoneInput(
    getValues("userPhoneNumber") ?? "",
    (value, options) => setValue("userPhoneNumber", value, options),
  );

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
