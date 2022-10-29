import { ComponentProps } from "react";

export const CheckIcon = ({
  width = "18",
  height = "18",
  fill = "#4A4A4A",
}: ComponentProps<"svg">) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.75 9L7.5 12.75L15 5.25"
        stroke={fill}
        stroke-linecap="square"
      />
    </svg>
  );
};
