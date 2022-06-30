import { Logo } from "@/layout/logo";
import { Container, HStack, Link } from "@chakra-ui/react";
import NextLink from "next/link";

export const Header = () => {
  return (
    <Container maxW="container.lg">
      <HStack justify="space-between" w="100%" p={4}>
        <HStack spacing={{ base: 6, md: 16 }}>
          <Logo link="/" />
          <HStack
            display={{ base: "none", md: "flex" }}
            spacing={{ base: 6, md: 16 }}
          >
            <NextLink href="/pricing" passHref>
              <Link variant="button" fontSize="lg" fontWeight="semibold">
                Pricing
              </Link>
            </NextLink>

            <NextLink href="#contact" passHref>
              <Link variant="button" fontSize="lg" fontWeight="semibold">
                Contact
              </Link>
            </NextLink>
          </HStack>
        </HStack>
      </HStack>
    </Container>
  );
};
