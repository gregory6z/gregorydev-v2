import { useFormContext, useFormState } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { usePhoneInput } from "@/hooks/use-phone-input";
import type { RegisterFormData } from "@/api/users/schemas";
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

  const { register, setValue, trigger, getValues, control } =
    useFormContext<RegisterFormData>();

  const { errors } = useFormState({ control });

  const { phoneDisplay, handlePhoneChange } = usePhoneInput(
    getValues("companyPhoneNumber") ?? "",
    (value, options) => setValue("companyPhoneNumber", value, options),
  );

  const handleNext = async () => {
    const valid = await trigger("companyPhoneNumber");
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
            {...register("companyAddress")}
          />
        </div>

        <div className="flex gap-3.5">
          <div className="flex w-1/3 flex-col gap-1.5">
            <Label variant="auth">{t("register.step2.postalCode")}</Label>
            <Input
              variant="auth"
              readOnly
              className="opacity-60"
              {...register("companyPostalCode")}
            />
          </div>

          <div className="flex flex-1 flex-col gap-1.5">
            <Label variant="auth">{t("register.step2.city")}</Label>
            <Input
              variant="auth"
              readOnly
              className="opacity-60"
              {...register("companyCity")}
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <Label variant="auth">{t("register.step2.phone")}</Label>
          <Input
            variant="auth"
            placeholder={t("register.step2.phonePlaceholder")}
            type="tel"
            aria-invalid={!!errors.companyPhoneNumber}
            value={phoneDisplay}
            onChange={handlePhoneChange}
          />
          {errors.companyPhoneNumber && (
            <p className="text-base text-primary">
              {t(errors.companyPhoneNumber.message as string)}
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
