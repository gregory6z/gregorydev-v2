import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

type ValidationFieldProps = {
  label: string;
  value: string;
  isValidated: boolean;
  onToggleValidation: () => void;
};

export function ValidationField({
  label,
  value,
  isValidated,
  onToggleValidation,
}: ValidationFieldProps) {
  return (
    <div data-slot="validation-field" className="space-y-2">
      <Label>{label}</Label>
      <div className="flex gap-2">
        <Input
          value={value}
          readOnly
          className="flex-1 h-[50px] bg-white cursor-default focus-visible:ring-0 focus-visible:border-border"
        />
        <Button
          type="button"
          variant={isValidated ? "primary-dark" : "outline-primary"}
          size="default"
          onClick={onToggleValidation}
          className="w-12 h-[50px] shrink-0 font-display text-base font-semibold leading-5"
          aria-label={isValidated ? "Annuler la validation" : "Valider"}
        >
          {isValidated ? <Check className="h-4 w-4" /> : "OK"}
        </Button>
      </div>
    </div>
  );
}
