import type { SVGProps } from "react";

export function ClockIcon(props: SVGProps<SVGSVGElement>) {
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
        d="M9 4.5C8.586 4.5 8.25 4.836 8.25 5.25V9C8.25 9.1989 8.32902 9.38968 8.46967 9.53033L10.7197 11.7803C10.866 11.9265 11.058 12 11.25 12C11.442 12 11.634 11.9265 11.7803 11.7803C12.0735 11.487 12.0735 11.013 11.7803 10.7197L9.75 8.68934V5.25C9.75 4.836 9.414 4.5 9 4.5Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9 17.25C4.45125 17.25 0.75 13.5488 0.75 9C0.75 4.45125 4.45125 0.75 9 0.75C13.5488 0.75 17.25 4.45125 17.25 9C17.25 13.5488 13.5488 17.25 9 17.25ZM9 2.25C5.2785 2.25 2.25 5.2785 2.25 9C2.25 12.7222 5.2785 15.75 9 15.75C12.7222 15.75 15.75 12.7222 15.75 9C15.75 5.2785 12.7222 2.25 9 2.25Z"
        fill="currentColor"
      />
    </svg>
  );
}
