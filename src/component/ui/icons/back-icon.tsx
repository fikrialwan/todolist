import { ComponentProps } from "react";

export const BackIcon = ({
  height = "24",
  width = "16",
  fill = "#111111",
  ...props
}: ComponentProps<"svg">) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M3.6665 12L11.6665 20"
        stroke={fill}
        strokeWidth="5"
        strokeLinecap="square"
      />
      <path
        d="M3.6665 12L11.6665 4"
        stroke={fill}
        strokeWidth="5"
        strokeLinecap="square"
      />
    </svg>
  );
};
