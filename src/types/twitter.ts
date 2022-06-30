import { MediaObjectV2, TweetPublicMetricsV2 } from "twitter-api-v2";

export type Theme = "light" | "darkBlue" | "dark";

export type Format = "twitter" | "instagram" | "1x1";

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
  // quote
  // reply
};
