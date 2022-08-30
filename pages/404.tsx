import { Tweet } from "@/components/tweet";
import { errorTweet } from "@/assets/tweets";
import { AspectRatio, Button, Center, Stack } from "@chakra-ui/react";
import Head from "next/head";
import NextLink from "next/link";

const ErrorPage = () => {
  return (
    <>
      <Head>
        <title>404 | Twinster</title>
        <link rel="icon" href="/twinster.svg" />
      </Head>
      <Center minH="100vh">
        <Stack>
          <AspectRatio w="lg">
            <Tweet theme="darkBlue" tweet={errorTweet} aspect="1:1" />
          </AspectRatio>
          <NextLink href="/" passHref>
            <Button>Go home</Button>
          </NextLink>
        </Stack>
      </Center>
    </>
  );
};

export default ErrorPage;
