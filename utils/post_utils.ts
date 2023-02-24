import clientPromise from "./mongodb";
import { Document, ObjectId } from 'mongodb';
import type Post from '@/types/Post';

/**
 * Returns reading time of a text (in minutes)
 */
function calcReadTime(text: string): number {
  const wordsPerMinute = 225;
  const words = text.trim().split(/\s+/).length;
  const time = Math.ceil(words / wordsPerMinute);
  return time;
}

interface PostFromAggregation extends Omit<Post, 'timestamp'> {
  timestamp: string;
}

async function getPostsFromDB(postId?: string): Promise<Post[]> {
  const client = await clientPromise;
  const db = client.db("main");

  const aggregations: Document[] = [      
    { $lookup: { from: "users", localField: "author", foreignField: "_id", as: "author" } },
    { $lookup: { from: "tags", localField: "tags", foreignField: "_id", as: "tags" } },
    { $lookup: { from: "comments", localField: "comments", foreignField: "_id", as: "comments" } },
    { $unwind: { path: "$author" } },
    { $project: { _id: 0, id: { $toString: '$_id' }, timestamp: { $toDate: '$_id' }, title: 1, subtitle: 1, body: 1,
      tags: "$tags.title", author: "$author.username", read_time: 1, comments: 1 } }
  ];

  if (postId) {
    aggregations.unshift({ $match: { _id: new ObjectId(postId) } });
  }

  const result = await db
    .collection("posts")
    .aggregate(aggregations)
    .toArray();


  const postsFromAggregation = result as PostFromAggregation[];
  const posts: Post[] = postsFromAggregation.map(post => ({ ...post, timestamp: Date.parse(post.timestamp) }));
  return posts;
}

export { calcReadTime, getPostsFromDB };