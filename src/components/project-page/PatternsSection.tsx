"use client"

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"

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
      <TooltipProvider delayDuration={200}>
        <div className="flex flex-wrap gap-2">
          {patterns.map((pattern, index) => (
            <Tooltip key={index}>
              <TooltipTrigger asChild>
                <div>
                  <Badge className="cursor-help hover:border-white/20 transition-all">
                    {pattern.name}
                  </Badge>
                </div>
              </TooltipTrigger>
              <TooltipContent
                side="top"
                className="max-w-xs"
                sideOffset={8}
              >
                <p className="text-white/90 leading-relaxed">{pattern.description}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </TooltipProvider>
    </div>
  );
}
