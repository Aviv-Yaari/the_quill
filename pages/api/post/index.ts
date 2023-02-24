import clientPromise from '@/utils/mongodb';
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
    .aggregate([
      {
        $lookup:
          {
            from: "users",
            localField: "author",
            foreignField: "_id",
            as: "author",
          },
      },
      {
        $lookup:
          {
            from: "tags",
            localField: "tags",
            foreignField: "_id",
            as: "tags",
          },
      },
      {
        $lookup:
          {
            from: "comments",
            localField: "comments",
            foreignField: "_id",
            as: "comments",
          },
      },
      {
        $unwind:
          {
            path: "$author",
          },
      },
      {
        $project:
          {
            title: 1,
            subtitle: 1,
            body: 1,
            tags: "$tags.title",
            author: "$author.username",
            read_time: 1,
            comments: 1,
          },
      },
    ])
    .toArray();

  const posts = result as Post[];
  res.json(posts);
}
