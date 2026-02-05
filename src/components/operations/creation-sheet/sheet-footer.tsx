import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

type SheetFooterProps = {
  cancelLabel: string;
  confirmLabel: string;
  loadingLabel?: string;
  onCancel: () => void;
  onConfirm: () => void;
  isConfirmDisabled: boolean;
  isLoading?: boolean;
};

export function SheetFooter({
  cancelLabel,
  confirmLabel,
  loadingLabel,
  onCancel,
  onConfirm,
  isConfirmDisabled,
  isLoading = false,
}: SheetFooterProps) {
  return (
    <div className="mt-auto flex gap-4 border-t border-table-border pt-6">
      <Button
        type="button"
        variant="outline-primary"
        className="flex-1 font-display text-base font-semibold leading-5"
        onClick={onCancel}
        disabled={isLoading}
      >
        {cancelLabel}
      </Button>
      <Button
        type="button"
        variant="primary-dark"
        className="flex-1 font-display text-base font-semibold leading-5"
        disabled={isConfirmDisabled || isLoading}
        onClick={onConfirm}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {loadingLabel}
          </>
        ) : (
          confirmLabel
        )}
      </Button>
    </div>
  );
}
