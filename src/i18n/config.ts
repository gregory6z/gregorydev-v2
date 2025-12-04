export const locales = ["pt", "en", "es", "fr"] as const
export const defaultLocale = "pt" as const
export type Locale = (typeof locales)[number]
