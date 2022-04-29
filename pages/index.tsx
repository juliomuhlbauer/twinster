import { User } from "@/components/user";
import { Logo } from "@/layout/logo";
import {
  chakra,
  Button,
  Container,
  Heading,
  HStack,
  Img,
  Stack,
  Box,
  IconButton,
  Link,
  Icon,
} from "@chakra-ui/react";
import { signIn, useSession } from "next-auth/react";
import NextLink from "next/link";
import { FaTwitter } from "react-icons/fa";

const HomeHeader = () => {
  const { data: session } = useSession();
  return (
    <Container maxW="container.lg">
      <HStack w="100%" p={4} justify="space-between">
        <Logo link="/" />

        {session ? (
          <HStack spacing={4}>
            <NextLink href="/app" passHref>
              <Button colorScheme="primary">Open app</Button>
            </NextLink>
            <Box display={{ base: "none", md: "block" }}>
              <User user={session.user} />
            </Box>
          </HStack>
        ) : (
          <Button
            onClick={() =>
              signIn("twitter", {
                callbackUrl: "/app",
              })
            }
            colorScheme="primary"
          >
            Sign in with Twitter
          </Button>
        )}
      </HStack>
    </Container>
  );
};

const Home = () => {
  return (
    <>
      <HomeHeader />
      <Container maxW="container.lg">
        <Stack align="center">
          <Stack
            align={{ base: "center", lg: "start" }}
            spacing={8}
            py={14}
            direction={{ base: "column", lg: "row" }}
          >
            <Stack
              pt={{ lg: 36 }}
              spacing={6}
              align={{ base: "center", lg: "start" }}
            >
              <Heading
                size="4xl"
                fontSize={{ base: "5xl", sm: "8xl" }}
                fontWeight="extrabold"
                textAlign={{ base: "center", lg: "left" }}
              >
                Share your <br />
                <chakra.span
                  bgClip="text"
                  bgGradient="linear(to-r,  primary.100, primary.700)"
                >
                  tweets
                </chakra.span>
                <br />
                <chakra.span
                  bgClip="text"
                  bgGradient="linear(to-r,  #FF0080, #7928CA)"
                >
                  anywhere
                </chakra.span>
              </Heading>
              <Button
                bgGradient="linear(to-r,  primary.100, primary.700)"
                colorScheme="primary"
                px={{ base: 24, sm: 36, lg: 48 }}
                fontWeight="extrabold"
                fontSize="2xl"
                size="lg"
                onClick={() => signIn("twitter")}
              >
                Try it
              </Button>
            </Stack>
            <Img
              src="/home/instagram-demo.png"
              w={{ base: "xs", md: "sm" }}
              transform={{ base: "", lg: "rotate(5deg)" }}
            />
          </Stack>
        </Stack>
      </Container>
      <Container maxW="container.lg">
        <HStack
          mt={24}
          py={4}
          pb={8}
          borderTopWidth={1}
          borderColor="gray.600"
          justify="space-between"
        >
          <Heading size="md" fontWeight="medium">
            Twinster © {new Date().getFullYear()}
          </Heading>
          <IconButton
            as={Link}
            href="https://twitter.com/twinster_app"
            icon={<Icon as={FaTwitter} boxSize={6} />}
            aria-label="Twitter"
            isExternal
            rounded="full"
            colorScheme="primary"
            variant="ghost"
          />
        </HStack>
      </Container>
    </>
  );
};

export default Home;
