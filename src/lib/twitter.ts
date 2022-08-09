import { TweetProps } from "@/types/twitter";
import { thread7Days } from "@/utils/tweets";
import {
  TweetSearchRecentV2Paginator,
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

  return {
    id: tweet.data.id,
    text: tweet.data.text,
    author,
    media,
    createdAt: tweet.data.created_at || "",
    metrics: tweet.data.public_metrics || {
      like_count: 0,
      reply_count: 0,
      retweet_count: 0,
      quote_count: 0,
    },
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

export const getThread = async (id: string): Promise<TweetProps[]> => {
  const twitterClient = new TwitterApi(process.env.TWITTER_BEARER_TOKEN || "");

  const firstTweet = await getTweet(id);

  if (
    new Date(firstTweet.createdAt).getTime() <
    new Date().getTime() - 7 * 24 * 60 * 60 * 1000
  ) {
    return [thread7Days];
  }

  const authorHandle = firstTweet.author.username;

  const query = `from:${authorHandle} to:${authorHandle} conversation_id:${id}`;

  const thread = await twitterClient.v2.search(query, tweetParams);

  while (!thread.done) {
    await thread.fetchNext();
  }

  const formattedThread: TweetProps[] = thread.tweets
    .reverse()
    .map((tweet) => ({
      id: tweet.id,
      text: tweet.text,
      author: firstTweet.author,
      media: getMediaofTweets(thread, tweet),
      createdAt: tweet.created_at || "",
      metrics: tweet.public_metrics || {
        like_count: 0,
        reply_count: 0,
        retweet_count: 0,
        quote_count: 0,
      },
    }))
    .slice(0, 9);

  const tweets = [firstTweet, ...formattedThread];

  return tweets;
};
