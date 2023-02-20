import clientPromise from '@/lib/mongodb';
import Post from '@/types/Post';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function getPosts(req: NextApiRequest, res: NextApiResponse<Post[]>) {
  if (req.method === 'POST') {
    return require('./create').default(req, res);
  }
  const client = await clientPromise;
  const db = client.db("main");
  
  const result = await db
    .collection("posts")
    .find({})
    .sort({ metacritic: -1 })
    .limit(10)
    .toArray();

  const posts = result as Post[];
  res.json(posts);
}
