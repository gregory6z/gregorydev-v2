type MetricItem = {
  label: string;
  value: string;
};

type MetricsCardProps = {
  metrics: Record<string, string>;
  labels: {
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
};

const labelKeyMap: Record<string, string> = {
  linesOfCode: "linesOfCode",
  files: "files",
  modules: "modules",
  entities: "entities",
  dtos: "dtos",
  components: "components",
  hooks: "hooks",
  pages: "pages",
};

export function MetricsCard({ metrics, labels }: MetricsCardProps) {
  if (!metrics || Object.keys(metrics).length === 0) return null;

  const items: MetricItem[] = Object.entries(metrics).map(([key, value]) => ({
    label: labels[labelKeyMap[key] as keyof typeof labels] || key,
    value,
  }));

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mt-6">
      {items.map((item, index) => (
        <div
          key={index}
          className="text-center p-4 rounded-xl bg-white/[0.05] border border-white/10 transition-all duration-300 hover:bg-white/[0.08] hover:border-white/20 hover:scale-[1.02]"
        >
          <div className="text-lg sm:text-xl font-bold text-white truncate">{item.value}</div>
          <div className="text-[10px] sm:text-xs text-white/50 truncate">{item.label}</div>
        </div>
      ))}
    </div>
  );
}
