import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/contexts/auth-context";

type RouteLayoutProps = {
  type: "public" | "private";
};

export const RouteLayout = ({ type }: RouteLayoutProps) => {
  const { isAuthenticated } = useAuth();

  if (type === "public" && isAuthenticated) {
    return <Navigate to="/operations" replace />;
  }

  if (type === "private" && !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};
