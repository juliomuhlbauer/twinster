import { TweetProps } from "@/types/twitter";

export const missingIDTweet: TweetProps = {
  id: "error",
  author: {
    name: "Twinster",
    username: "twinster_app",
    avatarUrl: "/twinster_social.svg",
    verified: true,
  },
  text: "No tweet found. Try another link.",
  media: [],
};

export const errorTweet = {
  id: "error",
  author: {
    name: "Twinster",
    username: "twinster_app",
    avatarUrl: "/twinster_social.svg",
    verified: true,
  },
  text: "Nothing to see here. Try another link.",
  media: [],
};
