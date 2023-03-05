import type { NextApiRequest, NextApiResponse } from 'next';
import { createPostInDB, getPostsFromDB } from '@/services/post.service';
import { readMultipleValuesFromQuery } from '@/utils/general_utils';
import checkAuth from '@/middleware/checkAuth';

export default async function getPosts(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    return checkAuth(createPost)(req, res);
  }
  const tags = readMultipleValuesFromQuery(req.query, 'tags');
  const posts = await getPostsFromDB({ tags });
  res.json(posts);
}

async function createPost(req: NextApiRequest, res: NextApiResponse) {
  const id = await createPostInDB(req.body);
  res.json({ id });
}
