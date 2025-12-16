import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Footer } from "@/components/footer";
import { SubProjectCard } from "@/components/project-page";
import {
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiReactquery,
  SiReacthookform,
  SiReactrouter,
  SiNestjs,
  SiAmazons3,
  SiMysql,
  SiDocker,
  SiEslint,
  SiPrettier,
  SiJira,
  SiGithub,
  SiPhp,
  SiVite,
  SiStripe,
  SiSwagger,
  SiRedis,
  SiNodedotjs,
  SiAwslambda,
  SiJest,
  SiNextdotjs,
  SiSupabase,
  SiVercel,
  SiSanity,
  SiCloudinary,
  SiFastify,
  SiPrisma,
  SiPostgresql,
} from "react-icons/si";
import { TbBrandFramerMotion } from "react-icons/tb";

// Map tech names to icons
const techIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  "React": SiReact,
  "TypeScript": SiTypescript,
  "Tailwind CSS": SiTailwindcss,
  "Vite": SiVite,
  "React Query (TanStack Query)": SiReactquery,
  "TanStack React Query": SiReactquery,
  "TanStack Table": SiReactquery,
  "React Hook Form": SiReacthookform,
  "React Router DOM": SiReactrouter,
  "React Router": SiReactrouter,
  "Sonner": TbBrandFramerMotion,
  "Shadcn UI": TbBrandFramerMotion,
  "shadcn/ui": TbBrandFramerMotion,
  "Radix UI": TbBrandFramerMotion,
  "Lucide Icons": TbBrandFramerMotion,
  "Lucide React": TbBrandFramerMotion,
  "ESLint": SiEslint,
  "Prettier": SiPrettier,
  "NestJS": SiNestjs,
  "TypeORM": SiNestjs,
  "MySQL": SiMysql,
  "Docker": SiDocker,
  "Colima": SiDocker,
  "AWS S3": SiAmazons3,
  "Stripe": SiStripe,
  "Swagger": SiSwagger,
  "Jira": SiJira,
  "GitHub": SiGithub,
  "PHP": SiPhp,
  "API REST": SiPhp,
  "JWT/Passport": SiNestjs,
  "Zod": SiTypescript,
  "bcrypt": SiNestjs,
  "Brevo": TbBrandFramerMotion,
  "Winston": TbBrandFramerMotion,
  "react-i18next": SiReact,
  "react-dropzone": SiReact,
  "nuqs": SiTypescript,
  "Recharts": SiReact,
  "API REST PHP (équipe House of Coding)": SiPhp,
  "API REST PHP (equipe House of Coding)": SiPhp,
  "API REST PHP (team House of Coding)": SiPhp,
  "Ferramenta RAG": TbBrandFramerMotion,
  "Herramienta RAG": TbBrandFramerMotion,
  "RAG Tool": TbBrandFramerMotion,
  "Outil RAG": TbBrandFramerMotion,
  // IoT Router
  "React Native (debugging + relatórios para equipe Airwell)": SiReact,
  "React Native (debugging + reports for Airwell team)": SiReact,
  "React Native (debugging + rapports pour équipe Airwell)": SiReact,
  "React Native (debugging + informes para equipo Airwell)": SiReact,
  "Node.js": SiNodedotjs,
  "Redis": SiRedis,
  "ioredis": SiRedis,
  "Bull": SiRedis,
  "BullMQ": SiRedis,
  "AWS Lambda": SiAwslambda,
  "AWS EventBridge": SiAwslambda,
  "Jest": SiJest,
  "class-validator": SiNestjs,
  "class-transformer": SiNestjs,
  "OAuth 2.0": TbBrandFramerMotion,
  "JWT": SiNestjs,
  "AES-256-GCM": TbBrandFramerMotion,
  "@nestjs/axios": SiNestjs,
  "AJV": SiTypescript,
  "jsonpath-plus": SiTypescript,
  // VA Beauty
  "Next.js 15": SiNextdotjs,
  "React 19": SiReact,
  "Tailwind CSS 4": SiTailwindcss,
  "react-day-picker": SiReact,
  "class-variance-authority": SiTypescript,
  "Supabase (PostgreSQL + Auth + RLS)": SiSupabase,
  "Cal.com": TbBrandFramerMotion,
  "Cloudinary": SiCloudinary,
  "Sanity CMS": SiSanity,
  "Vercel": SiVercel,
  // Ragboost
  "TanStack Router": SiReactrouter,
  "TanStack Query": SiReactquery,
  "Fastify": SiFastify,
  "Prisma": SiPrisma,
  "PostgreSQL": SiPostgresql,
};

