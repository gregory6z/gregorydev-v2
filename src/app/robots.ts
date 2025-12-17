import { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
	const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://gregorypraxedes.fr"

	return {
		rules: [
			{
				userAgent: "*",
				allow: "/",
				disallow: [
					"/api/",
					"/_next/",
					"/admin/",
					"*.json$",
				],
			},
			{
				userAgent: "Googlebot",
				allow: "/",
				crawlDelay: 0,
			},
			{
				userAgent: "Bingbot",
				allow: "/",
				crawlDelay: 0,
			},
		],
		sitemap: `${baseUrl}/sitemap.xml`,
		host: baseUrl,
	}
}
