import { getTranslations } from "next-intl/server";
import Link from "next/link";
import Image from "next/image";

// Project card images
const projectImages: Record<string, string> = {
  "la-bonne-reponse": "/images/projects/lbr/main-lbr.png",
  "les-performeurs": "/images/projects/les-performeurs/main-les-performeurs.png",
  "airwell-iot-router": "/images/projects/router-iot.svg",
  "ragboost": "/images/projects/ragboost/ragboost-main.png",
  "va-beauty": "/images/projects/va-beauty/home-hero.png",
};

export async function ProjectsSection() {
  const t = await getTranslations("projects");

  const items = t.raw("items") as Array<{
    title: string;
    tags: string;
    description: string;
    slug: string;
  }>;

  return (
    <section id="projects" className="relative py-24 sm:py-32 bg-[#0a0a0a]">
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6">
        {/* Section Title - Left aligned with count badge */}
        <div className="flex items-center gap-3 mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            {t("sectionTitle")}
          </h2>
          <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 text-white/60 text-sm font-medium">
            {t("count")}
          </span>
        </div>

        {/* Projects Grid - Style like lucasassis.com.br */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {items.map((project, index) => {
            const cardContent = (
              <>
                {/* Image Area */}
                <div className={`aspect-[16/10] transition-colors relative overflow-hidden ${
                  projectImages[project.slug]
                    ? "bg-[#1a1a1a] group-hover:bg-[#1c1c1c]"
                    : "bg-[#0a0a0a] group-hover:bg-[#111]"
                }`}>
                  {projectImages[project.slug] ? (
                    <>
                      <Image
                        src={projectImages[project.slug]}
                        alt={project.title}
                        fill
                        className="object-contain transition-transform duration-500 group-hover:scale-105"
                      />
                    </>
                  ) : (
                    <>
                      {/* Placeholder gradient/pattern */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-white/[0.06] text-8xl lg:text-9xl font-bold">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </div>
                    </>
                  )}
                </div>

                {/* Project Info */}
                <div className="p-6 flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">
                      {project.title}
                    </h3>
                    <p className="text-sm text-white/50">{project.tags}</p>
                    {project.description && (
                      <p className="text-xs text-white/30 mt-1">{project.description}</p>
                    )}
                  </div>
                  <span className="text-sm text-white/30 font-mono">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
              </>
            );

            const cardClassName =
              "group relative rounded-3xl bg-[#141414] border border-white/10 overflow-hidden cursor-pointer hover:border-white/20 transition-all duration-300";

            if (project.slug) {
              return (
                <Link
                  key={index}
                  href={`/projects/${project.slug}`}
                  className={cardClassName}
                >
                  {cardContent}
                </Link>
              );
            }

            return (
              <div key={index} className={cardClassName}>
                {cardContent}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
