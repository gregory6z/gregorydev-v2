import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileList } from "@/components/operations/creation-sheet/upload-mode/file-list";
import { FileUploadZone } from "@/components/operations/creation-sheet/upload-mode/file-upload-zone";
import type {
  CreateOperationStep1Data,
  UploadingFile,
} from "@/api/operations/schemas";

type UploadModeContentProps = {
  files: UploadingFile[];
  completedCount: number;
  isUploading: boolean;
  onFilesAdded: (files: File[]) => void;
  onRemoveFile: (id: string) => void;
  onRetryFile: (id: string) => void;
};

export function UploadModeContent({
  files,
  completedCount,
  isUploading,
  onFilesAdded,
  onRemoveFile,
  onRetryFile,
}: UploadModeContentProps) {
  const { t } = useTranslation("operations");
  const {
    register,
    formState: { errors },
  } = useFormContext<CreateOperationStep1Data>();

  return (
    <div className="mt-5 flex flex-1 flex-col overflow-hidden">
      <div className="space-y-2">
        <Label htmlFor="operation-name">{t("creation.nameLabel")}</Label>
        <Input
          id="operation-name"
          placeholder={t("creation.namePlaceholder")}
          aria-invalid={!!errors.name}
          className="h-[50px] focus-visible:ring-0"
          {...register("name")}
        />
        {errors.name && (
          <p className="text-sm text-destructive">
            {t(errors.name.message as string)}
          </p>
        )}
      </div>

      <div className="mt-[25px]">
        <FileUploadZone onFilesAdded={onFilesAdded} disabled={isUploading} />
      </div>

      <div className="mt-[25px] flex min-h-0 flex-1 flex-col">
        <FileList
          files={files}
          completedCount={completedCount}
          onRemove={onRemoveFile}
          onRetry={onRetryFile}
        />
      </div>
    </div>
  );
}
