import { cn } from "@/lib/utils";

type RegisterStepperProps = {
  currentStep: number;
  totalSteps?: number;
};

export const RegisterStepper = ({
  currentStep,
  totalSteps = 3,
}: RegisterStepperProps) => {
  return (
    <div className="flex items-center justify-center gap-2">
      {Array.from({ length: totalSteps }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "size-2.5 rounded-full transition-colors",
            i + 1 === currentStep ? "bg-white" : "bg-white/30",
          )}
        />
      ))}
    </div>
  );
};
