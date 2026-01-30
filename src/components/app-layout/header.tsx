import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ChevronDown } from "lucide-react";

import { useAuth } from "@/contexts/auth-context";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import logo from "@/assets/energer-logo.svg";

// TODO: Replace with useUser hook when available
const useMockUser = () => ({
  firstName: "Antoine",
  lastName: "Dupont",
});

export function Header() {
  const { t } = useTranslation("common");
  const { logout } = useAuth();
  const user = useMockUser();

  const initials = `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();
  const displayName = `${user.firstName[0]}. ${user.lastName}`;

  return (
    <header className="h-16 bg-white border-b border-table-border">
      <div className="max-w-[1380px] mx-auto px-6 h-full flex items-center justify-between">
        <Link to="/operations">
          <img src={logo} alt="Energer" className="h-8" />
        </Link>

        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button
                variant="ghost"
                className="gap-[9px] hover:bg-transparent aria-expanded:bg-transparent"
              >
                <Avatar className="size-[34px] bg-surface">
                  <AvatarFallback className="text-sm font-medium bg-surface text-foreground">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <span className="font-display text-base font-medium leading-[140%]">
                  {displayName}
                </span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            }
          />
          <DropdownMenuContent align="end">
            <DropdownMenuItem>{t("header.myAccount")}</DropdownMenuItem>
            <DropdownMenuItem onClick={logout}>
              {t("header.logout")}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
