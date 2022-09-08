/* eslint-disable @next/next/no-sync-scripts */
/* eslint-disable @next/next/no-page-custom-font */
/* eslint-disable @next/next/no-head-element */
import { Tweet } from "@/components/tweet";
import { getScreenshot } from "@/lib/get-screenshot";
import { theme } from "@/theme";
import { TweetTheme } from "@/types/twitter";
import { welcomeTweet } from "@/assets/tweets";
import { ChakraProvider, extendTheme, theme as base } from "@chakra-ui/react";
import { NextApiRequest, NextApiResponse } from "next";
import * as ReactDOMServer from "react-dom/server";
import { getTweet } from "@/lib/twitter/get-tweet";

let tweet = welcomeTweet;

const fonts = {
  heading: `Inter, 'Noto Color Emoji Compat', 'Noto Sans Symbols', ${base.fonts.heading}`,
  body: `Inter, 'Noto Color Emoji Compat', 'Noto Sans Symbols', ${base.fonts.body}`,
};

const apiTheme = extendTheme(theme, {
  fonts,
});

const tweetImage = async (req: NextApiRequest, res: NextApiResponse) => {
  const tweetTheme: TweetTheme = (req.query.theme as TweetTheme) || "darkBlue";
  const encoding = (req.query.enconding as "binary" | "base64") || "binary";

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
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Color+Emoji+Compat&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+Symbols:wght@500&display=swap"
          rel="stylesheet"
        />
      </head>
      <ChakraProvider theme={apiTheme}>
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

  const file = await getScreenshot(tweetHTML, {
    width: 1080,
    height: 1350,
    encoding,
  });

  if (encoding === "binary") {
    res.setHeader("Content-Type", "image/png");
    res.end(file);
  } else if (encoding === "base64") {
    res.status(200).json({
      base64: file,
    });
  }
};

export default tweetImage;
