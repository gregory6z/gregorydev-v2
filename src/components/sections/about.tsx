import { useTranslations } from "next-intl";
import { Star } from "lucide-react";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiNodedotjs,
  SiPostgresql,
  SiDocker,
  SiFigma,
  SiPrisma,
  SiRedis,
  SiGit,
  SiGraphql,
  SiSupabase,
  SiMysql,
  SiReactquery,
  SiFramer,
  SiZod,
  SiFastify,
  SiExpress,
  SiBun,
  SiNestjs,
  SiTurborepo,
  SiPulumi,
  SiRailway,
  SiAmazonwebservices,
} from "react-icons/si";

// Star rating component
function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-3 w-3 ${
            star <= rating
              ? "fill-yellow-200/60 text-yellow-200/60"
              : "fill-transparent text-white/15"
          }`}
        />
      ))}
    </div>
  );
}

const skills = {
  frontend: [
    { Icon: SiReact, name: "React", rating: 5 },
    { Icon: SiNextdotjs, name: "Next.js", rating: 5 },
    { Icon: SiTypescript, name: "TypeScript", rating: 4 },
    { Icon: SiTailwindcss, name: "Tailwind", rating: 5 },
    { Icon: SiReactquery, name: "React Query", rating: 5 },
    { Icon: SiFramer, name: "Framer Motion", rating: 3 },
    { Icon: null, name: "Zustand", rating: 3 },
    { Icon: SiZod, name: "Zod", rating: 4 },
  ],
  backend: [
    { Icon: SiNodedotjs, name: "Node.js", rating: 5 },
    { Icon: SiBun, name: "Bun", rating: 2 },
    { Icon: SiNestjs, name: "NestJS", rating: 4 },
    { Icon: SiFastify, name: "Fastify", rating: 5 },
    { Icon: SiExpress, name: "Express", rating: 5 },
    { Icon: null, name: "Elysia", rating: 2 },
    { Icon: SiGraphql, name: "GraphQL", rating: 1 },
    { Icon: SiPrisma, name: "Prisma", rating: 5 },
  ],
  databases: [
    { Icon: SiPostgresql, name: "PostgreSQL", rating: 3 },
    { Icon: SiMysql, name: "MySQL", rating: 3 },
    { Icon: SiRedis, name: "Redis", rating: 2 },
    { Icon: SiSupabase, name: "Supabase", rating: 2 },
  ],
  tools: [
    { Icon: SiDocker, name: "Docker", rating: 2 },
    { Icon: SiGit, name: "Git", rating: 4 },
    { Icon: SiFigma, name: "Figma", rating: 3 },
    { Icon: SiTurborepo, name: "Turborepo", rating: 2 },
    { Icon: SiPulumi, name: "Pulumi", rating: 2 },
    { Icon: SiRailway, name: "Railway", rating: 4 },
    { Icon: SiAmazonwebservices, name: "AWS", rating: 2 },
  ],
};

export function AboutSection() {
  const t = useTranslations("about");

  return (
    <section id="about" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6">
        {/* Section Title */}
        <h2 className="text-center text-sm uppercase tracking-[0.2em] text-white/40 mb-16">
          {t("sectionTitle")}
        </h2>

        {/* Intro */}
        <p className="mx-auto max-w-2xl text-center text-2xl sm:text-3xl font-heading font-bold leading-snug text-white mb-20">
          {t("intro")}
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {/* Experience */}
          <div className="text-center md:text-left p-8 rounded-2xl border border-white/5 bg-white/[0.02]">
            <span className="text-6xl sm:text-7xl font-bold bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">
              {t("experience.years")}
            </span>
            <p className="text-white/50 text-base uppercase tracking-wider mt-2 font-medium">
              {t("experience.label")}
            </p>
            <p className="text-white/70 text-base mt-4 leading-relaxed">
              {t("experience.description")}
            </p>
          </div>

          {/* Specialization */}
          <div className="text-center md:text-left p-8 rounded-2xl border border-white/5 bg-white/[0.02]">
            <h3 className="text-xl font-bold text-white mb-4">
              {t("specialization.title")}
            </h3>
            <p className="text-white/70 text-base leading-relaxed">
              {t("specialization.description")}
            </p>
          </div>

          {/* Differential */}
          <div className="text-center md:text-left p-8 rounded-2xl border border-white/5 bg-white/[0.02]">
            <h3 className="text-xl font-bold text-white mb-4">
              {t("differential.title")}
            </h3>
            <p className="text-white/70 text-base leading-relaxed">
              {t("differential.description")}
            </p>
          </div>
        </div>

        {/* Skills Section */}
        <div>
          <h3 className="text-center text-lg font-semibold text-white/90 mb-12">
            {t("skills.title")}
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {/* Frontend */}
            <div>
              <h4 className="text-xs uppercase tracking-wider text-white/40 mb-4 text-center">
                {t("skills.categories.frontend")}
              </h4>
              <div className="flex flex-col gap-3">
                {skills.frontend.map((skill) => (
                  <div
                    key={skill.name}
                    className="flex items-center gap-3 p-3 rounded-lg border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-colors"
                  >
                    {skill.Icon ? (
                      <skill.Icon className="h-5 w-5 text-white/50 flex-shrink-0" />
                    ) : (
                      <span className="h-5 w-5 flex items-center justify-center text-xs text-white/50 font-bold flex-shrink-0">
                        {skill.name.charAt(0)}
                      </span>
                    )}
                    <div className="flex flex-col gap-1 min-w-0">
                      <span className="text-sm text-white/70 truncate">{skill.name}</span>
                      <StarRating rating={skill.rating} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Backend */}
            <div>
              <h4 className="text-xs uppercase tracking-wider text-white/40 mb-4 text-center">
                {t("skills.categories.backend")}
              </h4>
              <div className="flex flex-col gap-3">
                {skills.backend.map((skill) => (
                  <div
                    key={skill.name}
                    className="flex items-center gap-3 p-3 rounded-lg border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-colors"
                  >
                    {skill.Icon ? (
                      <skill.Icon className="h-5 w-5 text-white/50 flex-shrink-0" />
                    ) : (
                      <span className="h-5 w-5 flex items-center justify-center text-xs text-white/50 font-bold flex-shrink-0">
                        {skill.name.charAt(0)}
                      </span>
                    )}
                    <div className="flex flex-col gap-1 min-w-0">
                      <span className="text-sm text-white/70 truncate">{skill.name}</span>
                      <StarRating rating={skill.rating} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Databases */}
            <div>
              <h4 className="text-xs uppercase tracking-wider text-white/40 mb-4 text-center">
                {t("skills.categories.databases")}
              </h4>
              <div className="flex flex-col gap-3">
                {skills.databases.map((skill) => (
                  <div
                    key={skill.name}
                    className="flex items-center gap-3 p-3 rounded-lg border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-colors"
                  >
                    <skill.Icon className="h-5 w-5 text-white/50 flex-shrink-0" />
                    <div className="flex flex-col gap-1 min-w-0">
                      <span className="text-sm text-white/70 truncate">{skill.name}</span>
                      <StarRating rating={skill.rating} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tools */}
            <div>
              <h4 className="text-xs uppercase tracking-wider text-white/40 mb-4 text-center">
                {t("skills.categories.tools")}
              </h4>
              <div className="flex flex-col gap-3">
                {skills.tools.map((skill) => (
                  <div
                    key={skill.name}
                    className="flex items-center gap-3 p-3 rounded-lg border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-colors"
                  >
                    <skill.Icon className="h-5 w-5 text-white/50 flex-shrink-0" />
                    <div className="flex flex-col gap-1 min-w-0">
                      <span className="text-sm text-white/70 truncate">{skill.name}</span>
                      <StarRating rating={skill.rating} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
