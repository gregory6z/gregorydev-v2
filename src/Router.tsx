import { createBrowserRouter } from "react-router-dom";
import { RouteLayout } from "@/components/route-layout";
import { AuthLayout } from "@/components/auth/auth-layout";
import { AppLayout } from "@/components/app-layout";
import { LoginPage } from "@/pages/login-page";
import { RegisterPage } from "@/pages/register-page";
import { ForgotPasswordPage } from "@/pages/forgot-password-page";
import { ResetPasswordPage } from "@/pages/reset-password-page";
import { OperationsPage } from "@/pages/operations-page";
import { OperationDetailsPage } from "@/pages/operation-details-page";

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
      {
        element: <AuthLayout showTabs={false} />,
        children: [
          { path: "/forgot-password", element: <ForgotPasswordPage /> },
          { path: "/reset-password", element: <ResetPasswordPage /> },
        ],
      },
    ],
  },
  {
    element: <RouteLayout type="private" />,
    children: [
      {
        element: <AppLayout />,
        children: [
          { path: "/operations", element: <OperationsPage /> },
          { path: "/operations/:id", element: <OperationDetailsPage /> },
        ],
      },
    ],
  },
]);
