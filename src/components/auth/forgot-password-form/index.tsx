import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import {
  forgotPasswordSchema,
  type ForgotPasswordFormData,
} from "@/api/auth/schemas";
import { useForgotPassword } from "@/api/auth/mutations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const ForgotPasswordForm = () => {
  const { t } = useTranslation("auth");
  const navigate = useNavigate();
  const mutation = useForgotPassword();
  const [submittedEmail, setSubmittedEmail] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = (data: ForgotPasswordFormData) => {
    mutation.mutate(data, {
      onSuccess: () => setSubmittedEmail(data.email),
    });
  };

  if (submittedEmail !== null) {
    return (
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-4">
          <h2 className="font-display text-[32px] font-semibold leading-[100%] text-white">
            {t("resetPassword.title")}
          </h2>
          <p className="font-display text-lg font-normal leading-[140%] text-white/60">
            {t("resetPassword.confirmationText")}
          </p>
          <p className="font-display text-lg font-semibold text-white">
            {submittedEmail}
          </p>
        </div>

        <Button size="auth" onClick={() => navigate("/login")}>
          {t("resetPassword.backToLogin")}
        </Button>
      </div>
    );
  }

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
        <div className="flex flex-col gap-1.5">
          <Label variant="auth">{t("resetPassword.email")}</Label>
          <Input
            variant="auth"
            type="email"
            placeholder={t("resetPassword.emailPlaceholder")}
            {...register("email")}
            aria-invalid={!!errors.email}
          />
          {errors.email && (
            <p className="text-base text-primary">{t(errors.email.message!)}</p>
          )}
        </div>

        {mutation.isError && (
          <p className="text-base text-primary">
            {t(`resetPassword.errors.${mutation.error.message}`)}
          </p>
        )}

        <div className="flex gap-4">
          <Button
            type="button"
            variant="auth-secondary"
            size="auth"
            className="w-1/2"
            onClick={() => navigate("/login")}
          >
            {t("resetPassword.cancel")}
          </Button>
          <Button
            type="submit"
            size="auth"
            className="w-1/2"
            disabled={mutation.isPending}
          >
            {t("resetPassword.send")}
          </Button>
        </div>
      </form>
    </div>
  );
};
