"use client"

import Link from "next/link"
import { useTranslations } from "next-intl"

export function Header() {
	const t = useTranslations("header")

	return (
		<header className="fixed top-0 left-0 right-0 z-50 h-[57px] flex items-center justify-between px-6">
			{/* Logo / Name */}
			<Link href="/" className="font-heading text-lg font-semibold text-white/90 hover:text-white transition-colors">
				GP
			</Link>

			{/* Navigation */}
			<nav className="flex items-center gap-8">
				<Link href="#projects" className="text-sm text-white/60 hover:text-white transition-colors">
					{t("projects")}
				</Link>
				<Link href="#about" className="text-sm text-white/60 hover:text-white transition-colors">
					{t("about")}
				</Link>
				<Link href="#contact" className="text-sm text-white/60 hover:text-white transition-colors">
					{t("contact")}
				</Link>
			</nav>
		</header>
	)
}
