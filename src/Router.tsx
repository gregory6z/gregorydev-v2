import { createBrowserRouter } from "react-router-dom";
import { RouteLayout } from "@/components/route-layout";
import { AuthLayout } from "@/components/auth/auth-layout";
import { LoginPage } from "@/pages/login-page";
import { RegisterPage } from "@/pages/register-page";

export const router = createBrowserRouter([
  {
    element: <RouteLayout type="public" />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          { path: "/", element: <LoginPage /> },
          { path: "/login", element: <LoginPage /> },
          { path: "/register", element: <RegisterPage /> },
        ],
      },
    ],
  },
  {
    element: <RouteLayout type="private" />,
    children: [],
  },
]);
