import { Container } from "@chakra-ui/react";
import { FC, ReactNode } from "react";
import { Header } from "./header";

interface Layout {
  children?: ReactNode;
  isAppHome?: boolean;
}

export const Layout: FC<Layout> = ({ children, isAppHome }) => {
  return (
    <Container maxW="container.lg">
      <Header isAppHome={isAppHome} />
      {children}
    </Container>
  );
};
