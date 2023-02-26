import { TagLabelAndValue } from '@/types/Tag';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getTagsFromDB } from '@/services/tag.service';

export default async function getTags(req: NextApiRequest, res: NextApiResponse<TagLabelAndValue[]>) {
  if (req.method === 'POST') {
    return require('./create').default(req, res);
  }
  const tags = await getTagsFromDB();
  res.json(tags);
}
