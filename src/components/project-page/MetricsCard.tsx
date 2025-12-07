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
    <div className="flex flex-wrap gap-4 mt-6">
      {items.map((item, index) => (
        <div
          key={index}
          className="flex-1 min-w-[90px] text-center p-3 rounded-xl bg-white/[0.05] border border-white/10"
        >
          <div className="text-xl font-bold text-white">{item.value}</div>
          <div className="text-xs text-white/50">{item.label}</div>
        </div>
      ))}
    </div>
  );
}
