import { useRef, useState, useEffect } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

type TruncatedTextProps = {
  text: string;
  className?: string;
};

export function TruncatedText({ text, className }: TruncatedTextProps) {
  const textRef = useRef<HTMLSpanElement>(null);
  const [isTruncated, setIsTruncated] = useState(false);

  useEffect(() => {
    const el = textRef.current;
    if (el) {
      setIsTruncated(el.scrollHeight > el.clientHeight);
    }
  }, [text]);

  const textElement = (
    <span
      ref={textRef}
      className={cn(
        "line-clamp-3 whitespace-normal text-sm text-foreground",
        isTruncated && "cursor-default",
        className,
      )}
    >
      {text}
    </span>
  );

  if (isTruncated) {
    return (
      <Tooltip>
        <TooltipTrigger render={textElement} />
        <TooltipContent className="max-w-md whitespace-normal">
          {text}
        </TooltipContent>
      </Tooltip>
    );
  }

  return textElement;
}
