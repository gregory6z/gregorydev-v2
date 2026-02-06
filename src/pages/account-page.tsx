import { useTranslation } from "react-i18next";
import { Loader2 } from "lucide-react";

import { useUserMe } from "@/api/users/queries";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CameraIcon } from "@/components/icons";
import { PersonalInfoForm } from "@/components/account/personal-info-form";
import { ChangePasswordForm } from "@/components/account/change-password-form";

export const AccountPage = () => {
  const { t } = useTranslation("account");
  const { data: user, isLoading } = useUserMe();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="size-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const initials = `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();

  return (
    <div className="relative pb-8">
      <h1 className="absolute top-0 left-0 font-display text-[42px] font-normal leading-[140%] uppercase">
        {t("title")}
      </h1>

      <div className="max-w-[890px] mx-auto pt-6">
        {/* Avatar */}
        <div className="flex flex-col items-center mb-10">
          <Avatar className="size-[140px]">
            <AvatarFallback className="text-3xl font-medium bg-surface text-foreground">
              {initials}
            </AvatarFallback>
          </Avatar>
          <Button
            variant="link-dark"
            className="mt-3 gap-2 font-display text-base font-semibold leading-5"
          >
            <CameraIcon />
            {t("editPhoto")}
          </Button>
        </div>

        {/* Personal Info */}
        <PersonalInfoForm user={user} />

        <Separator className="my-10" />

        {/* Change Password */}
        <ChangePasswordForm />
      </div>
    </div>
  );
};
