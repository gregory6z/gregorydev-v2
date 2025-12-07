type Challenge = {
  challenge: string;
  solution: string;
};

type ChallengesSectionProps = {
  challenges: Challenge[];
  title: string;
  compact?: boolean;
  labels?: {
    challenge?: string;
    solution?: string;
  };
};

export function ChallengesSection({
  challenges,
  title,
  compact = false,
  labels = { challenge: "Desafio", solution: "Solução" }
}: ChallengesSectionProps) {
  if (!challenges || challenges.length === 0) return null;

  if (compact) {
    // Compact version for inside SubProjectCard
    return (
      <div>
        {/* Header */}
        <h4 className="text-xs font-medium text-white/40 uppercase tracking-wider mb-5">
          {title}
        </h4>

        {/* Challenges List */}
        <div className="space-y-5">
          {challenges.map((item, index) => (
            <div key={index} className="border-l border-white/10 pl-4 transition-all duration-300 hover:border-white/30 hover:pl-5">
              <p className="text-sm font-medium text-white/90 mb-1">
                {item.challenge}
              </p>
              <p className="text-xs text-white/50 leading-relaxed">
                {item.solution}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Full version (kept for compatibility)
  return (
    <div className="mb-16">
      <h2 className="text-2xl font-bold text-white mb-8">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {challenges.map((item, index) => (
          <div key={index} className="border-l border-white/10 pl-6">
            <h3 className="text-white font-medium mb-2">{item.challenge}</h3>
            <p className="text-sm text-white/50 leading-relaxed">
              {item.solution}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
