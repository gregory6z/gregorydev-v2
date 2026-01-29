import { Search } from "lucide-react";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

interface DataTableSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

function DataTableSearch({
  value,
  onChange,
  placeholder = "Search...",
  className,
}: DataTableSearchProps) {
  return (
    <div
      data-slot="data-table-search"
      className={cn("relative w-80", className)}
    >
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-9 pl-9 bg-white font-display text-base font-medium leading-5"
      />
    </div>
  );
}

export { DataTableSearch };
