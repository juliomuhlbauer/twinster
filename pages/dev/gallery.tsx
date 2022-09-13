import { Tweet } from "@/components/tweet";
import { getTweets } from "@/lib/twitter/get-tweets";
import { TweetProps, TweetTheme } from "@/types/twitter";
import {
  Box,
  Container,
  Flex,
  Grid,
  GridItem,
  Heading,
  Img,
  Stack,
} from "@chakra-ui/react";
import { GetStaticProps, NextPage } from "next";

interface GaleryProps {
  galleryTweets: {
    tweet: TweetProps;
    title: string;
    theme: TweetTheme;
  }[];
}

const Gallery: NextPage<GaleryProps> = ({ galleryTweets }) => {
  return (
    <>
      <Container py={8}>
        <Stack spacing={8} align="center">
          <Heading>Gallery</Heading>
          {galleryTweets.map((galeryTweet) => {
            const tweet = galeryTweet.tweet;

            return (
              <Stack key={tweet.id}>
                <Heading>{galeryTweet.title}</Heading>
                <Heading size="md">{tweet.id}</Heading>
                <pre>{JSON.stringify(tweet.media, null, 2)}</pre>

                <Tweet
                  aspect="4:5"
                  theme={galeryTweet.theme}
                  tweet={tweet}
                  watermark
                />
              </Stack>
            );
          })}
        </Stack>
      </Container>
    </>
  );
};

export default Gallery;

export const getStaticProps: GetStaticProps = async (context) => {
  const tweets = [
    {
      title: "Only text",
      id: "1554513891056648193",
      theme: "light",
    },
    {
      title: "With image",
      id: "1554590741846020097",
      theme: "darkBlue",
    },
    {
      title: "With long image",
      id: "1557731900910800897",
      theme: "dark",
    },
    {
      title: "Retweet with comment",
      id: "1557769529710764033",
    },
  ];

  const galleryTweetsIds = tweets.map((tweet) => {
    return tweet.id;
  });

  const galleryTweets = (await getTweets(galleryTweetsIds)).map(
    (tweet, index) => ({
      tweet,
      title: tweets[index].title,
      theme: tweets[index].theme || "light",
    })
  );

  return {
    notFound: process.env.NODE_ENV === "production",
    props: {
      galleryTweets: galleryTweets,
    },
  };
};
