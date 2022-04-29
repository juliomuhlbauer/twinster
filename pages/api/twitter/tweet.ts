import { getTweet } from "@/lib/twitter";
import type { NextApiRequest, NextApiResponse } from "next";

const twitterAPI = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  if (!id) {
    res.status(400).json({ error: "Missing id" });
    return;
  }

  const tweet = await getTweet(id.toString());

  res.status(200).json(tweet);
};

export default twitterAPI;
