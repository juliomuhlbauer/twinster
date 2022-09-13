import { Tweet } from "@/components/tweet";
import { toDataURL, TweetSettings } from "@/components/tweet/settings";
import { Layout } from "@/layout";
import { NextPageWithLayout } from "@/types/next";
import { TweetTheme, TweetProps } from "@/types/twitter";
import { findTweetId } from "@/utils/find-tweet-id";
import { missingIDTweet } from "@/assets/tweets";
import {
  AspectRatio,
  Box,
  Center,
  Heading,
  Icon,
  IconButton,
  Img,
  Stack,
} from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import { useState } from "react";
import { getTweet } from "@/lib/twitter/get-tweet";
import { FiShare } from "react-icons/fi";

interface Editor {
  tweet: TweetProps;
}

const TweetEditor: NextPageWithLayout<Editor> = ({ tweet }) => {
  const [theme, setTheme] = useState<TweetTheme>("darkBlue");

  return (
    <>
      <NextSeo title="Tweet" />

      <Center py={4}>
        <Box p={2} borderWidth="1px" borderRadius="lg">
          <Img
            id={`tweet-${tweet.id}`}
            w={{ base: 1080 / 3.5, sm: 1080 / 2.5, md: 1080 / 2 }}
            h={{ base: 1350 / 3.5, sm: 1350 / 2.5, md: 1350 / 2 }}
            objectFit="contain"
            src={`/api/tweet/${tweet.id}?theme=${theme}`}
          />
        </Box>
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
