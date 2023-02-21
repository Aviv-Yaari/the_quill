import clientPromise from '@/lib/mongodb';
import Post, { PostToCreate } from '@/types/Post';
import { ObjectId } from 'mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse<PostToCreate | {error: string}>) {    
  try {
    const client = await clientPromise;
    const db = client.db("main");
    const post = req.body as PostToCreate;

    const result = await db
      .collection("posts")
      .insertOne({ ...post, tags: post.tags.map(tag => new ObjectId(tag)) });

    console.log({ result });
    res.json(post);
  } catch (error) {
    console.error({ error });
    res.status(500).json({ error: 'Something unexpected' });
  }
}
