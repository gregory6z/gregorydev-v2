"use client"

import { Check, Loader2, Send } from "lucide-react"
import { useTranslations } from "next-intl"
import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

interface ContactModalProps {
  children: React.ReactNode
}

// Email validation regex
const isValidEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

type FormData = {
  name: string
  email: string
  message: string
  honeypot: string // Anti-bot field
}

export function ContactModal({ children }: ContactModalProps) {
  const t = useTranslations("contact.modal")
  const [isOpen, setIsOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
    honeypot: "",
  })

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const canSubmit = () => {
    return (
      formData.name !== "" &&
      formData.email !== "" &&
      isValidEmail(formData.email) &&
      formData.message !== ""
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!canSubmit()) return

    // Honeypot check - if filled, it's a bot
    if (formData.honeypot) {
      // Fake success to not alert the bot
      setIsSuccess(true)
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      // Lazy load EmailJS only when submitting
      const emailjs = (await import("@emailjs/browser")).default

      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!,
      )

      setIsSuccess(true)
    } catch {
      setError(t("error"))
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open)
    if (!open) {
      setTimeout(() => {
        setIsSuccess(false)
        setError(null)
        setFormData({
          name: "",
          email: "",
          message: "",
          honeypot: "",
        })
      }, 300)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto bg-[#141414] border-white/10 text-white p-6 sm:p-8">
        {isSuccess ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-500/20">
              <Check className="h-10 w-10 text-green-500" />
            </div>
            <h3 className="mb-2 text-2xl font-semibold">{t("success.title")}</h3>
            <p className="text-muted-foreground max-w-sm">
              {t("success.description")}
            </p>
            <button
              type="button"
              onClick={() => handleOpenChange(false)}
              className="mt-8 px-6 py-2 rounded-full border hover:bg-accent transition-colors"
            >
              {t("success.close")}
            </button>
          </div>
        ) : (
          <>
            <DialogHeader className="space-y-3">
              <DialogTitle className="text-2xl font-semibold text-white">{t("title")}</DialogTitle>
              <DialogDescription className="text-gray-400 text-base">
                {t("description")}
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-5 mt-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-white">
                  {t("name")} <span className="text-red-500">{t("required")}</span>
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => updateFormData("name", e.target.value)}
                  placeholder={t("namePlaceholder")}
                  required
                  className="border-white/10 bg-white/5 text-white placeholder:text-gray-500 focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/20 transition-all"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">
                  {t("email")} <span className="text-red-500">{t("required")}</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateFormData("email", e.target.value)}
                  placeholder={t("emailPlaceholder")}
                  required
                  className="border-white/10 bg-white/5 text-white placeholder:text-gray-500 focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/20 transition-all"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-white">
                  {t("message")} <span className="text-red-500">{t("required")}</span>
                </Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => updateFormData("message", e.target.value)}
                  placeholder={t("messagePlaceholder")}
                  rows={6}
                  required
                  className="resize-none border-white/10 bg-white/5 text-white placeholder:text-gray-500 focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/20 transition-all"
                />
              </div>

              {/* Honeypot - hidden from humans, visible to bots */}
              <div className="absolute -left-[9999px] opacity-0 h-0 overflow-hidden" aria-hidden="true">
                <label htmlFor="website_url">Website URL</label>
                <input
                  type="text"
                  id="website_url"
                  name="website_url"
                  tabIndex={-1}
                  autoComplete="off"
                  value={formData.honeypot}
                  onChange={(e) => updateFormData("honeypot", e.target.value)}
                />
              </div>

              {error && <p className="text-sm text-red-500">{error}</p>}

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  disabled={!canSubmit() || isSubmitting}
                  className={cn(
                    "flex items-center justify-center gap-2 px-6 py-2.5 rounded-full font-medium text-sm transition-all",
                    canSubmit() && !isSubmitting
                      ? "bg-white text-black hover:bg-white/90"
                      : "bg-white/10 text-white/40 cursor-not-allowed",
                  )}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      {t("submitting")}
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      {t("submit")}
                    </>
                  )}
                </button>
              </div>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
