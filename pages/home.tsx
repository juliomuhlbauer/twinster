import { Layout } from "@/marketing/layout";
import { NextPageWithLayout } from "@/types/app";
import {
  Box,
  Button,
  chakra,
  Container,
  Heading,
  Link,
  Stack,
} from "@chakra-ui/react";
import { signIn } from "next-auth/react";
import { NextSeo } from "next-seo";
import Image from "next/image";
import InstagramDemo from "public/home/instagram-demo.png";

const Home: NextPageWithLayout = () => {
  return (
    <>
      <NextSeo title="Share your tweets anywhere" />
      <Container maxW="container.lg">
        <Box
          pos="absolute"
          top="-350px"
          right="25px"
          boxSize="3xl"
          bgGradient="radial(primary.500, transparent)"
          filter="blur(6em)"
          zIndex={-1}
        />

        <Stack align="center">
          <Stack
            w="100%"
            align={{ base: "center", lg: "start" }}
            spacing={8}
            py={{ base: 4, md: 12 }}
            direction={{ base: "column", lg: "row" }}
          >
            <Stack
              pt={{ lg: 24 }}
              spacing={6}
              align={{ base: "center", lg: "start" }}
            >
              <Heading
                size="4xl"
                fontSize={{ base: "6xl", sm: "8xl" }}
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

              {/* <NextLink href="/" passHref> */}
              <Button
                // as={Link}
                onClick={() => {
                  signIn("twitter");
                }}
                bgGradient="linear(to-r,  primary.100, primary.700)"
                colorScheme="primary"
                px={{ base: 24, sm: 36, lg: 48 }}
                fontWeight="extrabold"
                fontSize="2xl"
                size="lg"
              >
                Try it
              </Button>
              {/* </NextLink> */}
            </Stack>

            <Box
              pos="relative"
              w={{ base: "xs", md: "sm" }}
              h="2xl"
              transform={{ base: "", lg: "rotate(5deg)" }}
            >
              <Image
                src={InstagramDemo}
                layout="fill"
                objectFit="contain"
                alt="Illustration"
                priority
              />
            </Box>
          </Stack>
        </Stack>
      </Container>
    </>
  );
};

Home.getLayout = (page) => <Layout>{page}</Layout>;

export default Home;