// Valid project slugs
const validSlugs = ["la-bonne-reponse", "les-performeurs", "airwell-iot-router", "va-beauty", "ragboost"];

// Project external links
const projectLinks: Record<string, string> = {
  "la-bonne-reponse": "https://www.la-bonne-reponse.pro/",
  "les-performeurs": "https://www.lesperformeurs.fr/",
  "airwell-iot-router": "https://airwell.com/",
  "va-beauty": "https://www.vabeauty.fr/",
};

// Project hero images
const projectImages: Record<string, string> = {
  "la-bonne-reponse": "/images/projects/lbr/main-lbr.png",
  "les-performeurs": "/images/projects/les-performeurs/main-les-performeurs.png",
  "airwell-iot-router": "/images/projects/router-iot.svg",
  "ragboost": "/images/projects/ragboost/ragboost-main.png",
  "va-beauty": "/images/projects/va-beauty-hero.png",
};

type SubProject = {
  title: string;
  subtitle: string;
  description: string;
  features: {
    frontend: Array<{ name: string; description: string }>;
    backend: Array<{ name: string; description: string }>;
  };
  metrics?: Record<string, string>;
  patterns?: Array<{ name: string; description: string }>;
  decisions?: Array<{ decision: string; reason: string }>;
  challenges?: Array<{ challenge: string; solution: string }>;
  testing?: Array<{ type: string; description: string; tools?: string; coverage?: string }>;
};

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;

  if (!validSlugs.includes(slug)) {
    notFound();
  }

  const t = await getTranslations("projectPage");

  // Get project-specific translations
  const project = t.raw(`projects.${slug}`) as {
    title: string;
    subtitle: string;
    role: string;
    period: string;
    status: string;
    client: string;
    overview: {
      context: string;
      solution: string;
      myRole: string;
    };
    stack: {
      frontend: string[];
      backend: string[];
    };
    subProjects: SubProject[];
  };

  const externalLink = projectLinks[slug];

  return (
    <>
      <main className="min-h-screen bg-black pt-24 pb-16">
        <div className="mx-auto max-w-[1320px] px-4 sm:px-6">

          {/* Back Button */}
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            {t("backToProjects")}
          </Link>

          {/* Hero Image */}
          <section className="mb-12">
            <div className={`aspect-[16/10] w-full rounded-2xl overflow-hidden relative border border-white/10 ${
              projectImages[slug] ? "bg-[#1a1a1a]" : ""
            }`}>
              {projectImages[slug] ? (
                <>
                  <Image
                    src={projectImages[slug]}
                    alt={project.title}
                    fill
                    className="object-contain"
                    priority
                  />
                </>
              ) : (
                <>
                  {/* Placeholder for main project image */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-white/5 flex items-center justify-center">
                        <span className="text-white/10 text-4xl font-bold">01</span>
                      </div>
                      <span className="text-white/20 text-sm">Main Project Image</span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </section>

          {/* Hero Section */}
          <section className="mb-16">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
              <div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-3">
                  {project.title}
                </h1>
                <p className="text-xl sm:text-2xl text-white/60 mb-6">
                  {project.subtitle}
                </p>

                {/* Meta Info */}
                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
                    <span className="text-white/40">{t("role")}: </span>
                    <span className="text-white/80">{project.role}</span>
                  </div>
                  <div className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
                    <span className="text-white/40">{t("period")}: </span>
                    <span className="text-white/80">{project.period}</span>
                  </div>
                  {project.status.includes("Desenvolvimento") || project.status.includes("Development") || project.status.includes("Développement") || project.status.includes("Desarrollo") ? (
                    <div className="px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20">
                      <span className="text-amber-400">{project.status}</span>
                    </div>
                  ) : (
                    <div className="px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                      <span className="text-emerald-400">{project.status}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* External Link Button */}
              {externalLink && (
                <a
                  href={externalLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-medium hover:bg-white/90 transition-colors shrink-0"
                >
                  {t("visitProject")}
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>

            {/* Client */}
            <div className="mt-6 text-sm text-white/40">
              <span>{t("client")}: </span>
              <span className="text-white/60">{project.client}</span>
            </div>
          </section>

          {/* Overview Section */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-8">{t("overview.title")}</h2>
            <div className="space-y-6">
              {/* Context & Solution */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl bg-[#1a1a1a] border border-white/5 transition-all duration-300 hover:border-white/10 hover:bg-[#1c1c1c]">
                  <h3 className="text-sm font-medium text-white/40 uppercase tracking-wider mb-3">
                    {t("overview.context")}
                  </h3>
                  <p className="text-white/70 leading-relaxed">
                    {project.overview.context}
                  </p>
                </div>
                <div className="p-6 rounded-2xl bg-[#1a1a1a] border border-white/5 transition-all duration-300 hover:border-white/10 hover:bg-[#1c1c1c]">
                  <h3 className="text-sm font-medium text-white/40 uppercase tracking-wider mb-3">
                    {t("overview.solution")}
                  </h3>
                  <p className="text-white/70 leading-relaxed">
                    {project.overview.solution}
                  </p>
                </div>
              </div>

              {/* My Role - Highlighted but compact */}
              <div className="p-6 rounded-2xl bg-gradient-to-r from-white/[0.06] to-white/[0.02] border border-white/10 max-w-2xl">
                <h3 className="text-sm font-medium text-white/50 uppercase tracking-wider mb-3">
                  {t("overview.myRole")}
                </h3>
                <p className="text-white/80 leading-relaxed">
                  {project.overview.myRole}
                </p>
              </div>
            </div>
          </section>

          {/* Tech Stack Section */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-8">{t("stack.title")}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Frontend */}
              <div className="p-6 rounded-2xl bg-[#1a1a1a] border border-white/5 transition-all duration-300 hover:border-white/10">
                <h3 className="text-sm font-medium text-white/40 uppercase tracking-wider mb-4">
                  {t("stack.frontend")}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {project.stack.frontend.map((tech) => {
                    const Icon = techIcons[tech];
                    return (
                      <div
                        key={tech}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10 transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:scale-105"
                      >
                        {Icon && <Icon className="w-4 h-4 text-white/60" />}
                        <span className="text-sm text-white/80">{tech}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
              {/* Backend */}
              <div className="p-6 rounded-2xl bg-[#1a1a1a] border border-white/5 transition-all duration-300 hover:border-white/10">
                <h3 className="text-sm font-medium text-white/40 uppercase tracking-wider mb-4">
                  {t("stack.backend")}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {project.stack.backend.map((tech) => {
                    const Icon = techIcons[tech];
                    return (
                      <div
                        key={tech}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10 transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:scale-105"
                      >
                        {Icon && <Icon className="w-4 h-4 text-white/60" />}
                        <span className="text-sm text-white/80">{tech}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>

          {/* Sub-Projects Section */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-8">{t("subProjects")}</h2>
            <div className="space-y-8">
              {project.subProjects.map((subProject, subIndex) => (
                <SubProjectCard
                  key={subIndex}
                  subProject={subProject}
                  index={subIndex}
                  labels={{
                    features: {
                      title: t("features.title"),
                    },
                    metrics: {
                      title: t("metrics.title"),
                      linesOfCode: t("metrics.linesOfCode"),
                      files: t("metrics.files"),
                      modules: t("metrics.modules"),
                      entities: t("metrics.entities"),
                      dtos: t("metrics.dtos"),
                      components: t("metrics.components"),
                      hooks: t("metrics.hooks"),
                      pages: t("metrics.pages"),
                    },
                    patterns: {
                      title: t("patterns.title"),
                    },
                    decisions: {
                      title: t("decisions.title"),
                      decision: t("decisions.decision"),
                      reason: t("decisions.reason"),
                    },
                    challenges: {
                      title: t("challenges.title"),
                    },
                    testing: {
                      title: t("testing.title"),
                      type: t("testing.type"),
                      tools: t("testing.tools"),
                      coverage: t("testing.coverage"),
                    },
                  }}
                />
              ))}
            </div>
          </section>

          {/* Gallery Section - Hidden for backend-only projects */}
          {slug !== "airwell-iot-router" && (
            <section className="mb-16">
              <h2 className="text-2xl font-bold text-white mb-8">{t("gallery.title")}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Placeholder squares for future images */}
                {[1, 2, 3, 4, 5, 6].map((index) => (
                  <div
                    key={index}
                    className="aspect-video rounded-2xl bg-[#1a1a1a] border border-white/5 flex items-center justify-center overflow-hidden transition-all duration-300 hover:border-white/10 hover:bg-[#1c1c1c] hover:scale-[1.02] cursor-pointer group"
                  >
                    <div className="text-center transition-transform duration-300 group-hover:scale-110">
                      <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-white/5 flex items-center justify-center transition-all duration-300 group-hover:bg-white/10">
                        <span className="text-white/20 text-2xl font-bold group-hover:text-white/40 transition-colors duration-300">{index}</span>
                      </div>
                      <span className="text-white/20 text-sm group-hover:text-white/40 transition-colors duration-300">Image {index}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Back to Projects */}
          <div className="flex justify-center">
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              {t("backToProjects")}
            </Link>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
