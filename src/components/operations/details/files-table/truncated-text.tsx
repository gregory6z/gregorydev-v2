import { useRef, useState, useEffect } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type TruncatedTextProps = {
  text: string;
};

export function TruncatedText({ text }: TruncatedTextProps) {
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
      className={`text-sm text-foreground line-clamp-3 whitespace-normal ${isTruncated ? "cursor-default" : ""}`}
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
