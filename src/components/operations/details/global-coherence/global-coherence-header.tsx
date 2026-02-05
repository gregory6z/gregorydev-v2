import { useTranslation } from "react-i18next";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/operations/status-badge";
import type { CoherenceStatusType } from "@/api/operations/schemas";

type GlobalCoherenceHeaderProps = {
  globalStatus: CoherenceStatusType;
  onDownload: () => void;
};

export const GlobalCoherenceHeader = ({
  globalStatus,
  onDownload,
}: GlobalCoherenceHeaderProps) => {
  const { t } = useTranslation("operations");

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <h2 className="font-display text-[34px] font-normal leading-[140%]">
          {t("globalCoherence.title")}
        </h2>
        <StatusBadge status={globalStatus} />
      </div>
      <Button
        size="sm"
        onClick={onDownload}
        className="bg-[#007F72] hover:bg-[#007F72]/90 text-white"
      >
        <Download className="size-4" data-icon="inline-start" />
        {t("globalCoherence.download")}
      </Button>
    </div>
  );
};
