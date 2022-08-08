import React from "react";

import IconProps from "./IconProps";

export default function PreviousIcon(props: IconProps) {
  return (
    <svg width="12" height="18" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M11 1 3 9l8 8"
        stroke={props.color}
        strokeWidth="3"
        fill="none"
        fillRule="evenodd"
      />
    </svg>
  );
}

PreviousIcon.defaultProps = { color: "#1D2026"};