import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import { DocumentStackIcon } from "@/components/icons";
import { ACCEPTED_FILE_TYPES, MAX_FILE_SIZE } from "@/api/operations/schemas";

type FileUploadZoneProps = {
  onFilesAdded: (files: File[]) => void;
  disabled?: boolean;
};

export function FileUploadZone({
  onFilesAdded,
  disabled,
}: FileUploadZoneProps) {
  const { t } = useTranslation("operations");
  const [isDragActive, setIsDragActive] = useState(false);

  const onDrop = (acceptedFiles: File[]) => {
    onFilesAdded(acceptedFiles);
  };

  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop,
    onDragEnter: () => setIsDragActive(true),
    onDragLeave: () => setIsDragActive(false),
    onDropAccepted: () => setIsDragActive(false),
    onDropRejected: () => setIsDragActive(false),
    accept: ACCEPTED_FILE_TYPES,
    maxSize: MAX_FILE_SIZE,
    multiple: true,
    disabled,
    noClick: true,
  });

  return (
    <div data-slot="file-upload-zone" className="space-y-3">
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
          {t("creation.dropzoneText")}
          <br />
          <span
            role="button"
            tabIndex={0}
            onClick={open}
            onKeyDown={(e) => e.key === "Enter" && open()}
            className="cursor-pointer text-primary"
          >
            {t("creation.dropzoneLink")}
          </span>
        </p>
      </div>

      <p className="text-sm font-normal leading-[140%] text-muted-foreground">
        {t("creation.dropzoneHelp")}
      </p>
    </div>
  );
}
