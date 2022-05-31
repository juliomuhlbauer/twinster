import { User } from "@/components/user";
import { Logo } from "@/layout/logo";
import { Box, Button, Container, HStack, Link, Stack } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import NextLink from "next/link";

export const Header = () => {
  const { data: session } = useSession();

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

        {session?.user ? (
          <HStack spacing={4}>
            <NextLink href="/" passHref>
              <Button colorScheme="primary">Open app</Button>
            </NextLink>
            <Box display={{ base: "none", md: "block" }}>
              <User user={session.user} />
            </Box>
          </HStack>
        ) : (
          <NextLink href="/sign-in" passHref>
            <Button as={Link} colorScheme="primary">
              Sign in
            </Button>
          </NextLink>
        )}
      </HStack>
    </Container>
  );
};
