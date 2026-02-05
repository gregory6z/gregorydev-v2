import { useState, useEffect, lazy, Suspense } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { StepBadge } from "./step-badge";
import { UploadModeContent } from "./upload-mode/upload-mode-content";
import { ValidationModeContent } from "./validation-mode/validation-mode-content";
import { SheetFooter } from "./sheet-footer";

import { useFileUpload } from "@/hooks/use-file-upload";
import { useExtractedData, operationsKeys } from "@/api/operations/queries";
import { useCreateOperation } from "@/api/operations/mutations";
import {
  createOperationStep1Schema,
  type CreateOperationStep1Data,
  type SignatureStatusType,
  FileUploadStatus,
  SignatureStatus,
} from "@/api/operations/schemas";

const PdfViewer = lazy(() =>
  import("@/components/pdf-viewer").then((m) => ({ default: m.PdfViewer })),
);

type OperationCreationSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

type ValidationField = "fost" | "lieu" | "dateEngagement";

export function OperationCreationSheet({
  open,
  onOpenChange,
}: OperationCreationSheetProps) {
  const { t } = useTranslation("operations");
  const queryClient = useQueryClient();

  // ──────────────────────────────────────────────
  // Shared State
  // ──────────────────────────────────────────────

  const [step, setStep] = useState(1);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const createOperationMutation = useCreateOperation();

  // ──────────────────────────────────────────────
  // Step 1: Name & File Upload
  // ──────────────────────────────────────────────

  const methods = useForm<CreateOperationStep1Data>({
    resolver: zodResolver(createOperationStep1Schema),
    defaultValues: { name: "" },
  });

  const {
    files,
    addFiles,
    removeFile,
    retryFile,
    isUploading,
    completedCount,
    reset: resetFiles,
  } = useFileUpload();

  const nameValue = methods.watch("name");
  const isStep1Valid =
    nameValue.trim().length > 0 && completedCount > 0 && !isUploading;
  const hasData = methods.formState.isDirty || files.length > 0;
  const pdfFile =
    files.find((f) => f.name.toLowerCase().endsWith(".pdf"))?.file ?? null;

  const handleNext = () => {
    methods.handleSubmit(() => {
      setStep(2);
    })();
  };

  // ──────────────────────────────────────────────
  // Step 2: Extracted Data Validation
  // ──────────────────────────────────────────────

  const isStep2 = step === 2;
  const { data: extractedData, isLoading: isExtractingData } =
    useExtractedData(isStep2);

  const [validatedFields, setValidatedFields] = useState<Set<ValidationField>>(
    new Set(),
  );
  const [signature, setSignature] = useState<SignatureStatusType | null>(null);

  useEffect(() => {
    if (extractedData) {
      setSignature(
        extractedData.signatureDetected
          ? SignatureStatus.PRESENT
          : SignatureStatus.ABSENT,
      );
    }
  }, [extractedData]);

  const toggleFieldValidation = (field: ValidationField) => {
    setValidatedFields((prev) => {
      const next = new Set(prev);
      if (next.has(field)) {
        next.delete(field);
      } else {
        next.add(field);
      }
      return next;
    });
  };

  const isStep2Valid =
    validatedFields.has("fost") &&
    validatedFields.has("lieu") &&
    validatedFields.has("dateEngagement") &&
    signature !== null;

  const handleBack = () => {
    setStep(1);
  };

  const handleCreate = () => {
    if (!extractedData || !signature) return;

    createOperationMutation.mutate(
      {
        name: methods.getValues("name"),
        fileIds: files
          .filter((f) => f.status === FileUploadStatus.COMPLETED)
          .map((f) => f.id),
        fost: extractedData.fost,
        lieu: extractedData.lieu,
        dateEngagement: extractedData.dateEngagement,
        signature,
      },
      {
        onSettled: () => {
          queryClient.invalidateQueries({ queryKey: operationsKeys.counts() });
          queryClient.invalidateQueries({ queryKey: operationsKeys.lists() });
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
    methods.reset();
    resetFiles();
    setValidatedFields(new Set());
    setSignature(null);
    queryClient.removeQueries({ queryKey: operationsKeys.extractedData() });
    setStep(1);
    setShowCancelConfirm(false);
    onOpenChange(false);
  };

  // ──────────────────────────────────────────────
  // Render
  // ──────────────────────────────────────────────

  return (
    <>
      {open && step === 2 && (
        <div
          className="fixed inset-0 z-30 bg-black/40"
          style={{ right: "calc(600px + 700px)" }}
          onClick={handleClose}
        />
      )}

      {open && step === 2 && (
        <div className="fixed inset-y-0 right-[640px] z-40 w-[700px]">
          <Suspense
            fallback={
              <div className="flex h-full items-center justify-center bg-background">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
              </div>
            }
          >
            <PdfViewer file={pdfFile} className="h-full rounded-none" />
          </Suspense>
        </div>
      )}

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
          <SheetHeader className="flex-row items-center justify-between space-y-0 p-0">
            <div className="flex items-center gap-3">
              <SheetTitle className="font-display text-[42px] font-normal leading-[140%]">
                {t("creation.title")}
              </SheetTitle>
              <StepBadge current={step} total={2} />
            </div>
          </SheetHeader>

          <FormProvider {...methods}>
            {step === 1 && (
              <>
                <UploadModeContent
                  files={files}
                  completedCount={completedCount}
                  isUploading={isUploading}
                  onFilesAdded={addFiles}
                  onRemoveFile={removeFile}
                  onRetryFile={retryFile}
                />
                <SheetFooter
                  cancelLabel={t("creation.cancel")}
                  confirmLabel={t("creation.next")}
                  onCancel={handleClose}
                  onConfirm={handleNext}
                  isConfirmDisabled={!isStep1Valid}
                />
              </>
            )}
            {step === 2 && (
              <>
                <ValidationModeContent
                  isLoading={isExtractingData}
                  extractedData={extractedData ?? null}
                  validatedFields={validatedFields}
                  signature={signature}
                  onToggleFieldValidation={toggleFieldValidation}
                  onSignatureChange={setSignature}
                />
                <SheetFooter
                  cancelLabel={t("creation.cancel")}
                  confirmLabel={t("creation.step2.create")}
                  loadingLabel={t("creation.step2.creating")}
                  onCancel={handleBack}
                  onConfirm={handleCreate}
                  isConfirmDisabled={!isStep2Valid}
                  isLoading={createOperationMutation.isPending}
                />
              </>
            )}
          </FormProvider>
        </SheetContent>
      </Sheet>

      <AlertDialog open={showCancelConfirm} onOpenChange={setShowCancelConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {t("creation.cancelConfirmTitle")}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {t("creation.cancelConfirmMessage")}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>
              {t("creation.cancelConfirmNo")}
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmClose}>
              {t("creation.cancelConfirmYes")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
