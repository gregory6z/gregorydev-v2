import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import bgAuthenticate from "@/assets/bg-authenticate.png";
import energerLogoWhite from "@/assets/energer-logo-white.svg";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const AuthLayout = () => {
  const { t } = useTranslation("auth");
  const navigate = useNavigate();
  const location = useLocation();

  const activeTab = location.pathname === "/register" ? "register" : "login";

  const handleTabChange = (value: string | number | null) => {
    if (value === "register") {
      navigate("/register");
    } else if (value === "login") {
      navigate("/login");
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center bg-cover bg-center bg-no-repeat font-display pt-15 pb-15"
      style={{ backgroundImage: `url(${bgAuthenticate})` }}
    >
      <img src={energerLogoWhite} alt="Energer" className="w-67 h-16 mb-16" />
      <Card variant="auth">
        <div className="flex flex-col gap-10">
          <Tabs value={activeTab} onValueChange={handleTabChange}>
            <TabsList variant="auth">
              <TabsTrigger value="login">{t("tabs.login")}</TabsTrigger>
              <TabsTrigger value="register">{t("tabs.register")}</TabsTrigger>
            </TabsList>
          </Tabs>
          <Outlet />
        </div>
      </Card>
    </div>
  );
};
