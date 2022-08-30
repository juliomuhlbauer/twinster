import { TweetProps } from "@/types/twitter";
import { TweetV2, TweetV2LookupResult, TwitterApi } from "twitter-api-v2";
import { formatText } from "./formatting";
import { tweetParams } from "./params";

const getAuthorTweets = (
  tweet: TweetV2LookupResult,
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

const getMediaTweets = (
  tweets: TweetV2LookupResult,
  tweet: TweetV2
): TweetProps["media"] => {
  return (
    tweet.attachments?.media_keys?.map((key: any) =>
      tweets.includes?.media?.find((media: any) => media.media_key === key)
    ) || []
  );
};

const tweetsFormatter = (tweets: TweetV2LookupResult): TweetProps[] => {
  const formatedTweests = tweets.data.map((tweet) => {
    const author = getAuthorTweets(tweets, tweet.author_id);

    const media = getMediaTweets(tweets, tweet);

    return {
      id: tweet.id,
      text: formatText(tweet.text),
      author,
      media,
      createdAt: tweet.created_at || "",
      metrics: tweet.public_metrics || {
        like_count: 0,
        reply_count: 0,
        retweet_count: 0,
        quote_count: 0,
      },
    };
  });

  return formatedTweests;
};

export const getTweets = async (ids: string[]): Promise<TweetProps[]> => {
  const twitterClient = new TwitterApi(process.env.TWITTER_BEARER_TOKEN || "");

  const tweet = await twitterClient.v2.tweets(ids, tweetParams);

  if (tweet.errors) {
    throw new Error("error fetching tweets");
  }

  return tweetsFormatter(tweet);
};
