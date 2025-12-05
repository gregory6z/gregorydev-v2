import { useTranslations } from "next-intl";

export function ProjectsSection() {
  const t = useTranslations("projects");

  const items = t.raw("items") as Array<{
    title: string;
    tags: string;
    description: string;
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {items.map((project, index) => (
            <div
              key={index}
              className="group relative rounded-3xl bg-[#141414] overflow-hidden cursor-pointer hover:bg-[#1a1a1a] transition-colors duration-300"
            >
              {/* Image Placeholder Area - Taller aspect ratio */}
              <div className="aspect-[3/4] bg-[#1a1a1a] group-hover:bg-[#202020] transition-colors relative overflow-hidden">
                {/* Placeholder gradient/pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white/[0.06] text-8xl lg:text-9xl font-bold">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
              </div>

              {/* Project Info */}
              <div className="p-6 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">
                    {project.title}
                  </h3>
                  <p className="text-sm text-white/50">
                    {project.tags}
                  </p>
                </div>
                <span className="text-sm text-white/30 font-mono">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
