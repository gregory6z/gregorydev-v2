import type { SVGProps } from "react";

export function SquareOutlineIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M12 6V12H6V6H12ZM13.5 4.5H4.5V13.5H13.5V4.5Z"
        fill="currentColor"
      />
    </svg>
  );
}
