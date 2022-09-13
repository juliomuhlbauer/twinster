import { Tweet } from "@/components/tweet";
import { getTweet } from "@/lib/twitter/get-tweet";
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
import { GetServerSideProps, GetStaticProps, NextPage } from "next";

interface GaleryProps {
  tweet: TweetProps;
}

const Gallery: NextPage<GaleryProps> = ({ tweet }) => {
  return (
    <>
      <Container py={8}>
        <Stack spacing={8} align="center">
          <Heading>Gallery</Heading>

          <Tweet aspect="4:5" theme="light" tweet={tweet} watermark />
        </Stack>
      </Container>
    </>
  );
};

export default Gallery;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const tweet = await getTweet(query.tweet as string);

  return {
    notFound: process.env.NODE_ENV === "production",
    props: {
      tweet,
    },
  };
};
