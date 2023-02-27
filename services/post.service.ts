import clientPromise from "../utils/mongodb";
import { Document, ObjectId } from 'mongodb';
import type Post from '@/types/Post';
import { CreatePostRequestBody, GetPostsFilters, PostFromAggregation } from "@/types/Post";
import userMock from '@/mocks/user.mock.json';

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
  const userId = userMock.id;

  const aggregations: Document[] = [      
    { $lookup: { from: "users", localField: "author", foreignField: "_id", as: "author" } },
    { $lookup: { from: "users", localField: "likes", foreignField: "_id", as: "likes" } },
    { $lookup: { from: "tags", localField: "tags", foreignField: "_id", as: "tags" } },
    { $lookup: { from: "comments", localField: "comments", foreignField: "_id", as: "comments" } },
    { $lookup: { from: "users", localField: "comments.author", foreignField: "_id", as: "comment_authors" } },
    { $addFields: { isLikedByUser: { $in: [new ObjectId(userId), "$likes._id"] } } },
    { $unwind: { path: "$author" } },
    { $addFields: { comments_combined: { authors: "$comment_authors.username", bodies: "$comments.body" } } },
    { $project: { _id: 0, id: { $toString: '$_id' }, timestamp: { $toDate: '$_id' }, title: 1, subtitle: 1, body: 1,
      tags: "$tags.title", author: "$author.username", read_time: 1, likes: { $size: '$likes' }, isLikedByUser: 1, comments_combined: 1 } }
  ];

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

  const posts = postsFromAggregation.map(post => ({ ...post, timestamp: Date.parse(post.timestamp), comments: fixPostComments(post.comments_combined), comments_combined: null }));
  return posts;
}

/**
 * private function to format the post comments to the desired structure.
 * @param commentsCombined - an object with "authors" array, and "bodies" array.
 * @returns commentsFix - an array, where every element is a "comment" with "author" and "body" fields.
 */
function fixPostComments(commentsCombined: PostFromAggregation['comments_combined']) {
  const commentsFix: Post['comments'] = [];
  const commentsCount = commentsCombined.authors.length;
  for (let i = 0; i < commentsCount; i++) {
    const comment = { author: commentsCombined.authors[i], body: commentsCombined.bodies[i] };
    commentsFix.push(comment);
  }
  return commentsFix;
}

/**
 * Creates a post in the database
 */
async function createPostInDB({ title, subtitle, body, tags }: CreatePostRequestBody) {
  const client = await clientPromise;
  const db = client.db("main");
  const readTime = calcReadTime(body);
  const tagIds = tags.map(tag => new ObjectId(tag));
  const author = new ObjectId(userMock.id); // TODO: Use the user from jwt
  
  const result = await db.collection("posts").insertOne({ title, subtitle, body, tags: tagIds, author, read_time: readTime, comments: [], likes: [] });
  return result.insertedId.toString();
}

async function toggleLike(postId: string, action: 'like' | 'unlike') {
  const client = await clientPromise;
  const db = client.db("main");
  const userId = userMock.id; // TODO: Use the user from jwt

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

export { calcReadTime, getPostsFromDB, createPostInDB, toggleLike };