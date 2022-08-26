import { Tweet } from "@/components/tweet";
import { TweetSettings } from "@/components/tweet/settings";
import { Layout } from "@/layout";
import { getTweet } from "@/lib/twitter";
import { NextPageWithLayout } from "@/types/next";
import { TweetTheme, TweetProps } from "@/types/twitter";
import { findTweetId } from "@/utils/find-tweet-id";
import { missingIDTweet } from "@/utils/tweets";
import { Box, Center, Heading, Img, Stack } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import { useState } from "react";

interface Editor {
  tweet: TweetProps;
}

const TweetEditor: NextPageWithLayout<Editor> = ({ tweet }) => {
  const [theme, setTheme] = useState<TweetTheme>("darkBlue");

  const router = useRouter();

  const { id } = router.query;

  return (
    <>
      <NextSeo title="Tweet" />

      <Center py={4}>
        <Stack spacing={4}>
          <Box p={2} borderWidth="1px" borderRadius="lg">
            <Img
              id={`tweet-${id}`}
              maxW="container.sm"
              src={`/api/tweet/${id}?theme=${theme}`}
            />
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
