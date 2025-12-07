type Pattern = {
  name: string;
  description: string;
};

type PatternsSectionProps = {
  patterns: Pattern[];
  title: string;
};

export function PatternsSection({ patterns, title }: PatternsSectionProps) {
  if (!patterns || patterns.length === 0) return null;

  return (
    <div className="p-6 rounded-xl bg-white/[0.03] border border-white/10">
      <h4 className="text-xs font-medium text-white/40 uppercase tracking-wider mb-4">
        {title}
      </h4>
      <div className="flex flex-wrap gap-3">
        {patterns.map((pattern, index) => (
          <div
            key={index}
            className="group relative px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-default"
          >
            <span className="text-sm text-white/80">{pattern.name}</span>
            {/* Tooltip on hover */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 rounded-lg bg-[#2a2a2a] border border-white/10 text-xs text-white/70 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10 max-w-xs">
              <div className="whitespace-normal">{pattern.description}</div>
              {/* Arrow */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#2a2a2a]" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
