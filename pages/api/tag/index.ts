import clientPromise from '@/lib/mongodb';
import { TagIdAndTitle, TagLabelAndValue } from '@/types/Tag';
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

  const tags: TagLabelAndValue[] = (result as TagIdAndTitle[]).map(option => ({ value: option._id, label: option.title }));
  res.json(tags);
}
