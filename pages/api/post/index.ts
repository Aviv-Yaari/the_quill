import type Post from '@/types/Post';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getPostsFromDB } from '@/utils/post_utils';

export default async function getPosts(req: NextApiRequest, res: NextApiResponse<Post[]>) {
  if (req.method === 'POST') {
    return require('./create').default(req, res);
  }
  const posts = await getPostsFromDB();
  res.json(posts);
}
