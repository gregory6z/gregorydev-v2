import { useState } from "react";
import { Navigate, useSearchParams } from "react-router-dom";
import { ResetPasswordForm } from "@/components/auth/reset-password-form";
import { ResetPasswordSuccess } from "@/components/auth/reset-password-success";

export const ResetPasswordPage = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  if (!token) return <Navigate to="/login" replace />;

  return isSuccess ? (
    <ResetPasswordSuccess />
  ) : (
    <ResetPasswordForm onSuccess={() => setIsSuccess(true)} />
  );
};
