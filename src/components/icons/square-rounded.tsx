import type { SVGProps } from "react";

export function SquareRoundedIcon(props: SVGProps<SVGSVGElement>) {
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
        d="M14.25 16.5H3.75C2.5095 16.5 1.5 15.4905 1.5 14.25V3.75C1.5 2.5095 2.5095 1.5 3.75 1.5H14.25C15.4905 1.5 16.5 2.5095 16.5 3.75V14.25C16.5 15.4905 15.4905 16.5 14.25 16.5ZM3.75 3C3.33675 3 3 3.33675 3 3.75V14.25C3 14.664 3.33675 15 3.75 15H14.25C14.664 15 15 14.664 15 14.25V3.75C15 3.33675 14.664 3 14.25 3H3.75Z"
        fill="currentColor"
      />
    </svg>
  );
}
