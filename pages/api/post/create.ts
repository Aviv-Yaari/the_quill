import clientPromise from '@/lib/mongodb';
import Post from '@/types/Post';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse<Post>) {
  console.log("called create post");
    
  const client = await clientPromise;
  const db = client.db("main");
  const post = req.body;

  const result = await db
    .collection("posts")
    .insertOne(post);

  console.log({result});
    
  res.json(post);
}
