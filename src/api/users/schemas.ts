import { z } from "zod/v4";
import { FRENCH_PHONE_REGEX, isValidLuhn } from "@/helpers/validators";

// ── Shared Fields ────────────────────────────────────────────────────────────

const phoneField = z
  .string()
  .min(1, "validation.phoneRequired")
  .regex(FRENCH_PHONE_REGEX, "validation.phoneInvalid");

const emailField = z.email("validation.emailInvalid");

const passwordField = z
  .string()
  .min(8, "validation.passwordMinLength")
  .regex(/[A-Z]/, "validation.passwordUppercase")
  .regex(/[a-z]/, "validation.passwordLowercase")
  .regex(/\d/, "validation.passwordDigit")
  .regex(/[^A-Za-z0-9]/, "validation.passwordSpecial");

const passwordConfirmationField = z
  .string()
  .min(1, "validation.confirmPasswordRequired");

/** Refine helper for password confirmation */
const withPasswordConfirmation = <
  T extends { userPassword: string; userPasswordConfirmation: string },
>(
  schema: z.ZodType<T>,
) =>
  schema.refine((data) => data.userPassword === data.userPasswordConfirmation, {
    message: "validation.passwordsMismatch",
    path: ["userPasswordConfirmation"],
  });

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
  companyName: string;
  streetNumber: string;
  streetType: string;
  streetName: string;
  postalCode: string;
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

const userFieldsSchema = z.object({
  userLastName: z.string().min(1, "validation.lastNameRequired"),
  userFirstName: z.string().min(1, "validation.firstNameRequired"),
  userEmail: emailField,
  userPhoneNumber: phoneField,
  userPassword: passwordField,
  userPasswordConfirmation: passwordConfirmationField,
});

export const userSchema = withPasswordConfirmation(userFieldsSchema);

export type UserFormData = z.infer<typeof userSchema>;

// ── Register Full Form ───────────────────────────────────────────────────────

export const registerSchema = withPasswordConfirmation(
  z.object({
    ...siretSchema.shape,
    ...companySchema.shape,
    ...userFieldsSchema.shape,
  }),
);

export type RegisterFormData = z.infer<typeof registerSchema>;

export type RegisterResponse = {
  email: string;
};

// ── Forgot Password ──────────────────────────────────────────────────────────

export const forgotPasswordSchema = z.object({
  email: emailField,
});

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

// ── Reset Password ───────────────────────────────────────────────────────────

export const resetPasswordSchema = z
  .object({
    password: passwordField,
    passwordConfirmation: passwordConfirmationField,
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
  title: string;
};

export type Company = {
  id: number;
  name: string;
  siret: string;
  address: string;
  postalCode: string;
  city: string;
  phoneNumber: string;
};

export type UserProfile = {
  id: number;
  idCompany: number;
  company: Company;
};

export type UserMeResponse = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  userGroup: UserGroup;
  userProfile: UserProfile;
};

// ── Account: Update Personal Info ────────────────────────────────────────────

export const updatePersonalInfoSchema = z.object({
  firstName: z
    .string()
    .min(2, "validation.firstNameMinLength")
    .max(50, "validation.firstNameMaxLength"),
  lastName: z
    .string()
    .min(2, "validation.lastNameMinLength")
    .max(50, "validation.lastNameMaxLength"),
  phoneNumber: phoneField,
});

export type UpdatePersonalInfoFormData = z.infer<
  typeof updatePersonalInfoSchema
>;

// ── Account: Change Password ─────────────────────────────────────────────────

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "validation.currentPasswordRequired"),
    newPassword: passwordField,
    newPasswordConfirmation: passwordConfirmationField,
  })
  .refine((data) => data.newPassword === data.newPasswordConfirmation, {
    message: "validation.passwordsMismatch",
    path: ["newPasswordConfirmation"],
  });

export type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;

// ── Account: API Response ────────────────────────────────────────────────────

export type UpdateUserMeResponse = {
  id: number;
  firstName: string;
  lastName: string;
};
