import Wizard from "@/components/wizard";
import { Layout } from "@/layout";
import { getTweet } from "@/lib/twitter";
import { NextLayoutComponentType } from "@/types/app";
import { TweetProps } from "@/types/twitter";
import { Container } from "@chakra-ui/react";
import { GetStaticProps } from "next";
import { useSession } from "next-auth/react";

interface App {
  dailyTweet: TweetProps;
}

const App: NextLayoutComponentType<App> = ({ dailyTweet }) => {
  return (
    <Container maxW="container.sm" pt={12} pb={6}>
      <Wizard dailyTweet={dailyTweet} />
    </Container>
  );
};

App.getLayout = function getLayout(page) {
  return <Layout isAppHome>{page}</Layout>;
};

export default App;

export const getStaticProps: GetStaticProps = async (context) => {
  const ids = [
    "1515842003786948610",
    "1002104154737684480",
    "1342869937841266688",
    "1334334544598740994",
  ];

  const dayOfTheMonth = new Date().getDate();

  const id = ids[Math.floor((dayOfTheMonth / 100) * ids.length)];

  const dailyTweet = await getTweet(id);

  return {
    props: {
      dailyTweet,
    },
    revalidate: 60 * 60 * 24,
  };
};
