import {
  Container,
  Heading,
  HStack,
  Icon,
  IconButton,
  Link,
} from "@chakra-ui/react";
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
        <Link href="https://juliomuhlbauer.com" isExternal>
          <Heading size="sm" textDecor="underline">
            @juliomuhlbauer
          </Heading>
        </Link>
      </HStack>
    </Container>
  );
};
