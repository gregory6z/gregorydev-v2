import { useState, useCallback } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
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
import { Step1Form } from "./step-1/step-1-form";
import { Step2Form } from "./step-2/step-2-form";
import { SheetFooter } from "./sheet-footer";
import { PdfViewer } from "@/components/pdf-viewer";
import { useFileUpload } from "@/hooks/use-file-upload";
import { useCreateOperation } from "@/api/operations/mutations";
import {
  createOperationStep1Schema,
  type CreateOperationStep1Data,
  type SignatureStatusType,
  FileUploadStatus,
} from "@/api/operations/schemas";

type OperationCreationSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function OperationCreationSheet({
  open,
  onOpenChange,
}: OperationCreationSheetProps) {
  const { t } = useTranslation("operations");
  const [step, setStep] = useState(1);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);

  // Form for step 1
  const methods = useForm<CreateOperationStep1Data>({
    resolver: zodResolver(createOperationStep1Schema),
    defaultValues: { name: "" },
  });

  // File upload
  const {
    files,
    addFiles,
    removeFile,
    retryFile,
    isUploading,
    completedCount,
    reset: resetFiles,
  } = useFileUpload();

  // Step 2 state
  const [isStep2Valid, setIsStep2Valid] = useState(false);
  const [step2Data, setStep2Data] = useState<{
    fost: string;
    lieu: string;
    dateEngagement: string;
    signature: SignatureStatusType | null;
  } | null>(null);

  const createOperationMutation = useCreateOperation();

  // Derived state
  const nameValue = methods.watch("name");
  const isStep1Valid =
    nameValue.trim().length > 0 && completedCount > 0 && !isUploading;
  const hasData = methods.formState.isDirty || files.length > 0;
  const pdfFile =
    files.find((f) => f.name.toLowerCase().endsWith(".pdf"))?.file ?? null;

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
    setStep(1);
    setIsStep2Valid(false);
    setStep2Data(null);
    setShowCancelConfirm(false);
    onOpenChange(false);
  };

  const handleNext = () => {
    methods.handleSubmit(() => {
      setStep(2);
    })();
  };

  const handleBack = () => {
    setStep(1);
  };

  const handleCreate = () => {
    if (!step2Data || !step2Data.signature) return;

    createOperationMutation.mutate(
      {
        name: methods.getValues("name"),
        fileIds: files
          .filter((f) => f.status === FileUploadStatus.COMPLETED)
          .map((f) => f.id),
        fost: step2Data.fost,
        lieu: step2Data.lieu,
        dateEngagement: step2Data.dateEngagement,
        signature: step2Data.signature,
      },
      {
        onSuccess: () => {
          handleConfirmClose();
        },
      },
    );
  };

  const handleFormValidityChange = useCallback((isValid: boolean) => {
    setIsStep2Valid(isValid);
  }, []);

  const handleFormStateChange = useCallback(
    (state: {
      fost: string;
      lieu: string;
      dateEngagement: string;
      signature: SignatureStatusType | null;
    }) => {
      setStep2Data(state);
    },
    [],
  );

  return (
    <>
      {/* Custom overlay for step 2 - covers left side only */}
      {open && step === 2 && (
        <div
          className="fixed inset-0 z-30 bg-black/40"
          style={{ right: "calc(600px + 700px)" }}
          onClick={handleClose}
        />
      )}

      {/* PDF Viewer - Outside Sheet, only visible on step 2 */}
      {open && step === 2 && (
        <div className="fixed inset-y-0 right-[640px] z-40 w-[700px]">
          <PdfViewer file={pdfFile} className="h-full rounded-none" />
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
                <Step1Form
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
                <Step2Form
                  onFormValidityChange={handleFormValidityChange}
                  onFormStateChange={handleFormStateChange}
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
