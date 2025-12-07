import { FlaskConical, Layers, Terminal } from "lucide-react";

type TestStrategy = {
  type: string;
  description: string;
  tools?: string;
  coverage?: string;
};

type TestingSectionProps = {
  testing: TestStrategy[];
  title: string;
  labels: {
    type: string;
    tools: string;
    coverage: string;
  };
};

export function TestingSection({ testing, title, labels }: TestingSectionProps) {
  if (!testing || testing.length === 0) return null;

  return (
    <div className="p-6 rounded-xl bg-gradient-to-br from-emerald-500/5 to-transparent border border-emerald-500/20">
      <div className="flex items-center gap-2 mb-5">
        <FlaskConical className="w-4 h-4 text-emerald-400" />
        <h4 className="text-xs font-medium text-emerald-400/80 uppercase tracking-wider">
          {title}
        </h4>
      </div>
      <div className="space-y-4">
        {testing.map((test, index) => (
          <div
            key={index}
            className="flex gap-3 group transition-all duration-300 hover:translate-x-1"
          >
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0">
              {test.type.toLowerCase().includes("e2e") ? (
                <Layers className="w-4 h-4 text-emerald-400/70" />
              ) : (
                <Terminal className="w-4 h-4 text-emerald-400/70" />
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h5 className="text-sm font-medium text-white/90 group-hover:text-white transition-colors">
                  {test.type}
                </h5>
                {test.coverage && (
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-xs text-emerald-400">
                    {test.coverage}
                  </span>
                )}
              </div>
              <p className="text-xs text-white/50 leading-relaxed group-hover:text-white/60 transition-colors">
                {test.description}
              </p>
              {test.tools && (
                <p className="text-xs text-white/40 mt-1">
                  <span className="text-emerald-400/60">{labels.tools}:</span> {test.tools}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
