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
    const digits = e.target.value.replace(/\D/g, "").slice(0, 10);
    const formatted = formatPhone(digits);
    setPhoneDisplay(formatted);
    setValue("phone", digits, { shouldValidate: false });
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
            inputMode="tel"
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
