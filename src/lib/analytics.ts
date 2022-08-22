import { event } from "nextjs-google-analytics";

const fetchTweet = (id: string) =>
  event("fetch_tweet", {
    label: id,
    category: "tweet",
  });

const fetchThread = (id: string) =>
  event("fetch_thread", {
    label: id,
    category: "thread",
  });

const downloadTweet = (id: string) =>
  event("download_tweet", {
    label: id,
    category: "tweet",
  });

const downloadThread = (id: string) =>
  event("download_thread", {
    label: id,
    category: "thread",
  });

export const events = {
  fetchTweet,
  fetchThread,
  downloadTweet,
  downloadThread,
};
