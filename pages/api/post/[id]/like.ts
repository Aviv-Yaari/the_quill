import { togglePostLike } from "@/services/post.service";
import { readSingleValueFromQuery } from "@/utils/general_utils";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const id = readSingleValueFromQuery(req.query, 'id');

  if (id && req.method === 'PATCH') {
    await togglePostLike(id, "63f7448001746820e5306dda"); // TODO: Use the user from jwt
    res.json("success");
  }
  else {
    res.status(405).end();
  }
}