import { useState, useEffect, lazy, Suspense } from "react";
import { useTranslation } from "react-i18next";
import { useQueryClient } from "@tanstack/react-query";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { StepBadge } from "@/components/operations/creation-sheet/step-badge";
import { SheetFooter } from "@/components/operations/creation-sheet/sheet-footer";
import { UploadModeContent } from "./upload-mode/upload-mode-content";
import { ValidationModeContent } from "./validation-mode/validation-mode-content";
import { useDocumentDetails, operationsKeys } from "@/api/operations/queries";
import {
  useAddFileToOperation,
  useUploadNewFileVersion,
} from "@/api/operations/mutations";

const PdfViewer = lazy(() =>
  import("@/components/pdf-viewer").then((m) => ({ default: m.PdfViewer })),
);

type DocumentDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  operationId: string;
};

export function DocumentDialog({
  open,
  onOpenChange,
  operationId,
}: DocumentDialogProps) {
  const { t } = useTranslation("operations");
  const queryClient = useQueryClient();

  // ──────────────────────────────────────────────
  // Shared State
  // ──────────────────────────────────────────────

  const [step, setStep] = useState(1);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const addFileMutation = useAddFileToOperation();

  // ──────────────────────────────────────────────
  // Step 1: File Upload
  // ──────────────────────────────────────────────

  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const isStep1Valid = uploadedFile !== null;
  const hasData = uploadedFile !== null;

  const handleFileAdded = (file: File) => {
    setUploadedFile(file);
  };

  const handleFileRemoved = () => {
    setUploadedFile(null);
  };

  const handleNext = () => {
    if (uploadedFile) {
      setStep(2);
    }
  };

  // ──────────────────────────────────────────────
  // Step 2: Document Details & Validation
  // ──────────────────────────────────────────────

  const isStep2 = step === 2;

  // For now, we use a mock document ID since the file is not yet uploaded
  // In production, this would come from the upload response
  const mockDocumentId = "doc-1";

  const { data: documentDetails, isLoading: isLoadingDetails } =
    useDocumentDetails(operationId, mockDocumentId, isStep2);

  const [selectedVersionId, setSelectedVersionId] = useState<string | null>(
    null,
  );
  const uploadNewVersionMutation = useUploadNewFileVersion();

  // Set initial version when document details load
  useEffect(() => {
    if (documentDetails && !selectedVersionId) {
      setSelectedVersionId(documentDetails.currentVersionId);
    }
  }, [documentDetails, selectedVersionId]);

  const handleVersionSelect = (versionId: string) => {
    setSelectedVersionId(versionId);
  };

  const handleNewVersion = (file: File) => {
    uploadNewVersionMutation.mutate(
      { operationId, fileId: mockDocumentId, file },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: operationsKeys.document(operationId, mockDocumentId),
          });
        },
      },
    );
  };

  const handleBack = () => {
    setStep(1);
    setSelectedVersionId(null);
  };

  const handleAddFile = () => {
    if (!uploadedFile) return;

    addFileMutation.mutate(
      { operationId, file: uploadedFile },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: operationsKeys.detail(operationId),
          });
          handleConfirmClose();
        },
      },
    );
  };

  // ──────────────────────────────────────────────
  // Shared Handlers
  // ──────────────────────────────────────────────

  const handleClose = () => {
    if (hasData) {
      setShowCancelConfirm(true);
    } else {
      handleConfirmClose();
    }
  };

  const handleConfirmClose = () => {
    // Reset all state
    setUploadedFile(null);
    setSelectedVersionId(null);
    queryClient.removeQueries({
      queryKey: operationsKeys.document(operationId, mockDocumentId),
    });
    setStep(1);
    setShowCancelConfirm(false);
    onOpenChange(false);
  };

  // Get current version URL for PDF viewer
  const currentVersionUrl =
    documentDetails?.versions.find((v) => v.id === selectedVersionId)
      ?.fileUrl ?? null;

  // ──────────────────────────────────────────────
  // Render
  // ──────────────────────────────────────────────

  return (
    <>
      {/* Overlay + PDF Viewer (step 2 only) */}
      {open && step === 2 && (
        <>
          <div
            className="fixed inset-0 z-30 bg-black/40"
            style={{ right: "calc(450px + 450px)" }}
            onClick={handleClose}
          />
          <div className="fixed inset-y-0 right-[450px] z-40 w-[450px]">
            <Suspense
              fallback={
                <div className="flex h-full items-center justify-center bg-background">
                  <div className="size-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
                </div>
              }
            >
              <PdfViewer
                file={uploadedFile ?? currentVersionUrl}
                className="h-full rounded-none"
              />
            </Suspense>
          </div>
        </>
      )}

      {/* Sheet */}
      <Sheet
        open={open}
        onOpenChange={(newOpen) => {
          if (!newOpen) {
            handleClose();
          }
        }}
      >
        <SheetContent
          side="right"
          className="flex w-[450px] flex-col gap-0 bg-white p-6"
          hideOverlay={step === 2}
        >
          <SheetHeader className="flex-row items-center justify-between space-y-0 p-0">
            <div className="flex items-center gap-3">
              <SheetTitle className="font-display text-[42px] font-normal leading-[140%]">
                {t("documentDialog.title")}
              </SheetTitle>
              <StepBadge current={step} total={2} />
            </div>
          </SheetHeader>

          {step === 1 && (
            <>
              <UploadModeContent
                file={uploadedFile}
                onFileAdded={handleFileAdded}
                onFileRemoved={handleFileRemoved}
              />
              <SheetFooter
                cancelLabel={t("documentDialog.cancel")}
                confirmLabel={t("documentDialog.next")}
                onCancel={handleClose}
                onConfirm={handleNext}
                isConfirmDisabled={!isStep1Valid}
              />
            </>
          )}

          {step === 2 && (
            <>
              <ValidationModeContent
                isLoading={isLoadingDetails}
                documentDetails={documentDetails ?? null}
                selectedVersionId={selectedVersionId ?? ""}
                onVersionSelect={handleVersionSelect}
                onNewVersion={handleNewVersion}
                isUploadingNewVersion={uploadNewVersionMutation.isPending}
              />
              <SheetFooter
                cancelLabel={t("documentDialog.back")}
                confirmLabel={t("documentDialog.addFile")}
                loadingLabel={t("documentDialog.adding")}
                onCancel={handleBack}
                onConfirm={handleAddFile}
                isConfirmDisabled={false}
                isLoading={addFileMutation.isPending}
              />
            </>
          )}
        </SheetContent>
      </Sheet>

      {/* Cancel confirmation dialog */}
      <AlertDialog open={showCancelConfirm} onOpenChange={setShowCancelConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {t("documentDialog.cancelConfirmTitle")}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {t("documentDialog.cancelConfirmMessage")}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>
              {t("documentDialog.cancelConfirmNo")}
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmClose}>
              {t("documentDialog.cancelConfirmYes")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
