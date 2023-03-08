import clientPromise from '@/utils/mongodb';
import TagModel from '@/types/models/tag.model';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function createTag(req: NextApiRequest, res: NextApiResponse<TagModel>) {    
  const client = await clientPromise;
  const db = client.db("main");
  const tag = req.body;

  const result = await db
    .collection("tags")
    .insertOne(tag);

  res.json(tag);
}
