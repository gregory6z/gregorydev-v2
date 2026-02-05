import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";

type DeleteConfirmationDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  count: number;
  onConfirm: () => void;
  isLoading: boolean;
};

const CONFIRM_TEXT = "supprimer";

export function DeleteConfirmationDialog({
  open,
  onOpenChange,
  count,
  onConfirm,
  isLoading,
}: DeleteConfirmationDialogProps) {
  const { t } = useTranslation("operations");
  const [confirmText, setConfirmText] = useState("");

  // Case insensitive validation as per ENRG-46
  const isConfirmEnabled = confirmText.toLowerCase() === CONFIRM_TEXT;

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      setConfirmText("");
    }
    onOpenChange(newOpen);
  };

  return (
    <AlertDialog open={open} onOpenChange={handleOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-foreground font-semibold">
            {t("deleteDialog.title", { count })}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-foreground/80">
            {t("deleteDialog.message", { count })}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <p className="text-sm text-foreground/70">
          {t("deleteDialog.instruction")}
        </p>

        <Input
          value={confirmText}
          onChange={(e) => setConfirmText(e.target.value)}
          placeholder="supprimer"
          className="mt-2"
        />

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>
            {t("deleteDialog.cancel")}
          </AlertDialogCancel>
          <Button
            variant="destructive"
            onClick={onConfirm}
            disabled={!isConfirmEnabled || isLoading}
          >
            {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
            {t("deleteDialog.confirm")} ({count})
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
