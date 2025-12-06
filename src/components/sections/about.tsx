import { useTranslations } from "next-intl";
import { Star, GraduationCap } from "lucide-react";
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
  SiN8N,
  SiPrismic,
  SiCalendly,
  SiResend,
  SiStripe,
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
    { Icon: null, name: "Claude Code", rating: 4 },
  ],
  platforms: [
    { Icon: SiN8N, name: "n8n", rating: 3 },
    { Icon: SiStripe, name: "Stripe", rating: 4 },
    { Icon: SiPrismic, name: "Prismic", rating: 3 },
    { Icon: SiCalendly, name: "Cal.com", rating: 3 },
    { Icon: SiResend, name: "Resend", rating: 4 },
  ],
};

const formations = {
  anhanguera: {
    school: "Universidade Anhanguera",
    period: "2013 – 2016",
    skillKeys: ["algorithms", "database", "programming", "networks"],
  },
  rocketseat: {
    school: "Rocketseat",
    title: "GoStack & Ignite Programs",
    skills: [
      "React",
      "Next.js",
      "Node.js",
      "TypeScript",
      "Clean Architecture",
      "DDD",
      "Docker",
      "NestJS",
      "Fastify",
      "Prisma",
      "SOLID",
      "JWT",
      "Vitest",
      "Storybook",
    ],
    certKeys: ["igniteNode", "igniteReact", "cleanCode", "seo", "figma", "gostack"],
  },
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

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
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

            {/* Platforms */}
            <div>
              <h4 className="text-xs uppercase tracking-wider text-white/40 mb-4 text-center">
                {t("skills.categories.platforms")}
              </h4>
              <div className="flex flex-col gap-3">
                {skills.platforms.map((skill) => (
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

        {/* Formations Section */}
        <div className="mt-24">
          <h3 className="text-center text-lg font-semibold text-white/90 mb-12">
            {t("formations.title")}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Anhanguera */}
            <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-white/5">
                  <GraduationCap className="h-6 w-6 text-white/60" />
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-white">{formations.anhanguera.school}</h4>
                  <p className="text-sm text-white/40 mt-1">{formations.anhanguera.period}</p>
                  <p className="text-base text-white/70 mt-2">{t("formations.anhanguera.title")}</p>
                  <p className="text-sm text-white/50 mt-1">{t("formations.anhanguera.description")}</p>

                  <div className="flex flex-wrap gap-2 mt-4">
                    {formations.anhanguera.skillKeys.map((skillKey) => (
                      <span
                        key={skillKey}
                        className="px-2 py-1 text-xs rounded-full bg-white/5 border border-white/10 text-white/60"
                      >
                        {t(`formations.anhanguera.skills.${skillKey}`)}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Rocketseat */}
            <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-white/5">
                  <GraduationCap className="h-6 w-6 text-white/60" />
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-white">{formations.rocketseat.school}</h4>
                  <p className="text-sm text-white/40 mt-1">{t("formations.rocketseat.period")}</p>
                  <p className="text-base text-white/70 mt-2">{formations.rocketseat.title}</p>
                  <p className="text-sm text-white/50 mt-1">{t("formations.rocketseat.description")}</p>

                  <div className="flex flex-wrap gap-2 mt-4">
                    {formations.rocketseat.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-1 text-xs rounded-full bg-white/5 border border-white/10 text-white/60"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  <div className="mt-4 pt-4 border-t border-white/5">
                    <p className="text-xs uppercase tracking-wider text-white/40 mb-2">
                      {t("formations.certifications")}
                    </p>
                    <div className="flex flex-wrap gap-x-4 gap-y-1">
                      {formations.rocketseat.certKeys.map((certKey) => (
                        <span
                          key={certKey}
                          className="text-xs text-white/50"
                        >
                          {t(`formations.rocketseat.certs.${certKey}`)}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
