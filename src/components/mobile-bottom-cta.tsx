import { getTranslations } from "next-intl/server";

export async function MobileBottomCTA() {
	const t = await getTranslations("hero");

	return (
		<div className="fixed bottom-0 left-0 right-0 z-40 p-4 pb-6 sm:hidden">
			{/* Gradient fade para transição suave */}
			<div
				className="absolute inset-0 pointer-events-none"
				style={{
					background: "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.8) 50%, transparent 100%)",
				}}
			/>

			{/* Botões */}
			<div className="relative flex gap-3">
				<a
					href="#projects"
					className="flex-1 flex items-center justify-center rounded-full bg-white py-4 text-base font-medium text-black transition-colors active:bg-white/90"
				>
					{t("cta.projects")}
				</a>
				<a
					href="#contact"
					className="flex-1 flex items-center justify-center rounded-full border border-white/20 bg-white/10 py-4 text-base font-medium text-white backdrop-blur-md transition-all active:bg-white/20"
				>
					{t("cta.contact")}
				</a>
			</div>
		</div>
	)
}
