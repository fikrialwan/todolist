import { ComponentProps } from "react";

export const UpIcon = ({
  width = "24",
  height = "24",
  fill = "#111111",
}: ComponentProps<"svg">) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M6 15L12 9L18 15" stroke={fill} strokeLinecap="square" />
    </svg>
  );
};
