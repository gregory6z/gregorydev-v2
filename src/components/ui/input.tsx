import * as React from "react";
import { Input as InputPrimitive } from "@base-ui/react/input";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const inputVariants = cva(
  "w-full min-w-0 outline-none transition-[color,box-shadow] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "border-input focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 h-9 rounded-md border bg-white px-2.5 py-1 text-base shadow-xs focus-visible:ring-1 focus-visible:ring-offset-0 aria-invalid:ring-[3px] md:text-sm file:h-7 file:text-sm file:font-medium file:text-foreground file:inline-flex file:border-0 file:bg-transparent placeholder:text-muted-foreground",
        auth: "h-12.5 rounded-lg border border-transparent bg-white/10 px-6 py-3 font-display text-lg text-white placeholder:text-white/40 focus:ring-1 focus:ring-white/30 aria-invalid:border-primary aria-invalid:ring-1 aria-invalid:ring-primary/30",
        account:
          "h-[50px] rounded-lg border border-transparent bg-[#ecebe8]/50 px-4 font-display text-lg font-semibold leading-[140%] text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-1 aria-invalid:border-destructive aria-invalid:ring-1 aria-invalid:ring-destructive/30",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function Input({
  className,
  type,
  variant = "default",
  ...props
}: React.ComponentProps<"input"> & VariantProps<typeof inputVariants>) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(inputVariants({ variant, className }))}
      {...props}
    />
  );
}

export { Input, inputVariants };
