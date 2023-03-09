import { toggleLike } from "@/services/post.service";
import { readSingleValueFromQuery } from "@/utils/general_utils";
import { NextApiRequest, NextApiResponse } from "next";
import { APIErrors } from "@/types/APIErrors";
import requireAuth from "@/middleware/requireAuth";

const likePost = requireAuth(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const postId = readSingleValueFromQuery(req.query, 'id');
    if (!req.user?.id) {
      throw new APIErrors.InternalError();
    }
    if (postId && req.method === 'PATCH') {
      await toggleLike(req.user.id, postId, 'like');
      res.send('Liked post successfully');
    }
    else {
      res.status(405).end();
    }
  }
);

export default likePost;