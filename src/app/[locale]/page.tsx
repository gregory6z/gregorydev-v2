import Image from "next/image"
import { useTranslations } from "next-intl"
import { StarsBackground } from "@/components/ui/stars"
import {
	SiReact,
	SiNextdotjs,
	SiTypescript,
	SiNodedotjs,
	SiTailwindcss,
	SiPostgresql,
	SiDocker,
	SiFigma,
	SiPrisma,
	SiRedis,
	SiAmazonwebservices,
	SiGit,
	SiGraphql,
	SiOpenai,
	SiReactquery,
	SiSupabase,
} from "react-icons/si"

// Frontend tools (esquerda) - 8 logos
const leftLogos = [
	{ Icon: SiReact, name: "React" },
	{ Icon: SiNextdotjs, name: "Next.js" },
	{ Icon: SiTypescript, name: "TypeScript" },
	{ Icon: SiTailwindcss, name: "Tailwind" },
	{ Icon: SiFigma, name: "Figma" },
	{ Icon: SiReactquery, name: "React Query" },
	{ Icon: SiGit, name: "Git" },
	{ Icon: SiGraphql, name: "GraphQL" },
]

// Backend tools (direita) - 8 logos
const rightLogos = [
	{ Icon: SiNodedotjs, name: "Node.js" },
	{ Icon: SiPostgresql, name: "PostgreSQL" },
	{ Icon: SiPrisma, name: "Prisma" },
	{ Icon: SiDocker, name: "Docker" },
	{ Icon: SiRedis, name: "Redis" },
	{ Icon: SiAmazonwebservices, name: "AWS" },
	{ Icon: SiSupabase, name: "Supabase" },
	{ Icon: SiOpenai, name: "OpenAI" },
]

