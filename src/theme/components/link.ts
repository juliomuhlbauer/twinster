import { ComponentSingleStyleConfig } from "@chakra-ui/react";

const Link: ComponentSingleStyleConfig = {
  variants: {
    button: (props) => ({
      _hover: {
        bg: `${props.theme.colors.primary[200]}12`,
      },
      _active: {
        bg: `${props.theme.colors.primary[200]}24`,
      },
      rounded: "md",
      p: 2,
    }),
  },
};

export default Link;
