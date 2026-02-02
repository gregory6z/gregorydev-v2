import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { useTranslation } from "react-i18next";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { DocumentStackIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { env } from "@/env";

const ACCEPTED_PDF_ONLY = {
  "application/pdf": [".pdf"],
} as const;

type SingleFileUploadProps = {
  file: File | null;
  onFileAdded: (file: File) => void;
  onFileRemoved: () => void;
  disabled?: boolean;
};

export function SingleFileUpload({
  file,
  onFileAdded,
  onFileRemoved,
  disabled,
}: SingleFileUploadProps) {
  const { t } = useTranslation("operations");
  const [isDragActive, setIsDragActive] = useState(false);

  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onFileAdded(acceptedFiles[0]);
    }
  };

  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop,
    onDragEnter: () => setIsDragActive(true),
    onDragLeave: () => setIsDragActive(false),
    onDropAccepted: () => setIsDragActive(false),
    onDropRejected: () => setIsDragActive(false),
    accept: ACCEPTED_PDF_ONLY,
    maxSize: env.MAX_FILE_SIZE,
    multiple: false,
    disabled: disabled || file !== null,
    noClick: true,
  });

  // Format file size for display
  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  // If file is selected, show file info
  if (file) {
    return (
      <div
        data-slot="single-file-upload"
        className="flex items-center justify-between rounded-lg border border-primary bg-primary/5 p-4"
      >
        <div className="flex items-center gap-3">
          <DocumentStackIcon className="text-primary" />
          <div>
            <p className="font-medium text-foreground">{file.name}</p>
            <p className="text-sm text-muted-foreground">
              {formatFileSize(file.size)}
            </p>
          </div>
        </div>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={onFileRemoved}
          disabled={disabled}
          aria-label={t("documentDialog.removeFile")}
        >
          <X className="size-4" />
        </Button>
      </div>
    );
  }

  // No file selected, show dropzone
  return (
    <div data-slot="single-file-upload">
      <div
        {...getRootProps()}
        className={cn(
          "relative flex h-[170px] flex-col items-center justify-center rounded-lg border border-dashed transition-colors",
          "border-primary bg-primary/5",
          isDragActive && "border-2 bg-primary/10",
          disabled && "cursor-not-allowed opacity-50",
        )}
      >
        <input {...getInputProps()} />

        <DocumentStackIcon className="mb-4 text-primary" />
        <p className="text-center font-display text-base font-medium leading-5 text-foreground">
          {t("documentDialog.dropzoneText")}
          <br />
          <span
            role="button"
            tabIndex={0}
            onClick={open}
            onKeyDown={(e) => e.key === "Enter" && open()}
            className="cursor-pointer text-primary"
          >
            {t("documentDialog.dropzoneLink")}
          </span>
        </p>
      </div>
    </div>
  );
}
