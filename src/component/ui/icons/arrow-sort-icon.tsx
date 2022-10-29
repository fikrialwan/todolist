import { ComponentProps } from "react";

export const ArrowSortIcon = ({
  width = "24",
  height = "24",
  fill = "#888888",
  ...props
}: ComponentProps<"svg">) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M3 9L7 5M7 5L11 9M7 5V19"
        stroke={fill}
        strokeWidth="1.5"
        strokeLinecap="square"
      />
      <path
        d="M21 15L17 19M17 19L13 15M17 19V5"
        stroke={fill}
        strokeWidth="1.5"
        strokeLinecap="square"
      />
    </svg>
  );
};
