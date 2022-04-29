import { TweetProps } from "@/types/twitter";
import { TwitterClient } from "twitter-api-client";
import {
  TweetSearchRecentV2Paginator,
  TweetV1,
  TweetV2,
  Tweetv2FieldsParams,
  TweetV2SingleResult,
  TwitterApi,
} from "twitter-api-v2";

const tweetParams: Partial<Tweetv2FieldsParams> = {
  expansions: [
    "author_id",
    "attachments.media_keys",
    "referenced_tweets.id",
    "referenced_tweets.id.author_id",
  ],
  "tweet.fields": [
    "attachments",
    "author_id",
    "public_metrics",
    "created_at",
    "id",
    "in_reply_to_user_id",
    "referenced_tweets",
    "text",
  ],
  "user.fields": [
    "id",
    "name",
    "profile_image_url",
    "protected",
    "url",
    "username",
    "verified",
  ],
  "media.fields": [
    "duration_ms",
    "height",
    "media_key",
    "preview_image_url",
    "type",
    "url",
    "width",
    "public_metrics",
  ],
};

const getAuthor = (
  tweet: TweetV2SingleResult,
  author_id: TweetV2["author_id"]
): TweetProps["author"] => {
  const author = tweet.includes?.users?.find((user) => user.id === author_id);

  return {
    name: author?.name || "",
    username: author?.username || "",
    avatarUrl: author?.profile_image_url || "",
    verified: author?.verified || false,
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

  return {
    id: tweet.data.id,
    text: tweet.data.text,
    author,
    media,
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

const getMediaofTweets = (
  tweets: TweetSearchRecentV2Paginator,
  tweet: TweetV2
): TweetProps["media"] => {
  return (
    tweet.attachments?.media_keys?.map((key: any) =>
      tweets.includes?.media?.find((media: any) => media.media_key === key)
    ) || []
  );
};

export const getThread = async (id: string) => {
  const twitterClient = new TwitterClient({
    apiKey: process.env.TWITTER_API_KEY || "",
    apiSecret: process.env.TWITTER_API_KEY_SECRET || "",
    accessToken: process.env.TWITTER_ACCESS_TOKEN || "",
    accessTokenSecret: process.env.TWITTER_TOKEN_SECRET || "",
  });

  const firstTweet = await getTweet(id);

  const authorHandle = firstTweet.author.username;

  const query = `from:${authorHandle} to:${authorHandle} conversation_id:${id}`;

  const queryParams = new URLSearchParams({
    id,
    expansions:
      "author_id,attachments.media_keys,referenced_tweets.id,referenced_tweets.id.author_id",
    "tweet.fields":
      "attachments,author_id,public_metrics,created_at,id,in_reply_to_user_id,referenced_tweets,text",
    "user.fields": "id,name,profile_image_url,protected,url,username,verified",
    "media.fields":
      "duration_ms,height,media_key,preview_image_url,type,url,width,public_metrics",
  });

  // while (!thread.done) {
  //   await thread.fetchNext();
  // }

  // const formattedThread: TweetProps[] = thread.tweets
  //   .reverse()
  //   .map((tweet) => ({
  //     text: tweet.text,
  //     author: firstTweet.author,
  //     media: getMediaofTweets(thread, tweet),
  //   }));

  // const tweets = [firstTweet, ...formattedThread];

  // const tweets = await response.json();

  // A UTF-8, URL-encoded search query of 500 characters maximum, including operators of query.

  // const data = await twitterClient.tweets.search({
  //   q: "from:julio_werner_",
  // });

  const data = await twitterClient.tweets.search({
    q: "from:julio_werner_",
  });

  // return data;
};
