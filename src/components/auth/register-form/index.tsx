import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  registerSchema,
  type RegisterFormData,
  type SiretLookupResponse,
} from "@/api/users/schemas";
import { RegisterStepper } from "./register-stepper";
import { RegisterStepSiret } from "./register-step-siret";
import { RegisterStepCompany } from "./register-step-company";
import { RegisterStepUser } from "./register-step-user";
import { RegisterConfirmation } from "./register-confirmation";

type Step = 1 | 2 | 3 | "done";

export const RegisterForm = () => {
  const [step, setStep] = useState<Step>(1);

  const methods = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      companySiret: "",
      companyName: "",
      companyAddress: "",
      companyPostalCode: "",
      companyCity: "",
      companyPhoneNumber: "",
      userLastName: "",
      userFirstName: "",
      userEmail: "",
      userPhoneNumber: "",
      userPassword: "",
      userPasswordConfirmation: "",
    },
  });

  const handleNextStep1 = (data: SiretLookupResponse) => {
    methods.setValue("companyName", data.name);
    methods.setValue("companyAddress", data.address);
    methods.setValue("companyPostalCode", data.postal_code);
    methods.setValue("companyCity", data.city);
    setStep(2);
  };

  if (step === "done") {
    return <RegisterConfirmation />;
  }

  return (
    <FormProvider {...methods}>
      <div className="flex flex-col gap-10">
        {step === 1 && <RegisterStepSiret onNext={handleNextStep1} />}
        {step === 2 && (
          <RegisterStepCompany
            onNext={() => setStep(3)}
            onBack={() => setStep(1)}
          />
        )}
        {step === 3 && (
          <RegisterStepUser
            onBack={() => setStep(2)}
            onComplete={() => setStep("done")}
          />
        )}
        <RegisterStepper currentStep={step} />
      </div>
    </FormProvider>
  );
};
