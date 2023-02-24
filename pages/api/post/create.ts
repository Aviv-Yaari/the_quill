import clientPromise from '@/utils/mongodb';
import { ObjectId } from 'mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';
import { calcReadTime } from '@/utils/post_utils';

interface RequestBody {
  title: string;
  subtitle: string;
  body: string;
  tags: string[];
};

const testUsername = "63f7448001746820e5306dda";

export default async function handler(req: NextApiRequest, res: NextApiResponse<RequestBody | { error: string }>) {    // TODO: Add middleware that will deal with errors
  try {
    const client = await clientPromise;
    const db = client.db("main");

    const post = req.body as RequestBody;
    const readTime = calcReadTime(post.body);
    const tags = post.tags.map(tag => new ObjectId(tag));

    const author = new ObjectId(testUsername); // TODO: Use the user from jwt
    console.log({ ...post, tags, author, read_time: readTime });
    await db.collection("posts").insertOne({ ...post, tags, author, read_time: readTime });
    res.json(post);
  } catch (error) {
    console.error({ error });
    res.status(500).json({ error: 'Something unexpected' });
  }
}
