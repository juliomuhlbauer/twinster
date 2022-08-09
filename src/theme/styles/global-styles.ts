import { SystemStyleObject } from "@chakra-ui/react";
import { Styles } from "@chakra-ui/theme-tools";

const scrollbar: SystemStyleObject = {
  "@media (pointer: fine)": {
    "::-webkit-scrollbar": {
      w: "5px",
      h: "5px ",
    },
    "::-webkit-scrollbar-thumb": {
      rounded: "5px",
      bgColor: "gray.600",
    },
    "::-webkit-scrollbar-thumb:hover": {
      bgColor: "gray.400",
    },
    "::-webkit-scrollbar-corner": {
      bg: "transparent",
    },
  },
};

const nProgress: SystemStyleObject = {
  "#nprogress": {
    pointerEvents: "none",
  },
  "#nprogress .bar": {
    bg: "primary.200",
    position: "fixed",
    zIndex: "2000",
    top: 0,
    left: 0,
    w: "100%",
    h: "1px",
  },
};

export const globalStyles: Styles = {
  global: {
    "*": {
      boxSizing: "border-box",
    },
    html: {
      scrollBehavior: "smooth",
      WebkitTapHighlightColor: "transparent",
    },
    body: {
      color: "text",
      bgColor: "bg",
    },
    _selection: {
      color: "white",
      background: "primary.500",
    },
    ...scrollbar,
    ...nProgress,
  },
};
