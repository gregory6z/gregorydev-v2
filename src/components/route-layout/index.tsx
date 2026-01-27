import { Navigate, Outlet } from "react-router-dom";

type RouteLayoutProps = {
  type: "public" | "private";
};

export const RouteLayout = ({ type }: RouteLayoutProps) => {
  const token = localStorage.getItem("token");

  if (type === "public" && token) {
    return <Navigate to="/dashboard" replace />;
  }

  if (type === "private" && !token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};
