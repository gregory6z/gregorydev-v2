import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import { PlusIcon } from "@/components/icons";

type OperationsHeaderProps = {
  onCreateClick: () => void;
};

export function OperationsHeader({ onCreateClick }: OperationsHeaderProps) {
  const { t } = useTranslation("dashboard");
  const { t: tOp } = useTranslation("operations");

  return (
    <div className="flex items-center justify-between">
      <h1 className="font-display text-[42px] font-normal uppercase leading-none">
        {t("title")}
      </h1>
      <Button variant="primary-dark" onClick={onCreateClick}>
        <PlusIcon className="size-2.5" />
        {tOp("create")}
      </Button>
    </div>
  );
}
