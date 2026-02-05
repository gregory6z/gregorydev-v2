import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";

export const RegisterConfirmation = () => {
  const { t } = useTranslation("auth");
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center gap-10 text-center">
      <div className="flex flex-col gap-4">
        <h2 className="font-display text-2xl font-semibold text-white">
          {t("register.confirmation.title")}
        </h2>
        <p className="font-display text-lg text-white/60">
          {t("register.confirmation.message")}
        </p>
      </div>

      <Button size="auth" onClick={() => navigate("/login")}>
        {t("register.confirmation.backToLogin")}
      </Button>
    </div>
  );
};
