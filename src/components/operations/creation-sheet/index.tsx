import { useState } from "react";
import { useForm } from "react-hook-form";
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
import { OperationNameField } from "./operation-name-field";
import { FileUploadZone } from "./file-upload-zone";
import { FileList } from "./file-list";
import { CreationSheetFooter } from "./sheet-footer";
import { useFileUpload } from "@/hooks/use-file-upload";
import {
  createOperationStep1Schema,
  type CreateOperationStep1Data,
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

  const {
    files,
    addFiles,
    removeFile,
    retryFile,
    isUploading,
    completedCount,
    reset: resetFiles,
  } = useFileUpload();

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset: resetForm,
    watch,
  } = useForm<CreateOperationStep1Data>({
    resolver: zodResolver(createOperationStep1Schema),
    defaultValues: {
      name: "",
    },
  });

  const nameValue = watch("name");
  const hasData = isDirty || files.length > 0;
  const canProceed =
    nameValue.trim().length > 0 && completedCount > 0 && !isUploading;

  const handleClose = () => {
    if (hasData) {
      setShowCancelConfirm(true);
    } else {
      handleConfirmClose();
    }
  };

  const handleConfirmClose = () => {
    resetForm();
    resetFiles();
    setStep(1);
    setShowCancelConfirm(false);
    onOpenChange(false);
  };

  const handleNext = () => {
    handleSubmit((data) => {
      // Validation OK, passer à l'étape 2
      console.log("Step 1 data:", { ...data, files });
      setStep(2);
      // TODO: Implémenter étape 2
    })();
  };

  return (
    <>
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
        >
          <SheetHeader className="flex-row items-center justify-between space-y-0 p-0">
            <div className="flex items-center gap-3">
              <SheetTitle className="font-display text-[42px] font-normal leading-[140%]">
                {t("creation.title")}
              </SheetTitle>
              <StepBadge current={step} total={2} />
            </div>
          </SheetHeader>

          <div className="mt-5 flex flex-1 flex-col overflow-hidden">
            <OperationNameField register={register} errors={errors} />

            <div className="mt-[25px]">
              <FileUploadZone onFilesAdded={addFiles} disabled={isUploading} />
            </div>

            <div className="mt-[25px] flex min-h-0 flex-1 flex-col">
              <FileList
                files={files}
                completedCount={completedCount}
                onRemove={removeFile}
                onRetry={retryFile}
              />
            </div>
          </div>

          <CreationSheetFooter
            onCancel={handleClose}
            onNext={handleNext}
            isNextDisabled={!canProceed}
          />
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
