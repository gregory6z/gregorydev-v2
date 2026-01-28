import { z } from "zod/v4";
import { FRENCH_PHONE_REGEX, isValidLuhn } from "@/helpers/validators";

/** French phone field — validation only, no transform */
const phoneField = z
  .string()
  .min(1, "validation.phoneRequired")
  .regex(FRENCH_PHONE_REGEX, "validation.phoneInvalid");

// ──────────────────────────────────────────────
// Login
// ──────────────────────────────────────────────

export const loginSchema = z.object({
  email: z.email("validation.emailInvalid"),
  password: z.string().min(1, "validation.passwordRequired"),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export type LoginResponse = {
  access_token: string;
};

// ──────────────────────────────────────────────
// Register — Step 1: SIRET
// ──────────────────────────────────────────────

export const siretSchema = z.object({
  siret: z
    .string()
    .min(1, "validation.siretRequired")
    .regex(/^\d{14}$/, "validation.siretFormat")
    .refine(isValidLuhn, "validation.siretInvalid"),
});

export type SiretFormData = z.infer<typeof siretSchema>;

export type SiretLookupResponse = {
  companyName: string;
  address: string;
};

// ──────────────────────────────────────────────
// Register — Step 2: Company verification
// ──────────────────────────────────────────────

export const companySchema = z.object({
  companyName: z.string(),
  address: z.string(),
  phone: phoneField,
});

export type CompanyFormData = z.infer<typeof companySchema>;

// ──────────────────────────────────────────────
// Register — Step 3: User info + password
// ──────────────────────────────────────────────

export const userSchema = z
  .object({
    lastName: z.string().min(1, "validation.lastNameRequired"),
    firstName: z.string().min(1, "validation.firstNameRequired"),
    email: z.email("validation.emailInvalid"),
    userPhone: phoneField,
    password: z
      .string()
      .min(8, "validation.passwordMinLength")
      .regex(/[A-Z]/, "validation.passwordUppercase")
      .regex(/[a-z]/, "validation.passwordLowercase")
      .regex(/\d/, "validation.passwordDigit")
      .regex(/[^A-Za-z0-9]/, "validation.passwordSpecial"),
    confirmPassword: z.string().min(1, "validation.confirmPasswordRequired"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "validation.passwordsMismatch",
    path: ["confirmPassword"],
  });

export type UserFormData = z.infer<typeof userSchema>;

// ──────────────────────────────────────────────
// Register — Full form (union of 3 steps)
// ──────────────────────────────────────────────

export const registerSchema = siretSchema.merge(companySchema).merge(
  z.object({
    lastName: z.string().min(1),
    firstName: z.string().min(1),
    email: z.email(),
    userPhone: z.string().min(1),
    password: z.string().min(8),
    confirmPassword: z.string().min(1),
  }),
);

export type RegisterFormData = z.infer<typeof registerSchema>;

export type RegisterResponse = {
  id: string;
  status: "PENDING";
};