export default function HomePage() {
	const t = useTranslations("hero")

	return (
		<StarsBackground className="min-h-screen" speed={150} starColor="rgba(255,255,255,0.7)">
			<main className="relative flex min-h-screen flex-col items-center overflow-hidden px-4 pt-24 pb-20 lg:pt-28">
				{/* 21st.dev exact light effect - Left side */}
			{/*
			<div
				className="pointer-events-none absolute"
				style={{
					width: "560px",
					height: "1380px",
					top: "0px",
					left: "0px",
					right: "-560px",
					backgroundImage:
						"radial-gradient(68.54% 68.72% at 55.02% 31.46%, rgba(179, 217, 255, 0.08) 0px, rgba(26, 140, 255, 0.02) 50%, rgba(0, 115, 230, 0) 80%)",
					transform: "matrix(0.707107, -0.707107, 0.707107, 0.707107, 0, -350)",
				}}
			/>
			<div
				className="pointer-events-none absolute"
				style={{
					width: "448px",
					height: "1104px",
					top: "0px",
					left: "0px",
					right: "-448px",
					backgroundImage:
						"radial-gradient(50% 50%, rgba(179, 217, 255, 0.06) 0px, rgba(26, 140, 255, 0.02) 80%, rgba(0, 0, 0, 0) 100%)",
					transform: "matrix(0.707107, -0.707107, 0.707107, 0.707107, 0, -300)",
				}}
			/>
			<div
				className="pointer-events-none absolute"
				style={{
					width: "336px",
					height: "828px",
					top: "0px",
					left: "0px",
					right: "-336px",
					backgroundImage:
						"radial-gradient(50% 50%, rgba(179, 217, 255, 0.04) 0px, rgba(0, 115, 230, 0.02) 80%, rgba(0, 0, 0, 0) 100%)",
					transform: "matrix(0.707107, -0.707107, 0.707107, 0.707107, 0, -250)",
				}}
			/>
			*/}
			{/* 21st.dev exact light effect - Right side */}
			{/*
			<div
				className="pointer-events-none absolute"
				style={{
					width: "560px",
					height: "1380px",
					top: "0px",
					left: "-560px",
					right: "0px",
					backgroundImage:
						"radial-gradient(68.54% 68.72% at 55.02% 31.46%, rgba(179, 217, 255, 0.08) 0px, rgba(26, 140, 255, 0.02) 50%, rgba(0, 115, 230, 0) 80%)",
					transform: "matrix(0.707107, 0.707107, -0.707107, 0.707107, 0, -350)",
				}}
			/>
			<div
				className="pointer-events-none absolute"
				style={{
					width: "448px",
					height: "1104px",
					top: "0px",
					left: "-448px",
					right: "0px",
					backgroundImage:
						"radial-gradient(50% 50%, rgba(179, 217, 255, 0.06) 0px, rgba(26, 140, 255, 0.02) 80%, rgba(0, 0, 0, 0) 100%)",
					transform: "matrix(0.707107, 0.707107, -0.707107, 0.707107, 0, -300)",
				}}
			/>
			<div
				className="pointer-events-none absolute"
				style={{
					width: "336px",
					height: "828px",
					top: "0px",
					left: "-336px",
					right: "0px",
					backgroundImage:
						"radial-gradient(50% 50%, rgba(179, 217, 255, 0.04) 0px, rgba(0, 115, 230, 0.02) 80%, rgba(0, 0, 0, 0) 100%)",
					transform: "matrix(0.707107, 0.707107, -0.707107, 0.707107, 0, -250)",
				}}
			/>
			*/}

			<div className="relative z-20 mx-auto w-full max-w-[1320px] text-center">
				<span className="mb-6 inline-block rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm uppercase tracking-[0.2em] text-white/60 backdrop-blur-sm sm:text-base">
					{t("specialty")}
				</span>
				<h1 className="font-heading text-5xl font-bold tracking-tight text-pretty sm:text-7xl lg:text-8xl">
					<span className="bg-gradient-to-b from-white to-white/80 bg-clip-text text-transparent">
						{t("name")}
					</span>
				</h1>
				<p className="mx-auto mt-8 max-w-2xl font-heading text-3xl leading-snug tracking-wide text-pretty text-white/70 sm:text-4xl">
					{t("tagline")}
				</p>
				<p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-pretty text-white/40 sm:text-lg">
					{t("description")}
				</p>

				{/* CTA Buttons */}
				<div className="mt-8 flex flex-wrap items-center justify-center gap-4">
					<a
						href="#projects"
						className="rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition-colors hover:bg-white/90"
					>
						{t("cta.projects")}
					</a>
					<a
						href="#contact"
						className="rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-medium text-white backdrop-blur-sm transition-all hover:bg-white/10 hover:border-white/30"
					>
						{t("cta.contact")}
					</a>
				</div>

				{/* Avatar with logos going outward */}
				{/*
					Cálculo de simetria:
					- Logo: 44px (w-11) + 96px (px-12 × 2) = 140px por logo
					- 8 logos = 1120px por set
					- Container: 560px cada lado (exibe ~4 logos)
					- Avatar: 72px
					- Total: 560px + 72px + 560px = 1192px
				*/}
				<div className="mt-16 flex items-center justify-center">
					{/* Left logos sendo absorvidos >>> */}
					<div
						className="relative w-[560px] overflow-hidden"
						style={{
							maskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
							WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
						}}
					>
						<div className="flex animate-scroll-right">
							{[...leftLogos, ...leftLogos].map((tech, index) => (
								<div key={`${tech.name}-${index}`} className="flex-shrink-0 px-12">
									<tech.Icon className="h-11 w-11 text-white/50" />
								</div>
							))}
						</div>
					</div>

					{/* Avatar */}
					<div className="relative h-[72px] w-[72px] flex-shrink-0 overflow-hidden rounded-full border border-white/20">
						<Image
							src="/avatar.png"
							alt="Gregory Praxedes"
							fill
							className="object-cover"
							priority
						/>
					</div>

					{/* Right logos sendo absorvidos <<< */}
					<div
						className="relative w-[560px] overflow-hidden"
						style={{
							maskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
							WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
						}}
					>
						<div className="flex animate-scroll-left">
							{[...rightLogos, ...rightLogos].map((tech, index) => (
								<div key={`${tech.name}-${index}`} className="flex-shrink-0 px-12">
									<tech.Icon className="h-11 w-11 text-white/50" />
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
			</main>
		</StarsBackground>
	)
}
