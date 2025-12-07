import { MetricsCard } from "./MetricsCard";
import { PatternsSection } from "./PatternsSection";
import { DecisionsSection } from "./DecisionsSection";
import { ChallengesSection } from "./ChallengesSection";

type Feature = {
  name: string;
  description: string;
};

type Pattern = {
  name: string;
  description: string;
};

type Decision = {
  decision: string;
  reason: string;
};

type Challenge = {
  challenge: string;
  solution: string;
};

type SubProject = {
  title: string;
  subtitle: string;
  description: string;
  features: {
    frontend: Feature[];
    backend: Feature[];
  };
  metrics?: Record<string, string>;
  patterns?: Pattern[];
  decisions?: Decision[];
  challenges?: Challenge[];
};

type SubProjectCardProps = {
  subProject: SubProject;
  index: number;
  labels: {
    features: {
      title: string;
    };
    metrics: {
      title: string;
      linesOfCode: string;
      files: string;
      modules: string;
      entities: string;
      dtos: string;
      components: string;
      hooks: string;
      pages: string;
    };
    patterns: {
      title: string;
    };
    decisions: {
      title: string;
      decision: string;
      reason: string;
    };
    challenges: {
      title: string;
    };
  };
};

export function SubProjectCard({ subProject, index, labels }: SubProjectCardProps) {
  const hasFrontend = subProject.features.frontend.length > 0;
  const hasBackend = subProject.features.backend.length > 0;
  const hasMetrics = subProject.metrics && Object.keys(subProject.metrics).length > 0;
  const hasPatterns = subProject.patterns && subProject.patterns.length > 0;
  const hasDecisions = subProject.decisions && subProject.decisions.length > 0;
  const hasChallenges = subProject.challenges && subProject.challenges.length > 0;

  return (
    <div className="rounded-3xl bg-[#1a1a1a] border border-white/5 overflow-hidden transition-all duration-300 hover:border-white/10 hover:shadow-2xl hover:shadow-white/[0.02] hover:-translate-y-1">
      {/* Header Visual Forte */}
      <div className="p-8 bg-gradient-to-r from-white/[0.04] to-transparent border-b border-white/5">
        <div className="flex items-start gap-4 mb-2">
          <span className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-xl text-white/80 font-bold shrink-0">
            {index + 1}
          </span>
          <div>
            <h3 className="text-2xl font-bold text-white">{subProject.title}</h3>
            <p className="text-white/50">{subProject.subtitle}</p>
          </div>
        </div>

        {/* Metrics no Header */}
        {hasMetrics && (
          <MetricsCard metrics={subProject.metrics!} labels={labels.metrics} />
        )}
      </div>

      {/* Conteudo */}
      <div className="p-8 space-y-10">
        {/* Descricao */}
        <p className="text-white/70 leading-relaxed max-w-2xl">{subProject.description}</p>

        {/* Features */}
        {(hasFrontend || hasBackend) && (
          <div>
            <h4 className="text-xs font-medium text-white/40 uppercase tracking-wider mb-5">
              {labels.features.title}
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
              {/* Combine frontend and backend features */}
              {[...subProject.features.frontend, ...subProject.features.backend].map((feature, idx) => (
                <div key={idx} className="flex gap-3 group transition-all duration-300 hover:translate-x-1">
                  <span className="text-white/20 font-mono text-sm shrink-0 transition-colors duration-300 group-hover:text-white/40">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h5 className="text-sm font-medium text-white/90 mb-1 transition-colors duration-300 group-hover:text-white">{feature.name}</h5>
                    <p className="text-xs text-white/50 leading-relaxed transition-colors duration-300 group-hover:text-white/60">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Patterns */}
        {hasPatterns && (
          <PatternsSection patterns={subProject.patterns!} title={labels.patterns.title} />
        )}

        {/* Decisions & Challenges Row */}
        {(hasDecisions || hasChallenges) && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 pt-8 border-t border-white/5">
            {hasDecisions && (
              <DecisionsSection decisions={subProject.decisions!} labels={labels.decisions} />
            )}
            {hasChallenges && (
              <ChallengesSection
                challenges={subProject.challenges!}
                title={labels.challenges.title}
                compact
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
