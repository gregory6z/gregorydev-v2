import { MetadataRoute } from "next"

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://gregorypraxedes.fr"
const locales = ["en", "pt", "fr", "es"] as const

// All project slugs
const projectSlugs = [
	"la-bonne-reponse",
	"les-performeurs",
	"airwell-iot-router",
	"va-beauty",
	"ragboost",
	"sncf-util-ia",
]

export default function sitemap(): MetadataRoute.Sitemap {
	const currentDate = new Date()

	// Home pages for all locales
	const homePages = locales.map((locale) => ({
		url: `${baseUrl}/${locale}`,
		lastModified: currentDate,
		changeFrequency: "monthly" as const,
		priority: 1.0,
		alternates: {
			languages: Object.fromEntries(
				locales.map((l) => [l, `${baseUrl}/${l}`])
			),
		},
	}))

	// Project pages for all locales
	const projectPages = projectSlugs.flatMap((slug) =>
		locales.map((locale) => ({
			url: `${baseUrl}/${locale}/projects/${slug}`,
			lastModified: currentDate,
			changeFrequency: "monthly" as const,
			priority: 0.8,
			alternates: {
				languages: Object.fromEntries(
					locales.map((l) => [l, `${baseUrl}/${l}/projects/${slug}`])
				),
			},
		}))
	)

	return [...homePages, ...projectPages]
}
