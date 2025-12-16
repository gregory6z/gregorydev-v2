'use client'

import dynamic from "next/dynamic";

const TimelineEffect = dynamic(() => import("@/components/ui/effects").then(mod => ({ default: mod.TimelineEffect })), {
  ssr: false,
  loading: () => null,
});

export { TimelineEffect };
