import type { Metadata } from "next"
import { Inter, Space_Grotesk } from "next/font/google"
import { NextIntlClientProvider } from "next-intl"
import { getMessages } from "next-intl/server"
import { notFound } from "next/navigation"
import { routing } from "@/i18n/routing"
import { Header } from "@/components/header"
import { PersonStructuredData, WebsiteStructuredData } from "@/components/structured-data"
import "../globals.css"

const inter = Inter({
	variable: "--font-inter",
	subsets: ["latin"],
	display: "swap",
	weight: ["400", "500", "600", "700"],
	preload: true,
})

const spaceGrotesk = Space_Grotesk({
	variable: "--font-space-grotesk",
	subsets: ["latin"],
	display: "swap",
	weight: ["400", "500", "600", "700"],
	preload: true,
})

export const metadata: Metadata = {
	metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://gregorypraxedes.fr"),
	title: {
		template: "%s | Gregory Praxedes",
		default: "Gregory Praxedes | Full Stack Developer & UI/UX Specialist",
	},
	description:
		"Full Stack Developer specializing in React, Next.js, TypeScript, and Node.js. Building high-performance web applications with focus on UI/UX and automation.",
	keywords: [
		"Full Stack Developer",
		"React Developer",
		"Next.js",
		"TypeScript",
		"Node.js",
		"UI/UX",
		"Web Development",
		"Gregory Praxedes",
		"Frontend Developer",
		"Backend Developer",
		"Tailwind CSS",
		"PostgreSQL",
		"Docker",
	],
	authors: [{ name: "Gregory Praxedes", url: "https://gregorypraxedes.fr" }],
	creator: "Gregory Praxedes",
	publisher: "Gregory Praxedes",
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
	openGraph: {
		type: "website",
		locale: "en_US",
		url: "https://gregorypraxedes.fr",
		siteName: "Gregory Praxedes Portfolio",
		title: "Gregory Praxedes | Full Stack Developer & UI/UX Specialist",
		description:
			"Full Stack Developer specializing in React, Next.js, TypeScript, and Node.js. Building high-performance web applications.",
		images: [
			{
				url: "/og-image.png",
				width: 1200,
				height: 630,
				alt: "Gregory Praxedes - Full Stack Developer",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "Gregory Praxedes | Full Stack Developer",
		description:
			"Full Stack Developer specializing in React, Next.js, TypeScript, and Node.js.",
		images: ["/og-image.png"],
		creator: "@gregorypraxedes",
	},
	verification: {
		google: process.env.GOOGLE_SITE_VERIFICATION,
	},
	alternates: {
		canonical: "/",
		languages: {
			"en": "/en",
			"pt": "/pt",
			"fr": "/fr",
			"es": "/es",
		},
	},
}

type Props = {
	children: React.ReactNode
	params: Promise<{ locale: string }>
}

export default async function LocaleLayout({ children, params }: Props) {
	const { locale } = await params

	if (!routing.locales.includes(locale as "pt" | "en" | "es" | "fr")) {
		notFound()
	}

	const messages = await getMessages()

	return (
		<html lang={locale} className="dark">
			<head>
				<PersonStructuredData locale={locale} />
				<WebsiteStructuredData locale={locale} />
			</head>
			<body
				className={`${inter.variable} ${spaceGrotesk.variable} bg-black font-sans text-white antialiased`}
			>
				<NextIntlClientProvider messages={messages}>
					<Header />
					{children}
				</NextIntlClientProvider>
			</body>
		</html>
	)
}
