import { Layout } from "@/layout";
import { NextPageWithLayout } from "@/types/next";
import { findTweetId } from "@/utils/find-tweet-id";
import { Box, Button, Container, Img, Stack } from "@chakra-ui/react";
import { useRouter } from "next/router";

const Create: NextPageWithLayout = () => {
  const router = useRouter();

  const { tweet } = router.query as { tweet: string };

  const tweetId = tweet ? findTweetId(tweet) : null;

  return (
    <Container py={{ lg: 12 }}>
      <Stack>
        <Box p={2} borderWidth="1px" borderRadius="lg">
          <Img
            id={`tweet-${tweetId}`}
            w={{ base: 1080 / 3.5, sm: 1080 / 2.5, md: 1080 / 2 }}
            h={{ base: 1350 / 3.5, sm: 1350 / 2.5, md: 1350 / 2 }}
            objectFit="contain"
            src={`/api/tweet/${tweetId}`}
          />
        </Box>
        <Button
          onClick={() => {
            router.push(`/tweet?id=${tweetId}`);
          }}
        >
          Tweet
        </Button>
        <Button
          onClick={() => {
            router.push(`/thread?id=${tweetId}`);
          }}
        >
          Thread
        </Button>
      </Stack>
    </Container>
  );
};

Create.getLayout = function getLayout(page) {
  return <Layout isAppHome>{page}</Layout>;
};

export default Create;
