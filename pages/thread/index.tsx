import { NoSSR } from "@/components/no-ssr";
import { Tweet } from "@/components/tweet";
import { TweetSettings } from "@/components/tweet/settings";
import { Layout } from "@/layout";
import { getThread } from "@/lib/twitter";
import { NextPageWithLayout } from "@/types/next";
import { TweetTheme, TweetProps } from "@/types/twitter";
import { findTweetId } from "@/utils/find-tweet-id";
import { missingIDTweet, thread7Days } from "@/utils/tweets";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Center,
  Heading,
  Img,
  Link,
  Stack,
} from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { NextSeo } from "next-seo";
import { useEffect, useMemo, useState } from "react";

interface Editor {
  thread: TweetProps[];
}

const ThreadEditor: NextPageWithLayout<Editor> = ({ thread }) => {
  const [theme, setTheme] = useState<TweetTheme>("darkBlue");

  return (
    <>
      <NextSeo title="Thread" />

      <Center>
        {/* <NoSSR>
            <Alert status="warning">
              <Stack align="center">
                <AlertIcon mr={0} boxSize={6} />
                <AlertTitle>
                  You can download{" "}
                  {isBeta ? 10 - threads.downloaded : 1 - threads.downloaded}{" "}
                  threads this month.
                </AlertTitle>
                <AlertDescription>
                  If you want to increase your download limit, you can fill the
                  form below.
                </AlertDescription>
                <Button
                  as={Link}
                  href="https://forms.gle/LfxJTG3MacTJX4FM9"
                  isExternal
                  colorScheme="primary"
                  aria-label="Beta form"
                  size="sm"
                >
                  Beta forms
                </Button>
              </Stack>
            </Alert>
          </NoSSR> */}
        <Stack spacing={4} align="center" mb={48}>
          {thread.map((tweet, index) => (
            <Box key={tweet.id} p={2} borderWidth="1px" borderRadius="lg">
              <Img
                id={`tweet-${tweet.id}`}
                maxW="container.sm"
                src={"/api/tweet/" + tweet.id}
              />
            </Box>
          ))}
        </Stack>
      </Center>
      <TweetSettings
        theme={theme}
        setTheme={setTheme}
        thread={thread}
        // canDownload={canDownload}
        // onThreadDownload={onThreadDownload}
      />
    </>
  );
};

ThreadEditor.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default ThreadEditor;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const link = context.query.id as string;

  const id = findTweetId(link);

  let thread = [];

  thread[0] = missingIDTweet;

  if (id) {
    try {
      thread = await getThread(id);
    } catch (err) {
      console.error(err);
      thread[0] = thread7Days;
    }
  }

  return {
    props: {
      thread,
    },
  };
};
