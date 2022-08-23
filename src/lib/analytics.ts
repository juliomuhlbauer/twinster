import { event } from "nextjs-google-analytics";

type Events = "fetch" | "download";

type Categories = "tweet" | "thread";

export const report = (name: Events, category: Categories, id: string) => {
  event(`${name}_${category}`, {
    label: id,
    category: category,
  });
};
