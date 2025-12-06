import { getTranslations } from "next-intl/server";
import { cn } from "@/lib/utils";
import {
  Monitor,
  Shield,
  GraduationCap,
  Globe2,
  Code2,
  Rocket,
  Building2,
  type LucideIcon
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Monitor,
  Shield,
  GraduationCap,
  Globe2,
  Code2,
  Rocket,
  Building2,
};

interface TimelineCardProps {
  year: string;
  iconName: string;
  gradient: string;
}

export async function TimelineCard({ year, iconName, gradient }: TimelineCardProps) {
  const t = await getTranslations("experience");
  const Icon = iconMap[iconName];
  const skills = t.raw(`timeline.${year}.skills`) as string[];

  return (
    <div className="w-full max-w-xl lg:max-w-lg xl:max-w-2xl relative z-10">
      {/* Glass Card Container */}
      <div className="relative px-5 py-6 sm:px-8 sm:py-10 md:px-12 md:py-12 lg:px-10 lg:py-10 xl:px-16 xl:py-14 rounded-2xl md:rounded-3xl bg-[#141414] border border-white/10 shadow-2xl">
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none" />

        {/* Content */}
        <div className="relative z-10">
          {/* Header: Icon + Year */}
          <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
            <div
              className={cn(
                "h-8 w-8 sm:h-9 sm:w-9 rounded-lg flex items-center justify-center bg-gradient-to-br shadow-lg",
                gradient
              )}
            >
              <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-white" />
            </div>
            <span className="text-xl sm:text-2xl md:text-3xl font-bold text-white/20">
              {year}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 sm:mb-3">
            {t(`timeline.${year}.title`)}
          </h3>

          {/* Subtitle */}
          <p className="text-sm sm:text-base md:text-lg text-white/50 mb-4 sm:mb-8">
            {t(`timeline.${year}.subtitle`)}
          </p>

          {/* Description */}
          <p className="text-white/80 text-sm sm:text-base md:text-lg leading-relaxed mb-3 sm:mb-4">
            {t(`timeline.${year}.description`)}
          </p>

          {/* Expanded */}
          <p className="text-white/50 text-xs sm:text-sm md:text-base leading-relaxed mb-4 sm:mb-8">
            {t(`timeline.${year}.expanded`)}
          </p>

          {/* Skills */}
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {skills.map((skill) => (
              <span
                key={skill}
                className="px-2 sm:px-3 py-1 text-[10px] sm:text-xs rounded-full border backdrop-blur-sm bg-white/5 border-white/15 text-white/60 hover:bg-white/10 transition-colors"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
