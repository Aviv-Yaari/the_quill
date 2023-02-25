import { toggleLike } from "@/services/post.service";
import { readSingleValueFromQuery } from "@/utils/general_utils";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const id = readSingleValueFromQuery(req.query, 'id');

  if (id && req.method === 'PATCH') {
    const updatedPost = await toggleLike(id, 'like');
    res.json(updatedPost);
  }
  else {
    res.status(405).end();
  }
}