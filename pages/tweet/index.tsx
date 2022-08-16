import { Tweet } from "@/components/tweet";
import { TweetSettings } from "@/components/tweet/settings";
import { Layout } from "@/layout";
import { getTweet } from "@/lib/twitter";
import { NextPageWithLayout } from "@/types/next";
import { Theme, TweetProps } from "@/types/twitter";
import { findTweetId } from "@/utils/find-tweet-id";
import { missingIDTweet } from "@/utils/tweets";
import { Box, Center, Heading, Stack } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { NextSeo } from "next-seo";
import { useState } from "react";

interface Editor {
  tweet: TweetProps;
}

const TweetEditor: NextPageWithLayout<Editor> = ({ tweet }) => {
  const [theme, setTheme] = useState<Theme>("darkBlue");

  return (
    <>
      <NextSeo title="Tweet" />

      <Center py={4}>
        <Stack spacing={4}>
          <Box p={2} borderWidth="1px" borderRadius="lg">
            <Box id={`tweet-${tweet.id}`}>
              {
                // TODO: support firefox
              }
              {typeof window !== "undefined" &&
              window.navigator.userAgent.search("Firefox") > 1 ? (
                <Heading>
                  Firefox is not supported yet. Please use Chrome or Safari.
                </Heading>
              ) : (
                <Tweet theme={theme} tweet={tweet} aspect="4:5" watermark />
              )}
            </Box>
          </Box>
        </Stack>
      </Center>
      <TweetSettings theme={theme} setTheme={setTheme} tweet={tweet} />
    </>
  );
};

TweetEditor.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default TweetEditor;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const link = context.query.id as string;

  const id = findTweetId(link);

  let tweet = missingIDTweet;

  if (id) {
    try {
      tweet = await getTweet(id);
    } catch (err) {
      console.error(err);
    }
  }

  return {
    props: {
      tweet,
    },
  };
};
