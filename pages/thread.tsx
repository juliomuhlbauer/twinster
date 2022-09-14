import { missingIDTweet, thread7Days } from "@/assets/tweets";
import { toDataURL, TweetSettings } from "@/components/tweet/settings";
import { Layout } from "@/layout";
import { getThread } from "@/lib/twitter/get-thread";
import { NextPageWithLayout } from "@/types/next";
import { TweetProps, TweetTheme } from "@/types/twitter";
import { findTweetId } from "@/utils/find-tweet-id";
import { Box, Center, Icon, IconButton, Img, Stack } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { NextSeo } from "next-seo";
import { useState } from "react";

import { FiShare } from "react-icons/fi";

interface Editor {
  thread: TweetProps[];
}

const ThreadEditor: NextPageWithLayout<Editor> = ({ thread }) => {
  const [theme, setTheme] = useState<TweetTheme>("darkBlue");

  return (
    <>
      <NextSeo title="Thread" />

      <Center>
        <Stack spacing={4} align="center" mb={48}>
          {thread.map((tweet, index) => (
            <Box
              key={index}
              position="relative"
              p={2}
              borderWidth="1px"
              borderRadius="lg"
            >
              <Img
                id={`tweet-${tweet.id}`}
                w={{ base: 1080 / 3.5, sm: 1080 / 2.5, md: 1080 / 2 }}
                h={{ base: 1350 / 3.5, sm: 1350 / 2.5, md: 1350 / 2 }}
                src={`/api/tweet/${tweet.id}?theme=${theme}`}
              />
              <IconButton
                variant="ghost"
                position="absolute"
                right={2}
                top={2}
                aria-label="Share"
                icon={<Icon as={FiShare} />}
                onClick={async () => {
                  if (navigator.share) {
                    const dataUrl = await toDataURL(
                      `/api/tweet/${tweet.id}?theme=${theme}`
                    );

                    const blob = await (await fetch(dataUrl)).blob();

                    const image = new File([blob], "canvas.png", {
                      type: blob.type,
                    });

                    await navigator.share({
                      title: tweet.id,
                      text: tweet.text,
                      url: `/api/tweet/${tweet.id}?theme=${theme}`,
                      files: [image],
                    });
                  }
                }}
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
