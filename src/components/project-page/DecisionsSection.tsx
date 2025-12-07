type Decision = {
  decision: string;
  reason: string;
};

type DecisionsSectionProps = {
  decisions: Decision[];
  labels: {
    title: string;
    decision: string;
    reason: string;
  };
};

export function DecisionsSection({ decisions, labels }: DecisionsSectionProps) {
  if (!decisions || decisions.length === 0) return null;

  return (
    <div>
      {/* Header */}
      <h4 className="text-xs font-medium text-white/40 uppercase tracking-wider mb-5">
        {labels.title}
      </h4>

      {/* Decisions List */}
      <div className="space-y-5">
        {decisions.map((item, index) => (
          <div key={index} className="border-l border-white/10 pl-4">
            <p className="text-sm font-medium text-white/90 mb-1">
              {item.decision}
            </p>
            <p className="text-xs text-white/50 leading-relaxed">
              {item.reason}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
