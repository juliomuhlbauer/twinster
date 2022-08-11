import { Tweet } from "@/components/tweet";
import { getTweet } from "@/lib/twitter";
import { TweetProps } from "@/types/twitter";
import { Container, Heading, Stack } from "@chakra-ui/react";
import { GetStaticProps } from "next";

const Gallery = ({ tweets }: { tweets: TweetProps[] }) => {
  return (
    <Container py={8}>
      <Stack spacing={8} align="center">
        <Heading>Gallery</Heading>
        {tweets.map((tweet) => (
          <Tweet key={tweet.id} aspect="4:5" theme="light" tweet={tweet} />
        ))}
      </Stack>
    </Container>
  );
};

export default Gallery;

export const getStaticProps: GetStaticProps = async (context) => {
  const tweets = await Promise.all([
    getTweet("1554513891056648193"),
    getTweet("1554590741846020097"),
  ]);

  return {
    props: {
      tweets,
    },
  };
};