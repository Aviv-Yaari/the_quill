import { createCommentInDB } from '@/services/comment.service';
import { readSingleValueFromQuery } from '@/utils/general_utils';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function getComments(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    return createComment(req, res);
  }
  res.status(405).end();
}


async function createComment(req: NextApiRequest, res: NextApiResponse) {
  const body = req.body?.body;
  const postId = readSingleValueFromQuery(req.query, 'post_id');
  if (!body || !postId) {
    return res.status(400).end('Missing post ID and post body');
  }
  const commentId = await createCommentInDB(postId, body);
  res.json({ commentId });
}
