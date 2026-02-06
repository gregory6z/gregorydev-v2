import * as React from "react";
import { Icon } from "@iconify/react";
import { Input, inputVariants } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const toggleVariants = cva(
  "absolute right-4 top-1/2 -translate-y-1/2 transition-colors",
  {
    variants: {
      variant: {
        default: "text-muted-foreground hover:text-foreground",
        auth: "text-white/40 hover:text-white/70",
        account: "text-muted-foreground hover:text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

type PasswordInputProps = Omit<React.ComponentProps<"input">, "type"> &
  VariantProps<typeof inputVariants>;

export const PasswordInput = React.forwardRef<
  HTMLInputElement,
  PasswordInputProps
>(({ className, variant, ...props }, ref) => {
  const [visible, setVisible] = React.useState(false);

  return (
    <div className="relative">
      <Input
        ref={ref}
        type={visible ? "text" : "password"}
        variant={variant}
        className={cn(
          "pr-10",
          !visible &&
            "placeholder:font-display placeholder:text-lg placeholder:leading-[140%] placeholder:tracking-normal",
          className,
        )}
        {...props}
      />
      <button
        type="button"
        className={toggleVariants({ variant })}
        onClick={() => setVisible((v) => !v)}
        tabIndex={-1}
      >
        <Icon
          icon={visible ? "iconoir:eye" : "iconoir:eye-off"}
          className="size-5"
        />
      </button>
    </div>
  );
});

PasswordInput.displayName = "PasswordInput";
