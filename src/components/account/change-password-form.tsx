import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";

import {
  changePasswordSchema,
  type ChangePasswordFormData,
} from "@/api/users/schemas";
import { useChangePassword } from "@/api/users/mutations";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/ui/password-input";

export const ChangePasswordForm = () => {
  const { t } = useTranslation("account");
  const mutation = useChangePassword();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      newPasswordConfirmation: "",
    },
  });

  const currentValues = watch();
  const hasChanges =
    currentValues.currentPassword !== "" ||
    currentValues.newPassword !== "" ||
    currentValues.newPasswordConfirmation !== "";

  const onSubmit = (data: ChangePasswordFormData) => {
    mutation.mutate(data, {
      onSuccess: () => {
        reset();
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <h2 className="font-display text-lg font-semibold leading-[140%] text-primary-dark">
        {t("password")}
      </h2>

      {/* Row 1: Current password (half-width) */}
      <div className="grid grid-cols-2 gap-x-6">
        <div className="space-y-2">
          <Label htmlFor="currentPassword" variant="account">
            {t("currentPassword")}
          </Label>
          <PasswordInput
            id="currentPassword"
            variant="account"
            {...register("currentPassword")}
          />
          {errors.currentPassword && (
            <p className="text-sm text-destructive">
              {t(errors.currentPassword.message as string)}
            </p>
          )}
        </div>
      </div>

      {/* Row 2: New password | Confirm */}
      <div className="grid grid-cols-2 gap-x-6">
        <div className="space-y-2">
          <Label htmlFor="newPassword" variant="account">
            {t("newPassword")}
          </Label>
          <PasswordInput
            id="newPassword"
            variant="account"
            {...register("newPassword")}
          />
          {errors.newPassword && (
            <p className="text-sm text-destructive">
              {t(errors.newPassword.message as string)}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="newPasswordConfirmation" variant="account">
            {t("confirmNewPassword")}
          </Label>
          <PasswordInput
            id="newPasswordConfirmation"
            variant="account"
            {...register("newPasswordConfirmation")}
          />
          {errors.newPasswordConfirmation && (
            <p className="text-sm text-destructive">
              {t(errors.newPasswordConfirmation.message as string)}
            </p>
          )}
        </div>
      </div>

      {mutation.error && (
        <p className="text-sm text-destructive text-center">
          {t(`errors.${mutation.error.message}`)}
        </p>
      )}

      <div className="flex justify-center pt-4">
        <Button
          type="submit"
          variant="primary-dark"
          size="account"
          disabled={!hasChanges || mutation.isPending}
        >
          {mutation.isPending ? t("common:saving") : t("changePassword")}
        </Button>
      </div>
    </form>
  );
};
