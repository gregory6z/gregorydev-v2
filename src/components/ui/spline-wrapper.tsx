'use client'

import dynamic from "next/dynamic";

const SplineScene = dynamic(() => import("@/components/ui/spline").then(mod => ({ default: mod.SplineScene })), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-white/20 border-t-white/60 rounded-full animate-spin" />
    </div>
  ),
});

interface SplineWrapperProps {
  scene: string;
  className?: string;
}

export function SplineWrapper({ scene, className }: SplineWrapperProps) {
  return <SplineScene scene={scene} className={className} />;
}
