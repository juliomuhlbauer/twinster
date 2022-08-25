import { MediaObjectV2, TweetPublicMetricsV2 } from "twitter-api-v2";

export type TweetTheme = "light" | "darkBlue" | "dark";

export type TweetFormat = "twitter" | "instagram" | "1x1";

export type TweetProps = {
  id: string;
  author: {
    id: string;
    name: string;
    username: string;
    avatarUrl: string;
    verified: boolean;
  };
  text: string;
  media: (MediaObjectV2 | undefined)[];
  createdAt: string;
  metrics: TweetPublicMetricsV2;
  quoteTweet?: TweetProps;
};
