import { createCommentInDB, getCommentsForPost, populateComments } from '@/services/comment.service';
import { readSingleValueFromQuery } from '@/utils/general_utils';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function getComments(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    return createComment(req, res);
  }
  const postId = readSingleValueFromQuery(req.query, 'postId');
  const page = readSingleValueFromQuery(req.query, 'page');
  if (!postId) {
    return res.status(404).send('Post not found');
  }
  const comments = await getCommentsForPost(postId, page);
  res.send(comments);
}


async function createComment(req: NextApiRequest, res: NextApiResponse) {
  const body = req.body?.body;
  const postId = req.body?.post_id;
  if (!body || !postId) {
    return res.status(400).end('Missing post ID or post body');
  }
  const commentId = await createCommentInDB(postId, body);
  const [comment] = await populateComments([commentId]);
  res.json(comment);
}
