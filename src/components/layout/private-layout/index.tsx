import { Navigate, Outlet } from "react-router-dom";

// Redirects unauthenticated users to login page.
export const PrivateLayout = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};
