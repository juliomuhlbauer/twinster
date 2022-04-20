import { createIcon } from "@chakra-ui/react";

export const TwinsterIcon = createIcon({
  displayName: "TwinsterIcon",
  viewBox: "0 0 192 192",
  path: (
    <svg
      width={192}
      height={192}
      viewBox="0 0 192 192"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M156 72v18a72.003 72.003 0 01-72 72H6l72-90V57a39 39 0 0176.725-9.825L174 60l-18 12z"
        stroke="url(#paint0_linear_1_2)"
        strokeWidth={12}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M123 60a9 9 0 009-9 9 9 0 00-9-9 9 9 0 00-9 9 9 9 0 009 9z"
        fill="url(#paint1_linear_1_2)"
      />
      <path
        d="M90 102l-30 36"
        stroke="url(#paint2_linear_1_2)"
        strokeWidth={12}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient
          id="paint0_linear_1_2"
          x1={174}
          y1={18}
          x2={6}
          y2={162}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#76E4F7" />
          <stop offset={1} stopColor="#00A3C4" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_1_2"
          x1={114}
          y1={60}
          x2={132}
          y2={42}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#0BC5EA" />
          <stop offset={1} stopColor="#76E4F7" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_1_2"
          x1={55.5}
          y1={142.5}
          x2={94}
          y2={97}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#00A3C4" />
          <stop offset={1} stopColor="#0BC5EA" />
        </linearGradient>
      </defs>
    </svg>
  ),
});
