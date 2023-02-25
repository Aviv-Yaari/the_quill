import clientPromise from "../utils/mongodb";
import { Document, ObjectId } from 'mongodb';
import type Post from '@/types/Post';
import { CreatePostRequestBody, GetPostsFilters, PostFromAggregation } from "@/types/Post";

/**
 * Returns reading time of a text (in minutes)
 */
function calcReadTime(text: string): number {
  const wordsPerMinute = 225;
  const words = text.trim().split(/\s+/).length;
  const time = Math.ceil(words / wordsPerMinute);
  return time;
}

/**
 * Returns a query of posts from the database, filtered by the given filters.
 */
async function getPostsFromDB(filters?: GetPostsFilters): Promise<Post[]> {
  const client = await clientPromise;
  const db = client.db("main");

  const aggregations: Document[] = [      
    { $lookup: { from: "users", localField: "author", foreignField: "_id", as: "author" } },
    { $lookup: { from: "users", localField: "likes", foreignField: "_id", as: "likes" } },
    { $lookup: { from: "tags", localField: "tags", foreignField: "_id", as: "tags" } },
    { $lookup: { from: "comments", localField: "comments", foreignField: "_id", as: "comments" } },
    { $unwind: { path: "$author" } },
    { $project: { _id: 0, id: { $toString: '$_id' }, timestamp: { $toDate: '$_id' }, title: 1, subtitle: 1, body: 1,
      tags: "$tags.title", author: "$author.username", read_time: 1, comments: 1, likes: { $size: '$likes' } } }
  ];

  if (filters?.postId) {
    aggregations.unshift({ $match: { _id: new ObjectId(filters.postId) } });
  }

  if (filters?.username) {
    aggregations.push({ $match: { author: filters.username } }); // the $match filter should be after the author is aggregated
  }

  if (filters?.tags) {
    aggregations.push({ $match: { tags: { $in: filters.tags } } });
  }

  const result = await db
    .collection("posts")
    .aggregate(aggregations)
    .toArray();


  const postsFromAggregation = result as PostFromAggregation[];
  const posts: Post[] = postsFromAggregation.map(post => ({ ...post, timestamp: Date.parse(post.timestamp) }));
  return posts;
}

/**
 * Creates a post in the database
 */
async function createPostInDB({ title, subtitle, body, tags }: CreatePostRequestBody) {
  const client = await clientPromise;
  const db = client.db("main");
  const readTime = calcReadTime(body);
  const tagIds = tags.map(tag => new ObjectId(tag));
  const author = new ObjectId("63f7448001746820e5306dda"); // TODO: Use the user from jwt
  
  const result = await db.collection("posts").insertOne({ title, subtitle, body, tags: tagIds, author, read_time: readTime, comments: [], likes: [] });
  return result.insertedId.toString();
}

/**
 * Likes/Unlikes a post
 */
// $addToSet: { likes: new ObjectId(userId) as any }
// $pull: { likes: new ObjectId(userId) }
async function togglePostLike(postId: string, userId: string) {
  const client = await clientPromise;
  const db = client.db("main");
  
  // like the post
  let result = await db.collection("posts").findOneAndUpdate(
    { _id: new ObjectId(postId), likes: { $in: [new ObjectId(userId)] } },
    { $pull: { likes: new ObjectId(userId) as any } } // TODO: check about the types error here
  );

  if (!result.value) {
    // like operation didn't succeed - unlike the post
    result = await db.collection("posts").findOneAndUpdate(
      { _id: new ObjectId(postId), likes: { $nin: [new ObjectId(userId)] } },
      { $addToSet: { likes: new ObjectId(userId) as any } } // TODO: check about the types error here
    );
  }
}

export { calcReadTime, getPostsFromDB, createPostInDB, togglePostLike };