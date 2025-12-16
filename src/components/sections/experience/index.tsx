import { getTranslations } from "next-intl/server";
import { ExperienceWrapper } from "./experience-wrapper";
import { TimelineCard } from "./timeline-card";
import { type EffectType } from "@/components/ui/effects";

// Timeline data - static configuration
const timelineData = [
  {
    year: "2008",
    iconName: "Monitor",
    gradient: "from-cyan-500 to-blue-600",
    effect: "matrix" as EffectType,
    colors: ["#06b6d4", "#0ea5e9", "#3b82f6", "#22d3ee"],
  },
  {
    year: "2012",
    iconName: "Shield",
    gradient: "from-green-500 to-emerald-600",
    effect: "fog" as EffectType,
    colors: ["#22c55e", "#10b981", "#059669", "#14b8a6"],
  },
  {
    year: "2013",
    iconName: "GraduationCap",
    gradient: "from-purple-500 to-violet-600",
    effect: "connections" as EffectType,
    colors: ["#a855f7", "#8b5cf6", "#7c3aed", "#6366f1"],
  },
  {
    year: "2017",
    iconName: "Globe2",
    gradient: "from-blue-500 to-blue-600",
    effect: "aurora" as EffectType,
    colors: ["#2563eb", "#e0e7ff", "#dc2626", "#1e40af"],
  },
  {
    year: "2020",
    iconName: "Code2",
    gradient: "from-emerald-500 to-green-600",
    effect: "calm" as EffectType,
    colors: ["#10b981", "#22c55e", "#34d399", "#059669"],
  },
  {
    year: "2021",
    iconName: "Rocket",
    gradient: "from-yellow-500 to-amber-600",
    effect: "rising" as EffectType,
    colors: ["#eab308", "#f59e0b", "#fbbf24", "#d97706"],
  },
  {
    year: "2024",
    iconName: "Building2",
    gradient: "from-purple-600 to-fuchsia-500",
    effect: "globe" as EffectType,
    colors: ["#9333ea", "#a855f7", "#c026d3", "#7c3aed"],
  },
];

export async function ExperienceSection() {
  const t = await getTranslations("experience");

  // Data for the client wrapper (effects and navigation)
  const timelineItems = timelineData.map(item => ({
    year: item.year,
    effect: item.effect,
    colors: item.colors,
  }));

  return (
    <section id="experience" className="relative bg-black">
      {/* Section Header - Server Rendered */}
      <div className="min-h-[50vh] md:min-h-screen md:h-screen flex items-center justify-center py-16 md:py-0">
        <div className="mx-auto max-w-[1320px] px-4 sm:px-6 text-center">
          <h2 className="text-sm uppercase tracking-[0.2em] text-white/40 mb-4 md:mb-6">
            {t("sectionTitle")}
          </h2>
          <p className="mx-auto max-w-2xl text-xl sm:text-2xl md:text-4xl font-heading font-medium leading-relaxed text-white/90">
            {t("intro")}
          </p>

          {/* Scroll indicator - static, no animation needed */}
          <div className="mt-8 md:mt-16">
            <div className="w-6 h-10 mx-auto rounded-full border-2 border-white/30 flex items-start justify-center p-2">
              <div className="w-1.5 h-1.5 rounded-full bg-white/60 animate-bounce" />
            </div>
          </div>
        </div>
      </div>

      {/* Timeline Content - Client wrapper with Server children */}
      <ExperienceWrapper timelineItems={timelineItems}>
        {timelineData.map((item, index) => (
          <div
            key={item.year}
            data-timeline-card={index}
            className="min-h-[60vh] md:min-h-screen md:h-screen flex items-center justify-start relative py-6 md:py-0"
          >
            <TimelineCard
              year={item.year}
              iconName={item.iconName}
              gradient={item.gradient}
            />
          </div>
        ))}
      </ExperienceWrapper>
    </section>
  );
}
