import { Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { DocumentDetails } from "@/api/operations/schemas";
import { DocumentHeader } from "./document-header";
import { DocumentInfo } from "./document-info";
import { AnalysisTable } from "./analysis-table";
import { VersionSelector } from "./version-selector";

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

  if (isLoading || !documentDetails) {
    return (
      <div className="mt-5 flex flex-1 flex-col items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="size-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">
            {t("documentDialog.analyzing")}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-5 flex flex-1 flex-col overflow-hidden">
      <DocumentHeader
        name={documentDetails.name}
        conformityStatus={documentDetails.conformityStatus}
        submissionCount={documentDetails.submissionCount}
        lastSubmissionAt={documentDetails.lastSubmissionAt}
      />

      <div className="mt-6 flex-1 space-y-6 overflow-y-auto">
        <DocumentInfo
          beneficiary={documentDetails.beneficiary}
          professional={documentDetails.professional}
          qrCodeUrl={documentDetails.qrCodeUrl}
        />

        <AnalysisTable verifications={documentDetails.verifications} />
      </div>

      <VersionSelector
        versions={documentDetails.versions}
        currentVersionId={selectedVersionId}
        onVersionSelect={onVersionSelect}
        onNewVersion={onNewVersion}
        isUploadingNewVersion={isUploadingNewVersion}
      />
    </div>
  );
}
