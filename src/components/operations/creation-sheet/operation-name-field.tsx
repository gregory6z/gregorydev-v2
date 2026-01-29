import { useTranslation } from "react-i18next";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { UseFormRegister, FieldErrors } from "react-hook-form";
import type { CreateOperationStep1Data } from "@/api/operations/schemas";

type OperationNameFieldProps = {
  register: UseFormRegister<CreateOperationStep1Data>;
  errors: FieldErrors<CreateOperationStep1Data>;
};

export function OperationNameField({
  register,
  errors,
}: OperationNameFieldProps) {
  const { t } = useTranslation("operations");

  return (
    <div data-slot="operation-name-field" className="space-y-2">
      <Label htmlFor="operation-name">{t("creation.nameLabel")}</Label>
      <Input
        id="operation-name"
        placeholder={t("creation.namePlaceholder")}
        aria-invalid={!!errors.name}
        className="h-[50px] focus-visible:ring-0"
        {...register("name")}
      />
      {errors.name && (
        <p className="text-sm text-destructive">
          {t(errors.name.message as string)}
        </p>
      )}
    </div>
  );
}
