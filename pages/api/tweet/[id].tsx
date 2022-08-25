/* eslint-disable @next/next/no-page-custom-font */
/* eslint-disable @next/next/no-head-element */
import { Tweet } from "@/components/tweet";
import { getScreenshot } from "@/lib/get-screenshot";
import { getTweet } from "@/lib/twitter";
import { theme } from "@/theme";
import { TweetTheme } from "@/types/twitter";
import { welcomeTweet } from "@/utils/tweets";
import { ChakraProvider } from "@chakra-ui/react";
import { NextApiRequest, NextApiResponse } from "next";
import * as ReactDOMServer from "react-dom/server";

let tweet = welcomeTweet;

const tweetImage = async (req: NextApiRequest, res: NextApiResponse) => {
  const tweetTheme: TweetTheme = (req.query.theme as TweetTheme) || "darkBlue";

  const tweetID = req.query.id as string;

  tweet = await getTweet(tweetID);

  const tweetHTML = ReactDOMServer.renderToString(
    <>
      <head>
        <title>Teste</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <ChakraProvider theme={theme}>
        <Tweet
          tweet={tweet}
          theme={tweetTheme}
          aspect="4:5"
          isStatic
          watermark
        />
      </ChakraProvider>
    </>
  );

  const isHTMLDebugMode = false;

  if (isHTMLDebugMode) {
    res.setHeader("Content-Type", "text/html");
    return res.end(tweetHTML);
  }

  const file = await getScreenshot(tweetHTML, { width: 1080, height: 1350 });

  res.setHeader("Content-Type", "image/png");
  res.end(file);
};

export default tweetImage;
