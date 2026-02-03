import { z } from "zod/v4";

// ── Login ────────────────────────────────────────────────────────────────────

export const loginSchema = z.object({
  email: z.email("validation.emailInvalid"),
  password: z.string().min(1, "validation.passwordRequired"),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export type LoginResponse = {
  accessToken: string;
};
