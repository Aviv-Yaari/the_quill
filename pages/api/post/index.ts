import type { NextApiRequest, NextApiResponse } from 'next';
import { createPostInDB, getPostsFromDB } from '@/services/post.service';

export default async function getPosts(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    return createPost(req, res);
  }
  const posts = await getPostsFromDB();
  res.json(posts);
}

async function createPost(req: NextApiRequest, res: NextApiResponse) {
  const id = await createPostInDB(req.body);
  res.json({ id });
}
