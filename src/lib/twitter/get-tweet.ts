import { TweetProps } from "@/types/twitter";
import { TweetV2, TweetV2SingleResult, TwitterApi } from "twitter-api-v2";
import { formatText } from "./formatting";
import { tweetParams } from "./params";

const getAuthor = (
  tweet: TweetV2SingleResult,
  author_id: TweetV2["author_id"]
): TweetProps["author"] => {
  const author = tweet.includes?.users?.find((user) => user.id === author_id);

  const avatarUrl = (author?.profile_image_url || "").replace(
    "normal",
    "400x400"
  );

  return {
    name: author?.name || "",
    username: author?.username || "",
    avatarUrl,
    verified: author?.verified || false,
    id: author_id || "",
  };
};

const getMedia = (tweet: TweetV2SingleResult): TweetProps["media"] => {
  return (
    tweet.data.attachments?.media_keys?.map((key: any) =>
      tweet.includes?.media?.find((media: any) => media.media_key === key)
    ) || []
  );
};

const tweetFormatter = (tweet: TweetV2SingleResult): TweetProps => {
  const author = getAuthor(tweet, tweet.data.author_id);
  const media = getMedia(tweet);

  // const quoteTweetId =
  //   tweet.data.referenced_tweets &&
  //   tweet.includes?.tweets?.find(
  //     (t) =>
  //       t.id ===
  //       tweet.data.referenced_tweets.find((t) => t.type === "quoted")?.id
  //   );

  const text = formatText(tweet.data.text);

  return {
    id: tweet.data.id,
    text,
    author,
    media,
    createdAt: tweet.data.created_at || "",
    // quoteTweet: quoteTweet || {},
    metrics: tweet.data.public_metrics || {
      like_count: 0,
      reply_count: 0,
      retweet_count: 0,
      quote_count: 0,
    },
    // all: tweet,
  };
};

export const getTweet = async (id: string): Promise<TweetProps> => {
  const twitterClient = new TwitterApi(process.env.TWITTER_BEARER_TOKEN || "");

  const tweet = await twitterClient.v2.singleTweet(id, tweetParams);

  if (tweet.errors) {
    throw new Error("error fetching tweet");
  }

  return tweetFormatter(tweet);
};
