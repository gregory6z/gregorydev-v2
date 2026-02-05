import { useState, lazy, Suspense } from "react";
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
import { SheetFooter } from "@/components/operations/creation-sheet/sheet-footer";
import { StatusBadge } from "@/components/operations/status-badge";
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

  const handleAddFileAndAnalyze = () => {
    if (!uploadedFile) return;

    addFileMutation.mutate(
      { operationId, file: uploadedFile },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: operationsKeys.detail(operationId),
          });
          // After successful upload, go to step 2 for analysis
          setStep(2);
        },
      },
    );
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
  const [lastDocumentId, setLastDocumentId] = useState<string | null>(null);
  const uploadNewVersionMutation = useUploadNewFileVersion();

  // Derive selected version: use user selection or default to current version
  // Reset selection when document changes (rerender-derived-state-no-effect)
  if (documentDetails && lastDocumentId !== documentDetails.id) {
    setLastDocumentId(documentDetails.id);
    setSelectedVersionId(documentDetails.currentVersionId);
  }

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

  // ──────────────────────────────────────────────
  // Shared Handlers
  // ──────────────────────────────────────────────

  const handleClose = () => {
    if (hasData && step === 1) {
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
            style={{ right: "calc(600px + 700px)" }}
            onClick={handleClose}
          />
          <div className="fixed inset-y-0 right-[640px] z-40 w-[700px]">
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
          className="flex w-[640px] flex-col gap-0 bg-white p-6"
          hideOverlay={step === 2}
        >
          <SheetHeader className="flex-col space-y-0 p-0">
            {step === 1 ? (
              <SheetTitle className="font-display text-[42px] font-normal leading-[140%]">
                {t("documentDialog.title")}
              </SheetTitle>
            ) : (
              <>
                <div className="flex items-center gap-3">
                  <SheetTitle className="font-display text-[42px] font-normal leading-[140%] text-[#053334]">
                    {documentDetails?.name ?? ""}
                  </SheetTitle>
                  {documentDetails && (
                    <>
                      <StatusBadge status={documentDetails.conformityStatus} />
                      <span className="text-sm text-muted-foreground">
                        {t("documentDialog.submittedTimes", {
                          count: documentDetails.submissionCount,
                        })}
                      </span>
                    </>
                  )}
                </div>
              </>
            )}
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
                confirmLabel={t("documentDialog.addFile")}
                loadingLabel={t("documentDialog.adding")}
                onCancel={handleClose}
                onConfirm={handleAddFileAndAnalyze}
                isConfirmDisabled={!isStep1Valid}
                isLoading={addFileMutation.isPending}
              />
            </>
          )}

          {step === 2 && (
            <ValidationModeContent
              isLoading={isLoadingDetails}
              documentDetails={documentDetails ?? null}
              selectedVersionId={selectedVersionId ?? ""}
              onVersionSelect={handleVersionSelect}
              onNewVersion={handleNewVersion}
              isUploadingNewVersion={uploadNewVersionMutation.isPending}
            />
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
