import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { Loader2, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { DocumentVersion } from "@/api/operations/schemas";

type VersionSelectorProps = {
  versions: DocumentVersion[];
  currentVersionId: string;
  onVersionSelect: (versionId: string) => void;
  onNewVersion: (file: File) => void;
  isUploadingNewVersion?: boolean;
};

export function VersionSelector({
  versions,
  currentVersionId,
  onVersionSelect,
  onNewVersion,
  isUploadingNewVersion = false,
}: VersionSelectorProps) {
  const { t } = useTranslation("operations");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleNewVersionClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onNewVersion(file);
      // Reset input so the same file can be selected again if needed
      e.target.value = "";
    }
  };

  return (
    <div
      data-slot="version-selector"
      className="mt-auto flex items-center gap-3 border-t border-table-border bg-white pt-4"
    >
      {/* Version buttons */}
      <div className="flex gap-2">
        {versions.map((version) => (
          <Button
            key={version.id}
            variant={
              version.id === currentVersionId ? "primary-dark" : "outline"
            }
            size="sm"
            onClick={() => onVersionSelect(version.id)}
          >
            V{version.versionNumber}
          </Button>
        ))}
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* New version button */}
      <Button
        variant="primary-dark"
        onClick={handleNewVersionClick}
        disabled={isUploadingNewVersion}
      >
        {isUploadingNewVersion ? (
          <>
            <Loader2 className="mr-2 size-4 animate-spin" />
            {t("documentDialog.uploadingVersion")}
          </>
        ) : (
          <>
            <Upload className="mr-2 size-4" />
            {t("documentDialog.newVersion")}
          </>
        )}
      </Button>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf"
        onChange={handleFileSelected}
        className="hidden"
      />
    </div>
  );
}
