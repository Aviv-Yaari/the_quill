import clientPromise from '@/lib/mongodb';
import Tag, { TagLabelAndValue } from '@/types/Tag';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function getTags(req: NextApiRequest, res: NextApiResponse<TagLabelAndValue[]>) {
  if (req.method === 'POST') {
    return require('./create').default(req, res);
  }
  const client = await clientPromise;
  const db = client.db("main");
  
  const result = await db
    .collection("tags")
    .find({})
    .toArray();

  const tags = (result as Tag[]).map(option => ({ value: option._id, label: option.title }));
  res.json(tags);
}
