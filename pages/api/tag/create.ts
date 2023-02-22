import clientPromise from '@/lib/mongodb';
import { TagIdAndTitle } from '@/types/Tag';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function createTag(req: NextApiRequest, res: NextApiResponse<TagIdAndTitle | {error: string}>) {    
  try {
    const client = await clientPromise;
    const db = client.db("main");
    const tag = req.body;

    const result = await db
      .collection("tags")
      .insertOne(tag);

    console.log({ result });
    res.json(tag);
  } catch (error) {
    console.error({ error });
    res.status(500).json({ error: 'Something unexpected' });
  }
}
