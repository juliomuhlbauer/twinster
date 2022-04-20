import { Tweet } from "@/components/tweet";
import { AspectRatio, Button, Center, Stack } from "@chakra-ui/react";
import Head from "next/head";
import NextLink from "next/link";

const errorTweet = {
  id: "error",
  author: {
    name: "Twinster",
    username: "twinster_app",
    avatarUrl: "/twinster_social.svg",
    verified: true,
  },
  text: "Nothing to see here. Try another link.",
  media: [],
};

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
            <Tweet theme="darkBlue" tweet={errorTweet} />
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
