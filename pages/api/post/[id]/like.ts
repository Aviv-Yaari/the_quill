import { toggleLike } from "@/services/post.service";
import { readSingleValueFromQuery } from "@/utils/general_utils";
import { NextApiRequest, NextApiResponse } from "next";
import cookie from 'cookie';
import { authService } from "@/services/auth.service";
import { APIErrors } from "@/types/APIErrors";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const postId = readSingleValueFromQuery(req.query, 'id');
  const { token } = cookie.parse(req.headers.cookie || '');
  const loggedInUser = authService.verifyToken(token);
  
  if (!loggedInUser?.id) {
    throw new APIErrors.NotAuthenticatedError();
  }

  if (postId && req.method === 'PATCH') {
    await toggleLike(loggedInUser.id, postId, 'like');
    res.send('Liked post successfully');
  }
  else {
    res.status(405).end();
  }
}