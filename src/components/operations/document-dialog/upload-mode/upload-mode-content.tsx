import { FileUploadZone } from "@/components/operations/creation-sheet/upload-mode/file-upload-zone";
import { FileList } from "@/components/operations/creation-sheet/upload-mode/file-list";
import {
  FileUploadStatus,
  type UploadingFile,
} from "@/api/operations/schemas/creation";

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
  const handleFilesAdded = (files: File[]) => {
    if (files.length > 0) {
      onFileAdded(files[0]);
    }
  };

  // Convert File to UploadingFile format for reusing FileList component
  const files: UploadingFile[] = file
    ? [
        {
          id: "single-file",
          file,
          name: file.name,
          size: file.size,
          progress: 100,
          status: FileUploadStatus.COMPLETED,
        },
      ]
    : [];

  const handleRemove = () => {
    onFileRemoved();
  };

  return (
    <div className="mt-5 flex flex-1 flex-col overflow-hidden">
      <FileUploadZone
        onFilesAdded={handleFilesAdded}
        disabled={disabled || file !== null}
        translationPrefix="documentDialog"
      />

      <div className="mt-[25px] flex min-h-0 flex-1 flex-col">
        <FileList
          files={files}
          completedCount={files.length}
          onRemove={handleRemove}
          onRetry={() => {}}
          hideCounter
        />
      </div>
    </div>
  );
}
