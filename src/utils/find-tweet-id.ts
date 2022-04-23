export const findTweetId = (link: string) => {
  if (link.includes("https://twitter.com/")) {
    const url = new URL(link);
    const idIndex =
      url.pathname.split("/").findIndex((path) => path === "status") + 1;
    const id = url.pathname.split("/")[idIndex];

    return id;
  } else {
    const id = link;

    return id;
  }
};
