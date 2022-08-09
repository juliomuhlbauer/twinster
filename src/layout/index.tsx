import { Box, Container } from "@chakra-ui/react";
import { FC, ReactNode, useState } from "react";
import { Header } from "./header";

interface Layout {
  children?: ReactNode;
  isAppHome?: boolean;
}

const backgroundImage =
  "radial-gradient(at 40% 20%, #1DA1F2 0px, transparent 50%), radial-gradient(at 80% 0%, hsla(189,100%,56%,1) 0px, transparent 50%), radial-gradient(at 0% 50%, hsla(355,100%,93%,1) 0px, transparent 50%),\nradial-gradient(at 80% 50%, hsla(340,100%,76%,1) 0px, transparent 50%), radial-gradient(at 0% 100%, hsla(22,100%,77%,1) 0px, transparent 50%), radial-gradient(at 80% 100%, hsla(242,100%,70%,1) 0px, transparent 50%), radial-gradient(at 0% 0%, hsla(343,100%,76%,1) 0px, transparent 50%)";

export const Layout: FC<Layout> = ({ children, isAppHome }) => {
  return (
    <Box minH="100vh">
      <Box pos="relative" overflowX="clip">
        <Box
          pos="absolute"
          top={-40}
          left={0}
          boxSize="4xl"
          bgGradient="radial(primary.500, transparent)"
          filter="blur(6em)"
          zIndex={-1}
          opacity="0.9"
        />
        <Box
          pos="absolute"
          right={0}
          bottom={0}
          boxSize="3xl"
          bgGradient="radial(primary.500, transparent)"
          filter="blur(6em)"
          zIndex={-1}
          opacity="0.5"
        />
      </Box>
      <Header isAppHome={isAppHome} />
      <Container maxW="container.lg" pb={36}>
        {children}
      </Container>
    </Box>
  );
};
