import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import {
  resetPasswordSchema,
  type ResetPasswordFormData,
} from "@/api/users/schemas";
import { useResetPassword } from "@/api/users/mutations";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/ui/password-input";

type ResetPasswordFormProps = {
  onSuccess: () => void;
};

export const ResetPasswordForm = ({ onSuccess }: ResetPasswordFormProps) => {
  const { t } = useTranslation("auth");
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token")!;
  const mutation = useResetPassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = (data: ResetPasswordFormData) => {
    mutation.mutate({ token, data }, { onSuccess: () => onSuccess() });
  };

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-4">
        <h2 className="font-display text-[32px] font-semibold leading-[100%] text-white">
          {t("resetPassword.title")}
        </h2>
        <p className="font-display text-lg font-normal leading-[140%] text-white/60">
          {t("resetPassword.subtitle")}
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-10">
        <div className="flex flex-col gap-3.5">
          <div className="flex flex-col gap-1.5">
            <Label variant="auth">{t("resetPassword.newPassword")}</Label>
            <PasswordInput
              variant="auth"
              placeholder={t("resetPassword.newPasswordPlaceholder")}
              {...register("password")}
              aria-invalid={!!errors.password}
            />
            {errors.password && (
              <p className="text-base text-primary">
                {t(errors.password.message!)}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <Label variant="auth">{t("resetPassword.confirmPassword")}</Label>
            <PasswordInput
              variant="auth"
              placeholder={t("resetPassword.confirmPasswordPlaceholder")}
              {...register("passwordConfirmation")}
              aria-invalid={!!errors.passwordConfirmation}
            />
            {errors.passwordConfirmation && (
              <p className="text-base text-primary">
                {t(errors.passwordConfirmation.message!)}
              </p>
            )}
          </div>
        </div>

        {mutation.isError && (
          <p className="text-base text-primary">
            {t(`resetPassword.errors.${mutation.error.message}`)}
          </p>
        )}

        <Button type="submit" size="auth" disabled={mutation.isPending}>
          {t("resetPassword.validate")}
        </Button>
      </form>
    </div>
  );
};
