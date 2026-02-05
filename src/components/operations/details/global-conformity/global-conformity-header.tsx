import { useTranslation } from "react-i18next";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/operations/status-badge";
import type { Status } from "@/api/operations/schemas/common";

type GlobalConformityHeaderProps = {
  globalStatus: Status;
  onDownload: () => void;
};

export const GlobalConformityHeader = ({
  globalStatus,
  onDownload,
}: GlobalConformityHeaderProps) => {
  const { t } = useTranslation("operations");

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <h2 className="font-display text-[34px] font-normal leading-[140%]">
          {t("globalConformity.title")}
        </h2>
        <StatusBadge code={globalStatus.code} type="conformity" />
      </div>
      <Button
        size="sm"
        onClick={onDownload}
        className="bg-[#007F72] hover:bg-[#007F72]/90 text-white"
      >
        <Download className="size-4" data-icon="inline-start" />
        {t("globalConformity.download")}
      </Button>
    </div>
  );
};
