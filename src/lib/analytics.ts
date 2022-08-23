import { event } from "nextjs-google-analytics";

type Events = "fetch" | "download";

type Categories = "tweet" | "thread";

export const report = (category: Categories, name: Events, id: string) => {
  event(`${name}_${category}`, {
    label: id,
    category: category,
  });
};
