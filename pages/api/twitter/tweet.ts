import { getTweet } from "@/lib/twitter/get-tweet";
import type { NextApiRequest, NextApiResponse } from "next";

const twitterAPI = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  const auth = req.headers.auth;

  const isAuthenticated = auth === process.env.API_ROUTE_SECRET;
  const isDev = process.env.NODE_ENV === "development";

  if (!isAuthenticated && !isDev) {
    res.status(401).json({ error: "Unauthorized" });
  }

  if (!id) {
    res.status(400).json({ error: "Missing id" });
    return;
  }

  const tweet = await getTweet(id.toString());

  res.status(200).json(tweet);
};

export default twitterAPI;
