"use client"

import { useTranslations } from "next-intl"
import { ContactModal } from "@/components/ui/contact-modal"
import { cn } from "@/lib/utils"

interface ContactButtonProps {
  variant?: "primary" | "secondary"
  translationKey?: string
}

export function ContactButton({ variant = "primary", translationKey = "cta.button" }: ContactButtonProps) {
  const t = useTranslations()

  return (
    <ContactModal>
      <button
        className={cn(
          "rounded-full px-6 py-3 text-sm font-medium transition-all",
          variant === "primary" &&
            "bg-white text-black hover:bg-white/90 shadow-lg sm:px-8 sm:py-4 sm:text-base",
          variant === "secondary" &&
            "border border-white/20 bg-white/5 text-white backdrop-blur-sm hover:bg-white/10 hover:border-white/30"
        )}
      >
        {t(translationKey)}
      </button>
    </ContactModal>
  )
}
