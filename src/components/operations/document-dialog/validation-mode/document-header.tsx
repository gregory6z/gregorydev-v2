import { useTranslation } from "react-i18next";
import { StatusBadge } from "@/components/operations/status-badge";
import type { FileStatusType } from "@/api/operations/schemas";

type DocumentHeaderProps = {
  name: string;
  conformityStatus: FileStatusType;
  submissionCount: number;
  lastSubmissionAt: string;
};

export function DocumentHeader({
  name,
  conformityStatus,
  submissionCount,
  lastSubmissionAt,
}: DocumentHeaderProps) {
  const { t } = useTranslation("operations");

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div data-slot="document-header">
      <div className="flex items-center gap-3">
        <h2 className="font-display text-2xl font-normal">{name}</h2>
        <StatusBadge status={conformityStatus} />
        <span className="rounded-md bg-surface px-2 py-1 text-sm text-gray-300">
          {t("documentDialog.submittedTimes", { count: submissionCount })}
        </span>
      </div>
      <p className="mt-2 text-sm text-muted-foreground">
        {t("documentDialog.lastSubmission", {
          count: submissionCount,
          date: formatDate(lastSubmissionAt),
        })}
      </p>
    </div>
  );
}
