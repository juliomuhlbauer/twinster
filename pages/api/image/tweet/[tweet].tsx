import { Tweet } from "@/components/tweet";
import { getScreenshot } from "@/lib/get-screenshot";
import { getTweet } from "@/lib/twitter";
import { theme } from "@/theme";
import { Theme } from "@/types/twitter";
import { welcomeTweet } from "@/utils/tweets";
import { AspectRatio, ChakraProvider } from "@chakra-ui/react";
import { NextApiRequest, NextApiResponse } from "next";
import * as ReactDOMServer from "react-dom/server";

let tweet = welcomeTweet;

const twitterAPI = async (req: NextApiRequest, res: NextApiResponse) => {
  const tweetTheme: Theme = (req.query.theme as Theme) || "darkBlue";

  const tweetID = req.query.tweet as string;

  tweet = await getTweet(tweetID);

  const tweetHTML = ReactDOMServer.renderToString(
    <ChakraProvider theme={theme}>
      <AspectRatio
        ratio={1 / 1}
        w={{ base: "xs", sm: "md", md: "lg" }}
        maxW="lg"
      >
        <Tweet tweet={tweet} theme={tweetTheme} aspect="1:1" />
      </AspectRatio>
    </ChakraProvider>
  );

  const isHTMLDebugMode = false;

  if (isHTMLDebugMode) {
    res.setHeader("Content-Type", "text/html");
    return res.end(tweetHTML);
  }

  const file = await getScreenshot(tweetHTML, { width: 1920, height: 1080 });

  res.setHeader("Content-Type", "image/png");
  res.end(file);
};

export default twitterAPI;
