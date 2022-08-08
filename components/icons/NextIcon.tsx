import React from "react";

import IconProps from "./IconProps";

export default function NextIcon(props: IconProps) {
  return (
    <svg width="13" height="18" xmlns="http://www.w3.org/2000/svg">
      <path
        d="m2 1 8 8-8 8"
        stroke={props.color}
        strokeWidth="3"
        fill="none"
        fillRule="evenodd"
      />
    </svg>
  );
}

NextIcon.defaultProps = { color: "#1D2026" };
