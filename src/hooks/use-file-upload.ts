import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { mockUploadFile } from "@/api/operations/mocks";
import { env } from "@/env";
import {
  FileUploadStatus,
  type UploadingFile,
  type FileUploadStatusType,
} from "@/api/operations/schemas";

type UseFileUploadReturn = {
  files: UploadingFile[];
  addFiles: (newFiles: File[]) => void;
  removeFile: (id: string) => void;
  retryFile: (id: string) => void;
  isUploading: boolean;
  completedCount: number;
  totalCount: number;
  hasError: boolean;
  reset: () => void;
};

export const useFileUpload = (): UseFileUploadReturn => {
  const [files, setFiles] = useState<UploadingFile[]>([]);

  const updateFileProgress = (id: string, progress: number) => {
    setFiles((prev) => prev.map((f) => (f.id === id ? { ...f, progress } : f)));
  };

  const updateFileStatus = (
    id: string,
    status: FileUploadStatusType,
    error?: string,
  ) => {
    setFiles((prev) =>
      prev.map((f) => (f.id === id ? { ...f, status, error } : f)),
    );
  };

  const uploadFile = async (uploadingFile: UploadingFile) => {
    updateFileStatus(uploadingFile.id, FileUploadStatus.UPLOADING);

    try {
      await mockUploadFile(uploadingFile.file, (progress) => {
        updateFileProgress(uploadingFile.id, progress);
      });
      updateFileStatus(uploadingFile.id, FileUploadStatus.COMPLETED);
    } catch {
      updateFileStatus(
        uploadingFile.id,
        FileUploadStatus.ERROR,
        "errors.uploadFailed",
      );
    }
  };

  const validateFile = (file: File): string | null => {
    const extension = `.${file.name.split(".").pop()?.toLowerCase()}`;

    if (!env.ACCEPTED_FILE_EXTENSIONS.includes(extension)) {
      return "errors.invalidFileType";
    }

    if (file.size > env.MAX_FILE_SIZE) {
      return "errors.fileTooLarge";
    }

    return null;
  };

  const addFiles = (newFiles: File[]) => {
    const uploadingFiles: UploadingFile[] = newFiles.map((file) => {
      const error = validateFile(file);
      return {
        id: uuidv4(),
        file,
        name: file.name,
        size: file.size,
        progress: 0,
        status: error ? FileUploadStatus.ERROR : FileUploadStatus.PENDING,
        error: error ?? undefined,
      };
    });

    setFiles((prev) => [...prev, ...uploadingFiles]);

    // Start upload for valid files
    uploadingFiles
      .filter((f) => f.status === FileUploadStatus.PENDING)
      .forEach((f) => uploadFile(f));
  };

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const retryFile = (id: string) => {
    const file = files.find((f) => f.id === id);
    if (file && file.status === FileUploadStatus.ERROR) {
      updateFileProgress(id, 0);
      uploadFile({
        ...file,
        status: FileUploadStatus.PENDING,
        error: undefined,
      });
    }
  };

  const reset = () => {
    setFiles([]);
  };

  // Derived state - no need for useMemo with React Compiler
  const isUploading = files.some(
    (f) =>
      f.status === FileUploadStatus.UPLOADING ||
      f.status === FileUploadStatus.PENDING,
  );

  const completedCount = files.filter(
    (f) => f.status === FileUploadStatus.COMPLETED,
  ).length;

  const hasError = files.some((f) => f.status === FileUploadStatus.ERROR);

  return {
    files,
    addFiles,
    removeFile,
    retryFile,
    isUploading,
    completedCount,
    totalCount: files.length,
    hasError,
    reset,
  };
};
