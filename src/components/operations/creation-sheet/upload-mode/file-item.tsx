import { useTranslation } from "react-i18next";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { X, Trash2, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  FileUploadStatus,
  type UploadingFile,
} from "@/api/operations/schemas/creation";

type FileItemProps = {
  file: UploadingFile;
  onRemove: () => void;
  onRetry: () => void;
};

export function FileItem({ file, onRemove, onRetry }: FileItemProps) {
  const { t } = useTranslation("operations");
  const isUploading =
    file.status === FileUploadStatus.UPLOADING ||
    file.status === FileUploadStatus.PENDING;
  const isCompleted = file.status === FileUploadStatus.COMPLETED;
  const isError = file.status === FileUploadStatus.ERROR;

  return (
    <div
      data-slot="file-item"
      className={cn(
        "flex items-center gap-3 py-2",
        isError && "text-destructive",
      )}
    >
      <p className="min-w-0 flex-1 truncate text-sm">{file.name}</p>

      {isUploading && (
        <Progress value={file.progress} className="h-1 w-[200px] shrink-0" />
      )}

      {isError && file.error && (
        <p className="shrink-0 text-xs text-destructive">{t(file.error)}</p>
      )}

      <div className="flex shrink-0 items-center gap-1">
        {isUploading && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={onRemove}
            aria-label={t("creation.cancelUpload")}
            className="h-8 w-8"
          >
            <X className="h-4 w-4" />
          </Button>
        )}

        {isCompleted && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={onRemove}
            aria-label={t("creation.removeFile")}
            className="h-8 w-8 text-muted-foreground hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        )}

        {isError && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={onRetry}
            aria-label={t("creation.retryUpload")}
            className="h-8 w-8"
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
