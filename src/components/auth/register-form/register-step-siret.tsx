import { useState } from "react";
import { useFormContext, useFormState } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useLookupSiret } from "@/api/users/mutations";
import { formatSiret } from "@/helpers/formatters";
import type {
  RegisterFormData,
  SiretLookupResponse,
} from "@/api/users/schemas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type RegisterStepSiretProps = {
  onNext: (data: SiretLookupResponse) => void;
};

export const RegisterStepSiret = ({ onNext }: RegisterStepSiretProps) => {
  const { t } = useTranslation("auth");
  const lookupSiret = useLookupSiret();

  const { setValue, trigger, getValues, control } =
    useFormContext<RegisterFormData>();

  const { errors } = useFormState({ control });

  const [display, setDisplay] = useState(() =>
    formatSiret(getValues("companySiret") ?? ""),
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, "").slice(0, 14);
    const formatted = formatSiret(digits);
    setDisplay(formatted);
    setValue("companySiret", digits, { shouldValidate: false });
  };

  const handleNext = async () => {
    const valid = await trigger("companySiret");
    if (!valid) return;

    lookupSiret.mutate(getValues("companySiret"), {
      onSuccess: (data) => onNext(data),
    });
  };

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-1.5">
        <Label variant="auth">{t("register.step1.siret")}</Label>
        <Input
          variant="auth"
          placeholder={t("register.step1.siretPlaceholder")}
          inputMode="numeric"
          aria-invalid={!!errors.companySiret}
          value={display}
          onChange={handleChange}
        />
        {errors.companySiret && (
          <p className="text-base text-primary">
            {t(errors.companySiret.message as string)}
          </p>
        )}
      </div>

      {lookupSiret.isError && (
        <p className="text-base text-primary">
          {t(`register.errors.${lookupSiret.error.message}`)}
        </p>
      )}

      <Button
        type="button"
        size="auth"
        disabled={lookupSiret.isPending}
        onClick={handleNext}
      >
        {t("register.step1.next")}
      </Button>
    </div>
  );
};
