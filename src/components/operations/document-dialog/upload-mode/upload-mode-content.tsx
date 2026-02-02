import { useTranslation } from "react-i18next";
import { SingleFileUpload } from "./single-file-upload";

type UploadModeContentProps = {
  file: File | null;
  onFileAdded: (file: File) => void;
  onFileRemoved: () => void;
  disabled?: boolean;
};

export function UploadModeContent({
  file,
  onFileAdded,
  onFileRemoved,
  disabled,
}: UploadModeContentProps) {
  const { t } = useTranslation("operations");

  return (
    <div className="mt-5 flex flex-1 flex-col overflow-hidden">
      <SingleFileUpload
        file={file}
        onFileAdded={onFileAdded}
        onFileRemoved={onFileRemoved}
        disabled={disabled}
      />
      <p className="mt-3 text-sm text-muted-foreground">
        {t("documentDialog.dropzoneHelp")}
      </p>
    </div>
  );
}
