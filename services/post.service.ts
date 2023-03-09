import clientPromise from "../utils/mongodb";
import { Document, ObjectId } from 'mongodb';
import type Post from '@/types/Post';
import { CreatePostRequestBody, GetPostsFilters, PostFromAggregation } from "@/types/Post";
import { populateComments } from "./comment.service";
import PostModel from "@/types/models/post.model";

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
async function getPostsFromDB(loggedInUserId?: string | null, filters?: GetPostsFilters): Promise<Post[]> {
  const client = await clientPromise;
  const db = client.db("main");

  const aggregations: Document[] = [      
    { $lookup: { from: "users", localField: "author", foreignField: "_id", as: "author" } },
    { $lookup: { from: "users", localField: "likes", foreignField: "_id", as: "likes" } },
    { $lookup: { from: "tags", localField: "tags", foreignField: "_id", as: "tags" } },
    { $unwind: { path: "$author" } },
    { $project: { _id: 0, id: { $toString: '$_id' }, timestamp: { $toDate: '$_id' }, title: 1, subtitle: 1, body: 1,
      tags: "$tags.title", author: "$author.username", read_time: 1, likes: { $size: '$likes' }, isLikedByUser: 1, comments: 1,
      total_comments: { $size: '$comments' } } }
  ];

  if (loggedInUserId) {
    aggregations.splice(2, 0, { $addFields: { isLikedByUser: { $in: [new ObjectId(loggedInUserId), "$likes._id"] } } });
  }

  if (filters?.keywords) {
    aggregations.unshift({ $match: { $text: { $search: filters.keywords } } });
  }

  if (filters?.postId) {
    aggregations.unshift({ $match: { _id: new ObjectId(filters.postId) } });
  }

  if (filters?.username) {
    aggregations.push({ $match: { author: filters.username } }); // the $match filter should be after the author is aggregated
  }

  if (filters?.tags?.length) {
    aggregations.push({ $match: { tags: { $in: filters.tags } } });
  }

  const result = await db
    .collection("posts")
    .aggregate(aggregations)
    .toArray();

  const postsFromAggregation = result as PostFromAggregation[];

  // TODO: Make it also return the comment ids and timestamps

  const posts: Post[] = [];
  for (const postFromAggregation of postsFromAggregation) {
    const comments = await populateComments(postFromAggregation.comments);
    const timestamp = Date.parse(postFromAggregation.timestamp);
    const post: Post = { ...postFromAggregation, comments, timestamp };
    posts.push(post);
  }

  return posts;
}

/** Basic find by id */
async function findPostById(id: string) {
  const client = await clientPromise;
  const db = client.db("main");
  const result = await db.collection('posts').findOne({
    _id: new ObjectId(id)
  });
  return result as PostModel;
}

/**
 * Creates a post in the database
 */
async function createPostInDB({ title, subtitle, body, tags }: CreatePostRequestBody, author: string) {
  const client = await clientPromise;
  const db = client.db("main");
  const readTime = calcReadTime(body);
  const tagIds = tags.map(tag => new ObjectId(tag));
  
  const result = await db.collection("posts").insertOne({ title, subtitle, body, tags: tagIds, author: new ObjectId(author), read_time: readTime, comments: [], likes: [] });
  return result.insertedId.toString();
}

async function toggleLike(userId: string, postId: string, action: 'like' | 'unlike') {
  const client = await clientPromise;
  const db = client.db("main");

  let dbAction;
  if (action === 'like') {
    dbAction = { $addToSet: { likes: new ObjectId(userId) as any } }; // TODO: check about the types error here
  } else {
    dbAction = { $pull: { likes: new ObjectId(userId) as any } }; // TODO: check about the types error here
  }
  const result = await db.collection("posts").findOneAndUpdate(
    { _id: new ObjectId(postId) },
    dbAction,
    { returnDocument: 'after' }
  );

  if (!result.lastErrorObject?.n) {
    throw 'Update did not succeed';
  }
  return result.value;
}

export { calcReadTime, getPostsFromDB, createPostInDB, toggleLike, findPostById };