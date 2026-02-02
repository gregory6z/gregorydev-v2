import { useTranslation } from "react-i18next";
import { StatusBadge } from "@/components/operations/status-badge";
import { TruncatedText } from "@/components/operations/details/files-table/truncated-text";
import type { DocumentVerification } from "@/api/operations/schemas";

type AnalysisTableProps = {
  verifications: DocumentVerification[];
};

export function AnalysisTable({ verifications }: AnalysisTableProps) {
  const { t } = useTranslation("operations");

  if (verifications.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        {t("documentDialog.noVerifications")}
      </p>
    );
  }

  return (
    <div className="flex flex-col">
      <h4 className="mb-4 font-display text-2xl font-medium leading-[140%] text-primary">
        {t("documentDialog.analysis")}
      </h4>
      <div className="flex flex-col">
        {verifications.map((verification) => (
          <div
            key={verification.id}
            className="flex min-h-[65px] items-center gap-4 border-t border-border py-2"
          >
            {/* Verification name - fixed width */}
            <div className="w-[200px] shrink-0">
              <TruncatedText
                text={verification.name}
                className="text-[13px] leading-[140%] text-black"
              />
            </div>
            {/* Status badge - fixed width */}
            <div className="w-[70px] shrink-0">
              <StatusBadge status={verification.status} short />
            </div>
            {/* Comment - takes remaining space */}
            <div className="flex-1">
              <TruncatedText
                text={verification.comment || "-"}
                className="text-[13px] leading-[140%] text-black"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
