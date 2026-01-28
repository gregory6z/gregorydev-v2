import { env } from "@/env";

const BADGE_COLORS: Record<string, string> = {
  dev: "bg-green-500/80",
  preprod: "bg-orange-500/80",
  test: "bg-blue-500/80",
};

export const EnvironmentBadge = () => {
  if (env.VITE_ENV === "prod") return null;

  return (
    <span
      className={`rounded-full px-3 py-1 font-mono text-xs font-semibold text-white ${BADGE_COLORS[env.VITE_ENV]}`}
    >
      {env.VITE_ENV.toUpperCase()}
    </span>
  );
};
