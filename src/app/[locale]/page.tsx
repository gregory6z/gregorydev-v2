import Image from "next/image";
import { useTranslations } from "next-intl";
import { StarsBackground } from "@/components/ui/stars";
import { MobileBottomCTA } from "@/components/mobile-bottom-cta";
import { AboutSection } from "@/components/sections/about";
import { ProjectsSection } from "@/components/sections/projects";
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
} from "react-icons/si";

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
];

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
];

// Todos os logos combinados para mobile
const allLogos = [...leftLogos, ...rightLogos];

export default function HomePage() {
  const t = useTranslations("hero");

  return (
    <>
    <StarsBackground
      className="min-h-screen"
      speed={400}
      starColor="rgba(255,255,255,0.7)"
    >
      {/* Padding bottom extra no mobile para não sobrepor o CTA fixo */}
      <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-5 py-16 sm:px-4 sm:pt-24 sm:pb-20 lg:pt-28">
        <div className="relative z-20 mx-auto w-full max-w-[1320px] text-center">
          {/* Badge/Specialty - Short on mobile, full on desktop */}
          <span className="mb-4 sm:mb-6 inline-block rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs uppercase tracking-[0.12em] text-white/60 backdrop-blur-sm sm:px-4 sm:py-1.5 sm:text-sm sm:tracking-[0.2em]">
            <span className="sm:hidden">{t("specialtyShort")}</span>
            <span className="hidden sm:inline">{t("specialty")}</span>
          </span>

          {/* Nome - Tipografia responsiva */}
          <h1 className="font-heading text-[2.75rem] leading-[1.05] font-bold tracking-tight text-pretty sm:text-5xl md:text-7xl lg:text-8xl">
            <span className="bg-gradient-to-b from-white to-white/80 bg-clip-text text-transparent">
              {t("name")}
            </span>
          </h1>

          {/* Tagline - Sempre completa */}
          <p className="mx-auto mt-6 sm:mt-8 max-w-sm font-heading text-xl leading-snug tracking-wide text-pretty text-white/70 sm:max-w-2xl sm:text-3xl md:text-4xl">
            {t("tagline")}
          </p>

          {/* Description - Short on mobile, full on desktop */}
          <p className="mx-auto mt-4 sm:mt-4 max-w-sm text-sm leading-relaxed text-pretty text-white/40 sm:text-base sm:max-w-2xl lg:text-lg">
            <span className="sm:hidden">{t("descriptionShort")}</span>
            <span className="hidden sm:inline">{t("description")}</span>
          </p>

          {/* CTA Buttons - Visível apenas em desktop/tablet */}
          <div className="hidden sm:flex mt-6 flex-wrap items-center justify-center gap-4">
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

          {/* Avatar + Logos Section */}
          {/* Desktop: Avatar central com marquees laterais */}
          {/* Mobile: Avatar + marquee único abaixo */}

          {/* Desktop Layout - Hidden on mobile */}
          <div className="mt-12 sm:mt-16 hidden md:flex items-center justify-center">
            {/* Left logos sendo absorvidos >>> */}
            <div
              className="relative w-[560px] overflow-hidden"
              style={{
                maskImage:
                  "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
                WebkitMaskImage:
                  "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
              }}
            >
              <div className="flex animate-scroll-right">
                {[...leftLogos, ...leftLogos].map((tech, index) => (
                  <div
                    key={`${tech.name}-${index}`}
                    className="flex-shrink-0 px-12"
                  >
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
                maskImage:
                  "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
                WebkitMaskImage:
                  "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
              }}
            >
              <div className="flex animate-scroll-left">
                {[...rightLogos, ...rightLogos].map((tech, index) => (
                  <div
                    key={`${tech.name}-${index}`}
                    className="flex-shrink-0 px-12"
                  >
                    <tech.Icon className="h-11 w-11 text-white/50" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile Layout - Avatar + Single Marquee */}
          <div className="mt-8 flex flex-col items-center md:hidden">
            {/* Avatar - menor no mobile */}
            <div className="relative h-[72px] w-[72px] flex-shrink-0 overflow-hidden rounded-full border border-white/20">
              <Image
                src="/avatar.png"
                alt="Gregory Praxedes"
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Single Marquee - todos os logos */}
            <div
              className="mt-6 w-full overflow-hidden"
              style={{
                maskImage:
                  "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
                WebkitMaskImage:
                  "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
              }}
            >
              <div className="flex animate-scroll-mobile">
                {[...allLogos, ...allLogos].map((tech, index) => (
                  <div
                    key={`mobile-${tech.name}-${index}`}
                    className="flex-shrink-0 px-6"
                  >
                    <tech.Icon className="h-8 w-8 text-white/40" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* About Section */}
      <AboutSection />
    </StarsBackground>

    {/* Projects Section - Sem stars background */}
    <ProjectsSection />

    {/* Mobile Bottom CTA - Fixed na thumb zone */}
    <MobileBottomCTA />
  </>
  );
}
