import { Tweet } from "@/components/tweet";
import { TweetSettings } from "@/components/tweet/settings";
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
import { FaShare } from "react-icons/fa";

interface Editor {
  tweet: TweetProps;
}

const TweetEditor: NextPageWithLayout<Editor> = ({ tweet }) => {
  const [theme, setTheme] = useState<TweetTheme>("darkBlue");

  return (
    <>
      <NextSeo title="Tweet" />

      <Center py={4} position="relative">
        <Box p={2} borderWidth="1px" borderRadius="lg">
          <Img
            id={`tweet-${tweet.id}`}
            w={{ base: 1080 / 3.5, sm: 1080 / 2.5, md: 1080 / 2 }}
            h={{ base: 1350 / 3.5, sm: 1350 / 2.5, md: 1350 / 2 }}
            objectFit="contain"
            src={`/api/tweet/${tweet.id}?theme=${theme}`}
          />
        </Box>
        <IconButton
          position="absolute"
          right="0px"
          mx="auto"
          aria-label="Share"
          icon={<Icon as={FaShare} />}
          onClick={() => {
            if (navigator.share) {
              navigator.share({
                title: tweet.id,
                text: tweet.text,
                url: `/api/tweet/${tweet.id}?theme=${theme}`,
              });
            }
          }}
        />
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
