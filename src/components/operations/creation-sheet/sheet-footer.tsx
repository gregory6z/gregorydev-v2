import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";

type CreationSheetFooterProps = {
  onCancel: () => void;
  onNext: () => void;
  isNextDisabled: boolean;
};

export function CreationSheetFooter({
  onCancel,
  onNext,
  isNextDisabled,
}: CreationSheetFooterProps) {
  const { t } = useTranslation("operations");

  return (
    <div
      data-slot="creation-sheet-footer"
      className="mt-auto flex gap-4 border-t border-table-border pt-6"
    >
      <Button
        type="button"
        variant="outline-primary"
        className="flex-1"
        onClick={onCancel}
      >
        {t("creation.cancel")}
      </Button>
      <Button
        type="button"
        className="flex-1"
        disabled={isNextDisabled}
        onClick={onNext}
      >
        {t("creation.next")}
      </Button>
    </div>
  );
}
