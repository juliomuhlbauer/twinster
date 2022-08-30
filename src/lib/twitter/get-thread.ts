import { thread7Days } from "@/assets/tweets";
import { TweetProps } from "@/types/twitter";
import {
  TweetSearchRecentV2Paginator,
  TweetV2,
  TwitterApi,
} from "twitter-api-v2";
import { formatText } from "./formatting";
import { getTweet } from "./get-tweet";
import { tweetParams } from "./params";

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
      text: formatText(tweet.text),
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
