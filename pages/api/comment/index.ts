import requireAuth from '@/middleware/requireAuth';
import { createCommentInDB, getCommentsForPost, populateComments } from '@/services/comment.service';
import { APIErrors } from '@/types/APIErrors';
import { readSingleValueFromQuery } from '@/utils/general_utils';
import type { NextApiRequest, NextApiResponse } from 'next';

const createComment = requireAuth(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const body = req.body?.body;
    const postId = req.body?.post_id;
    if (!body || !postId) {
      throw new APIErrors.BadRequestError("Missing post ID or post body");
    }
    if (!req.user?.id) {
      throw new APIErrors.InternalError();
    }
    const commentId = await createCommentInDB(req.user.id, postId, body);
    const [comment] = await populateComments([commentId]);
    res.json(comment);
  }
);

export default async function getComments(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    return createComment(req, res);
  }
  const postId = readSingleValueFromQuery(req.query, 'postId');
  const page = parseInt(readSingleValueFromQuery(req.query, 'page') || '0');
  if (!postId) {
    return res.status(404).send('Post not found');
  }
  const comments = await getCommentsForPost(postId, page);
  res.send(comments);
}


