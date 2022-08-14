import { Tweet } from "@/components/tweet";
import { getTweet, getTweets } from "@/lib/twitter";
import { TweetProps } from "@/types/twitter";
import { Container, Heading, Stack } from "@chakra-ui/react";
import { GetStaticProps, NextPage } from "next";

interface GaleryProps {
  galleryTweets: {
    tweet: TweetProps;
    title: string;
  }[];
}

const Gallery: NextPage<GaleryProps> = ({ galleryTweets }) => {
  console.log(galleryTweets);

  return (
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

              <Tweet aspect="4:5" theme="light" tweet={tweet} />
            </Stack>
          );
        })}
      </Stack>
    </Container>
  );
};

export default Gallery;

export const getStaticProps: GetStaticProps = async (context) => {
  const tweets = [
    {
      title: "Only text",
      id: "1554513891056648193",
    },
    {
      title: "With image",
      id: "1554590741846020097",
    },
    {
      title: "With long image",
      id: "1557731900910800897",
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
    })
  );

  return {
    props: {
      galleryTweets: galleryTweets,
    },
  };
};
