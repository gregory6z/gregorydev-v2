import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const ResetPasswordSuccess = () => {
  const { t } = useTranslation("auth");
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-4">
        <h2 className="font-display text-[32px] font-semibold leading-[100%] text-white">
          {t("resetPassword.title")}
        </h2>
        <p className="font-display text-lg font-semibold text-white">
          {t("resetPassword.successTitle")}
        </p>
        <p className="font-display text-lg font-normal leading-[140%] text-white/60">
          {t("resetPassword.successMessage")}
        </p>
      </div>

      <Button size="auth" onClick={() => navigate("/login")}>
        {t("resetPassword.backToLogin")}
      </Button>
    </div>
  );
};
