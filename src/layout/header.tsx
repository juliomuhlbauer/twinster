import { Beta } from "@/components/beta";
import { Container, HStack, Icon, IconButton } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import NextLink from "next/link";
import { FC } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { Logo } from "./logo";

interface Header {
  isAppHome?: boolean;
}

export const Header: FC<Header> = ({ isAppHome = false }) => {
  return (
    <Container py={4} maxW="container.xl">
      <HStack align="center" justify="space-between">
        <HStack spacing={{ base: 2, md: 6 }}>
          {!isAppHome && (
            <NextLink href="/" passHref>
              <IconButton
                icon={<Icon as={AiOutlineArrowLeft} />}
                aria-label="Return"
                variant="outline"
              />
            </NextLink>
          )}

          <HStack>
            <Logo />
          </HStack>
        </HStack>
        <Beta />
      </HStack>
    </Container>
  );
};
