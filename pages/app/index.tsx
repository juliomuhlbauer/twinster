import Wizard from "@/components/wizard";
import { getTweet } from "@/lib/twitter";
import { TweetProps } from "@/types/twitter";
import { Container } from "@chakra-ui/react";
import { GetStaticProps } from "next";
import { FC } from "react";

interface App {
  dailyTweet: TweetProps;
}

const App: FC<App> = ({ dailyTweet }) => {
  return (
    <Container maxW="container.sm">
      <Wizard dailyTweet={dailyTweet} />
    </Container>
  );
};

export default App;

export const getStaticProps: GetStaticProps = async (context) => {
  const ids = [
    "1515842003786948610",
    "1002104154737684480",
    "1342869937841266688",
    "1334334544598740994",
  ];

  const id = ids[Math.floor(Math.random() * ids.length)];

  const dailyTweet = await getTweet(id);

  return {
    props: {
      dailyTweet,
    },
    revalidate: 60 * 60 * 24,
  };
};
