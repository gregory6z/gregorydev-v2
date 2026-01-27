import { Navigate, Outlet } from "react-router-dom";

// Redirects authenticated users away from public pages (login, register, etc.)
export const PublicLayout = () => {
  const token = localStorage.getItem("token");

  if (token) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};
