interface PersonStructuredDataProps {
	locale: string
}

export function PersonStructuredData({ locale }: PersonStructuredDataProps) {
	const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://gregorypraxedes.fr"

	const structuredData = {
		"@context": "https://schema.org",
		"@type": "Person",
		"name": "Gregory Praxedes",
		"url": `${baseUrl}/${locale}`,
		"image": `${baseUrl}/avatar.png`,
		"sameAs": [
			"https://github.com/gregorypraxedes",
			"https://linkedin.com/in/gregorypraxedes",
			"https://twitter.com/gregorypraxedes",
		],
		"jobTitle": "Full Stack Developer",
		"description":
			"Full Stack Developer specializing in React, Next.js, TypeScript, and Node.js. Building high-performance web applications with focus on UI/UX and automation.",
		"knowsAbout": [
			"React",
			"Next.js",
			"TypeScript",
			"Node.js",
			"PostgreSQL",
			"Docker",
			"Tailwind CSS",
			"UI/UX Design",
			"Web Development",
			"Full Stack Development",
		],
		"alumniOf": {
			"@type": "Organization",
			"name": "Your University Name",
		},
		"address": {
			"@type": "PostalAddress",
			"addressCountry": "FR",
		},
	}

	return (
		<script
			type="application/ld+json"
			dangerouslySetInnerHTML={{
				__html: JSON.stringify(structuredData),
			}}
		/>
	)
}

interface ProjectStructuredDataProps {
	project: {
		title: string
		description: string
		url: string
		image?: string
		datePublished?: string
		dateModified?: string
	}
	locale: string
}

export function ProjectStructuredData({
	project,
	locale,
}: ProjectStructuredDataProps) {
	const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://gregorypraxedes.fr"

	const structuredData = {
		"@context": "https://schema.org",
		"@type": "CreativeWork",
		"name": project.title,
		"description": project.description,
		"url": project.url,
		"image": project.image || `${baseUrl}/og-image.png`,
		"author": {
			"@type": "Person",
			"name": "Gregory Praxedes",
			"url": `${baseUrl}/${locale}`,
		},
		"creator": {
			"@type": "Person",
			"name": "Gregory Praxedes",
		},
		"inLanguage": locale,
		...(project.datePublished && { "datePublished": project.datePublished }),
		...(project.dateModified && { "dateModified": project.dateModified }),
	}

	return (
		<script
			type="application/ld+json"
			dangerouslySetInnerHTML={{
				__html: JSON.stringify(structuredData),
			}}
		/>
	)
}

interface WebsiteStructuredDataProps {
	locale: string
}

export function WebsiteStructuredData({ locale }: WebsiteStructuredDataProps) {
	const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://gregorypraxedes.fr"

	const structuredData = {
		"@context": "https://schema.org",
		"@type": "WebSite",
		"name": "Gregory Praxedes Portfolio",
		"url": `${baseUrl}/${locale}`,
		"description":
			"Full Stack Developer portfolio showcasing web development projects and expertise in React, Next.js, and modern web technologies.",
		"author": {
			"@type": "Person",
			"name": "Gregory Praxedes",
		},
		"inLanguage": locale,
		"potentialAction": {
			"@type": "SearchAction",
			"target": {
				"@type": "EntryPoint",
				"urlTemplate": `${baseUrl}/${locale}?q={search_term_string}`,
			},
			"query-input": "required name=search_term_string",
		},
	}

	return (
		<script
			type="application/ld+json"
			dangerouslySetInnerHTML={{
				__html: JSON.stringify(structuredData),
			}}
		/>
	)
}
