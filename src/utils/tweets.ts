import { TweetProps } from "@/types/twitter";

const twinsterAuthor = {
  id: "twinster",
  name: "twinster",
  username: "twinster_app",
  avatarUrl:
    "https://pbs.twimg.com/profile_images/1525091708060459008/Y9WpzAku_400x400.jpg",
  verified: true,
};

export const missingIDTweet: TweetProps = {
  id: "error",
  author: twinsterAuthor,
  text: "no tweet found. try another link.",
  media: [],
  createdAt: new Date().toISOString(),
  metrics: {
    like_count: 0,
    quote_count: 0,
    reply_count: 0,
    retweet_count: 0,
  },
};

export const errorTweet: TweetProps = {
  id: "error",
  author: twinsterAuthor,
  text: "nothing to see here. try another link.",
  media: [],
  createdAt: new Date().toISOString(),
  metrics: {
    like_count: 0,
    quote_count: 0,
    reply_count: 0,
    retweet_count: 0,
  },
};

export const welcomeTweet: TweetProps = {
  id: "welcome",
  author: twinsterAuthor,
  text: "welcome to twinster!\n\ntry pasting a link to a tweet in the box above.",
  media: [],
  createdAt: new Date().toISOString(),
  metrics: {
    like_count: 0,
    quote_count: 0,
    reply_count: 0,
    retweet_count: 0,
  },
};

export const thread7Days: TweetProps = {
  id: "thread-7-days",
  author: twinsterAuthor,
  text: "oh no!\n\nthis is a thread of tweets from the past 7 days.\n\ntry getting a more recent thread.",
  media: [],
  createdAt: new Date().toISOString(),
  metrics: {
    like_count: 0,
    quote_count: 0,
    reply_count: 0,
    retweet_count: 0,
  },
};
