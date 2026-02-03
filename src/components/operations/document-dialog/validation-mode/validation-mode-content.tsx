import { useTranslation } from "react-i18next";
import { Loader2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ValidationModeInfo } from "@/components/operations/document-dialog/validation-mode/validation-mode-info";
import { AnalysisTable } from "@/components/operations/document-dialog/validation-mode/analysis-table";
import { ValidationModeFooter } from "@/components/operations/document-dialog/validation-mode/validation-mode-footer";
import type { DocumentDetails } from "@/api/operations/schemas";

type ValidationModeContentProps = {
  isLoading: boolean;
  documentDetails: DocumentDetails | null;
  selectedVersionId: string;
  onVersionSelect: (versionId: string) => void;
  onNewVersion: (file: File) => void;
  isUploadingNewVersion: boolean;
};

export function ValidationModeContent({
  isLoading,
  documentDetails,
  selectedVersionId,
  onVersionSelect,
  onNewVersion,
  isUploadingNewVersion,
}: ValidationModeContentProps) {
  const { t } = useTranslation("operations");

  if (isLoading) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-4">
        <Loader2 className="size-8 animate-spin text-primary" />
        <p className="text-sm text-muted-foreground">
          {t("documentDialog.analyzing")}
        </p>
      </div>
    );
  }

  if (!documentDetails) {
    return null;
  }

  const formattedLastSubmission = new Date(
    documentDetails.lastSubmissionAt,
  ).toLocaleString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return (
    <div className="mt-2 flex flex-1 flex-col overflow-hidden">
      {/* Scrollable content */}
      <ScrollArea className="flex-1">
        <div className="flex flex-col gap-6 pr-4">
          {/* Subtitle */}
          <p className="text-sm text-muted-foreground">
            {t("documentDialog.lastSubmission", {
              count: documentDetails.submissionCount,
              date: formattedLastSubmission,
            })}
          </p>

          <ValidationModeInfo
            beneficiary={documentDetails.beneficiary}
            professional={documentDetails.professional}
          />

          <AnalysisTable verifications={documentDetails.verifications} />
        </div>
      </ScrollArea>

      {/* Fixed footer with version buttons */}
      <ValidationModeFooter
        versions={documentDetails.versions}
        selectedVersionId={selectedVersionId}
        onVersionSelect={onVersionSelect}
        onNewVersion={onNewVersion}
        isUploading={isUploadingNewVersion}
      />
    </div>
  );
}
