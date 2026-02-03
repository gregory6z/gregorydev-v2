import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { loginSchema, type LoginFormData } from "@/api/auth/schemas";
import { useLogin } from "@/api/auth/mutations";
import { useAuth } from "@/contexts/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/ui/password-input";

export const LoginForm = () => {
  const { t } = useTranslation("auth");
  const navigate = useNavigate();
  const auth = useAuth();
  const loginMutation = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormData) => {
    loginMutation.mutate(data, {
      onSuccess: (response) => {
        auth.login(response.accessToken);
        navigate("/operations");
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-10">
      <div className="flex flex-col gap-3.5">
        <div className="flex flex-col gap-1.5">
          <Label variant="auth">{t("login.email")}</Label>
          <Input
            type="email"
            variant="auth"
            placeholder={t("login.emailPlaceholder")}
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
          <Label variant="auth">{t("login.password")}</Label>
          <PasswordInput
            variant="auth"
            placeholder={t("login.passwordPlaceholder")}
            aria-invalid={!!errors.password}
            {...register("password")}
          />
          {errors.password && (
            <p className="text-base text-primary">
              {t(errors.password.message as string)}
            </p>
          )}
        </div>

        {loginMutation.error && (
          <p className="text-base text-primary">
            {t(`errors.${loginMutation.error.message}`)}
          </p>
        )}
      </div>

      <Button type="submit" disabled={loginMutation.isPending} size="auth">
        {t("login.submit")}
      </Button>

      <Link
        to="/forgot-password"
        className="font-display font-normal text-base leading-relaxed text-white/60 underline text-center hover:text-white"
      >
        {t("login.forgotPassword")}
      </Link>
    </form>
  );
};
