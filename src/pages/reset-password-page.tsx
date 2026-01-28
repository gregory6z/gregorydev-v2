import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ResetPasswordForm } from "@/components/auth/reset-password-form";
import { ResetPasswordSuccess } from "@/components/auth/reset-password-success";

export const ResetPasswordPage = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");

  useEffect(() => {
    if (!token) {
      navigate("/login", { replace: true });
    }
  }, [token, navigate]);

  if (!token) return null;

  return isSuccess ? (
    <ResetPasswordSuccess />
  ) : (
    <ResetPasswordForm onSuccess={() => setIsSuccess(true)} />
  );
};
