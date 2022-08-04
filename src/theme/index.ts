import { Theme } from "@/types/twitter";
import { extendTheme, ThemeTypings } from "@chakra-ui/react";
import { theme as base, ThemeConfig } from "@chakra-ui/theme";
import components from "./components";
import { globalStyles } from "./styles/global-styles";

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const fonts = {
  heading: `Inter, ${base.fonts.heading}`,
  body: `Inter, ${base.fonts.body}`,
};

const twitterColors = {
  blue: "#4D9EEA",
};

type TweetTheme = {
  bg: ThemeTypings["colors"];
  accent: ThemeTypings["colors"];
  secondary: ThemeTypings["colors"];
};

export const themeColors: Record<Theme, TweetTheme> = {
  light: {
    bg: "white",
    accent: "#101419",
    secondary: "#576370",
  },
  darkBlue: {
    bg: "#1c2732",
    accent: "#D9D9D9",
    secondary: "#70757C",
  },
  dark: {
    bg: "#070807",
    accent: "#D9D9D9",
    secondary: "#70757C",
  },
};

const primary = base.colors.twitter;

const colors = {
  primary,
};

export const theme = extendTheme({
  config,
  fonts,
  semanticTokens: {
    colors: {
      accent: primary[300],
      bg: themeColors.darkBlue.bg,
      text: "gray.200",
    },
  },
  styles: globalStyles,
  colors,
  components,
});
