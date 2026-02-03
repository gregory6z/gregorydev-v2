import { z } from "zod/v4";
import { FRENCH_PHONE_REGEX, isValidLuhn } from "@/helpers/validators";

/** French phone field — validation only, no transform */
const phoneField = z
  .string()
  .min(1, "validation.phoneRequired")
  .regex(FRENCH_PHONE_REGEX, "validation.phoneInvalid");

// ── Register Step 1: SIRET ───────────────────────────────────────────────────

export const siretSchema = z.object({
  companySiret: z
    .string()
    .min(1, "validation.siretRequired")
    .regex(/^\d{14}$/, "validation.siretFormat")
    .refine(isValidLuhn, "validation.siretInvalid"),
});

export type SiretFormData = z.infer<typeof siretSchema>;

export type SiretLookupResponse = {
  siret: string;
  name: string;
  address: string;
  postal_code: string;
  city: string;
};

// ── Register Step 2: Company ─────────────────────────────────────────────────

export const companySchema = z.object({
  companyName: z.string(),
  companyAddress: z.string(),
  companyPostalCode: z.string().min(1, "validation.postalCodeRequired"),
  companyCity: z.string().min(1, "validation.cityRequired"),
  companyPhoneNumber: phoneField,
});

export type CompanyFormData = z.infer<typeof companySchema>;

// ── Register Step 3: User ────────────────────────────────────────────────────

export const userSchema = z
  .object({
    userLastName: z.string().min(1, "validation.lastNameRequired"),
    userFirstName: z.string().min(1, "validation.firstNameRequired"),
    userEmail: z.email("validation.emailInvalid"),
    userPhoneNumber: phoneField,
    userPassword: z
      .string()
      .min(8, "validation.passwordMinLength")
      .regex(/[A-Z]/, "validation.passwordUppercase")
      .regex(/[a-z]/, "validation.passwordLowercase")
      .regex(/\d/, "validation.passwordDigit")
      .regex(/[^A-Za-z0-9]/, "validation.passwordSpecial"),
    userPasswordConfirmation: z
      .string()
      .min(1, "validation.confirmPasswordRequired"),
  })
  .refine((data) => data.userPassword === data.userPasswordConfirmation, {
    message: "validation.passwordsMismatch",
    path: ["userPasswordConfirmation"],
  });

export type UserFormData = z.infer<typeof userSchema>;

// ── Register Full Form ───────────────────────────────────────────────────────

export const registerSchema = siretSchema.merge(companySchema).merge(
  z.object({
    userLastName: z.string().min(1),
    userFirstName: z.string().min(1),
    userEmail: z.email(),
    userPhoneNumber: z.string().min(1),
    userPassword: z.string().min(8),
    userPasswordConfirmation: z.string().min(1),
  }),
);

export type RegisterFormData = z.infer<typeof registerSchema>;

export type RegisterResponse = {
  email: string;
};

// ── Forgot Password ──────────────────────────────────────────────────────────

export const forgotPasswordSchema = z.object({
  email: z.email("validation.emailInvalid"),
});

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

// ── Reset Password ───────────────────────────────────────────────────────────

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(12, "validation.passwordMinLength")
      .regex(/[A-Z]/, "validation.passwordUppercase")
      .regex(/[^A-Za-z0-9]/, "validation.passwordSpecial"),
    passwordConfirmation: z
      .string()
      .min(1, "validation.confirmPasswordRequired"),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "validation.passwordsMismatch",
    path: ["passwordConfirmation"],
  });

export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

// ── User Me ──────────────────────────────────────────────────────────────────

export type UserGroup = {
  id: number;
  code: "PRODUCER" | "PRINCIPAL" | "SUPERADMIN";
  name: string;
};

export type UserProfile = {
  id: number;
  id_company: number;
};

export type UserMeResponse = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  user_group: UserGroup;
  user_profile: UserProfile;
};
