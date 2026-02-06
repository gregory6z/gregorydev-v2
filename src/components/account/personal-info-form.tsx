import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import { useQueryClient } from "@tanstack/react-query";

import {
  updatePersonalInfoSchema,
  type UpdatePersonalInfoFormData,
  type UserMeResponse,
} from "@/api/users/schemas";
import { useUpdatePersonalInfo } from "@/api/users/mutations";
import { usersKeys } from "@/api/users/queries";
import { usePhoneInput } from "@/hooks/use-phone-input";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type PersonalInfoFormProps = {
  user: UserMeResponse;
};

export const PersonalInfoForm = ({ user }: PersonalInfoFormProps) => {
  const { t } = useTranslation("account");
  const queryClient = useQueryClient();
  const mutation = useUpdatePersonalInfo();

  const defaultValues = {
    firstName: user.firstName,
    lastName: user.lastName,
    phoneNumber: user.phoneNumber,
  };

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<UpdatePersonalInfoFormData>({
    resolver: zodResolver(updatePersonalInfoSchema),
    defaultValues,
  });

  const currentValues = watch();
  const hasChanges =
    currentValues.firstName !== defaultValues.firstName ||
    currentValues.lastName !== defaultValues.lastName ||
    currentValues.phoneNumber !== defaultValues.phoneNumber;

  const { phoneDisplay, handlePhoneChange } = usePhoneInput(
    user.phoneNumber,
    (value, options) =>
      setValue("phoneNumber", value, { shouldDirty: true, ...options }),
  );

  const onSubmit = (data: UpdatePersonalInfoFormData) => {
    mutation.mutate(data, {
      onSettled: () => {
        queryClient.invalidateQueries({ queryKey: usersKeys.me() });
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <h2 className="font-display text-lg font-semibold leading-[140%] text-primary-dark">
        {t("personalInfo")}
      </h2>

      <div className="grid grid-cols-2 gap-x-6 gap-y-4">
        {/* Row 1: Nom | Prénom */}
        <div className="space-y-2">
          <Label htmlFor="lastName" variant="account">
            {t("lastName")}
          </Label>
          <Input id="lastName" variant="account" {...register("lastName")} />
          {errors.lastName && (
            <p className="text-sm text-destructive">
              {t(errors.lastName.message as string)}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="firstName" variant="account">
            {t("firstName")}
          </Label>
          <Input id="firstName" variant="account" {...register("firstName")} />
          {errors.firstName && (
            <p className="text-sm text-destructive">
              {t(errors.firstName.message as string)}
            </p>
          )}
        </div>

        {/* Row 2: Email (disabled) | Téléphone */}
        <div className="space-y-2">
          <Label variant="account">{t("email")}</Label>
          <Input value={user.email} disabled variant="account" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phoneNumber" variant="account">
            {t("phone")}
          </Label>
          <Input
            id="phoneNumber"
            type="tel"
            variant="account"
            value={phoneDisplay}
            onChange={handlePhoneChange}
          />
          {errors.phoneNumber && (
            <p className="text-sm text-destructive">
              {t(errors.phoneNumber.message as string)}
            </p>
          )}
        </div>

        {/* Row 3: Nom de l'entreprise (disabled) | Coordonnées (disabled) */}
        <div className="space-y-2">
          <Label variant="account">{t("companyName")}</Label>
          <Input
            value={user.userProfile.company?.name ?? ""}
            disabled
            variant="account"
          />
        </div>

        <div className="space-y-2">
          <Label variant="account">{t("coordinates")}</Label>
          <Input
            value={
              user.userProfile.company
                ? `${user.userProfile.company.address}, ${user.userProfile.company.postalCode} ${user.userProfile.company.city}`
                : ""
            }
            disabled
            variant="account"
          />
        </div>
      </div>

      {mutation.error && (
        <p className="text-sm text-destructive text-center">
          {t(`errors.${mutation.error.message}`)}
        </p>
      )}

      <div className="flex justify-center pt-4">
        <Button
          type="submit"
          variant="primary-dark"
          size="account"
          disabled={!hasChanges || mutation.isPending}
        >
          {mutation.isPending ? t("common:saving") : t("saveChanges")}
        </Button>
      </div>
    </form>
  );
};
