import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/auth-context";

export const DashboardPage = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <button
          type="button"
          onClick={handleLogout}
          className="rounded-lg bg-primary px-6 py-3 text-white transition-colors hover:bg-primary/80"
        >
          Se déconnecter
        </button>
      </div>
    </div>
  );
};
