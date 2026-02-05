import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { Upload, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { DocumentVersion } from "@/api/operations/schemas/document";

type ValidationModeFooterProps = {
  versions: DocumentVersion[];
  selectedVersionId: string;
  onVersionSelect: (versionId: string) => void;
  onNewVersion: (file: File) => void;
  isUploading: boolean;
};

export function ValidationModeFooter({
  versions,
  selectedVersionId,
  onVersionSelect,
  onNewVersion,
  isUploading,
}: ValidationModeFooterProps) {
  const { t } = useTranslation("operations");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleNewVersionClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onNewVersion(file);
      e.target.value = "";
    }
  };

  return (
    <div className="mt-auto flex items-center justify-between border-t border-table-border pt-6">
      {/* Version buttons */}
      <div className="flex items-center gap-2">
        {versions.map((version) => (
          <Button
            key={version.id}
            type="button"
            variant={
              selectedVersionId === version.id
                ? "primary-dark"
                : "outline-primary"
            }
            size="sm"
            onClick={() => onVersionSelect(version.id)}
            className="min-w-[60px]"
          >
            V {version.versionNumber}
          </Button>
        ))}
      </div>

      {/* New version button */}
      <Button
        type="button"
        variant="primary-dark"
        onClick={handleNewVersionClick}
        disabled={isUploading}
        className="font-display text-base font-semibold leading-5"
      >
        {isUploading ? (
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

      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
}
