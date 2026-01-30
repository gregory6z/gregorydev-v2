import { useTranslation } from "react-i18next";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileItem } from "./file-item";
import type { UploadingFile } from "@/api/operations/schemas";

type FileListProps = {
  files: UploadingFile[];
  completedCount: number;
  onRemove: (id: string) => void;
  onRetry: (id: string) => void;
};

export function FileList({
  files,
  completedCount,
  onRemove,
  onRetry,
}: FileListProps) {
  const { t } = useTranslation("operations");

  if (files.length === 0) {
    return null;
  }

  return (
    <div data-slot="file-list" className="flex min-h-0 flex-1 flex-col">
      <div className="flex items-center gap-2 pb-4">
        <span className="font-display text-lg font-semibold leading-[140%] text-foreground">
          {t("creation.uploadHeader")}
        </span>
        <span className="inline-flex items-center rounded-md bg-[#E6F7F4] px-2 py-0.5 text-xs font-medium text-primary">
          {completedCount}/{files.length}
        </span>
      </div>

      <ScrollArea className="flex-1 border-t border-table-border">
        <div className="divide-y divide-table-border [&>*:last-child]:border-b [&>*:last-child]:border-table-border">
          {files.map((file) => (
            <FileItem
              key={file.id}
              file={file}
              onRemove={() => onRemove(file.id)}
              onRetry={() => onRetry(file.id)}
            />
          ))}
        </div>
        <div className="pb-4" />
      </ScrollArea>
    </div>
  );
}
