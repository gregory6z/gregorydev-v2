import type { Metadata } from "next"
import { Inter, Space_Grotesk } from "next/font/google"
import { NextIntlClientProvider } from "next-intl"
import { getMessages } from "next-intl/server"
import { notFound } from "next/navigation"
import { routing } from "@/i18n/routing"
import { Header } from "@/components/header"
import "../globals.css"

const inter = Inter({
	variable: "--font-inter",
	subsets: ["latin"],
})

const spaceGrotesk = Space_Grotesk({
	variable: "--font-space-grotesk",
	subsets: ["latin"],
})

export const metadata: Metadata = {
	title: "Gregory Praxedes | Full Stack Developer",
	description:
		"Portfolio de Gregory Praxedes - Desenvolvedor Full Stack com foco em UI/UX e automações",
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
				{/* Debug console for mobile - REMOVE AFTER DEBUGGING */}
				<script src="https://cdn.jsdelivr.net/npm/eruda"></script>
				<script dangerouslySetInnerHTML={{ __html: 'eruda.init();' }} />
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
