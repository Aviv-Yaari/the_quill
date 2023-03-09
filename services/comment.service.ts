import clientPromise from "@/utils/mongodb";
import { ObjectId } from "mongodb";
import Post from "@/types/Post";
import { findPostById } from "./post.service";

/**
 * Creates a comment in the database
 */
async function createCommentInDB(authorId: string, postId: string, body: string) {
  const client = await clientPromise;
  const db = client.db("main");

  // TODO: Check about doing this in a transaction

  // Create a new comment:
  const { insertedId } = await db.collection("comments").insertOne({ author: new ObjectId(authorId), post: new ObjectId(postId), body });
  if (!insertedId) throw 'Couldnt add comment';
  

  // Assign the comment to the post:
  const { value } = await db.collection("posts").findOneAndUpdate({ _id: new ObjectId(postId) }, { $addToSet: { comments: insertedId as any } });  // TODO: check about the types error here
  if (value) return insertedId;

  // Assign to post didn't work, rollback (remove the created post):
  const { lastErrorObject } = await db.collection("comments").findOneAndDelete({ _id: insertedId });
  if (!lastErrorObject?.n) throw 'Coudlnt assign comment to post, Couldnt delete the newly created comment';
  
  throw 'Coudlnt assign comment to post';
}

const populateComments = async (commentIds: ObjectId[], page = 0) => {
  const perPage = 5;
  const client = await clientPromise;
  const db = client.db("main");
  const comments = await db.collection("comments").aggregate([
    { $match: { _id: { $in: commentIds } } },
    { $sort: { _id: -1 } },
    { $skip: perPage * page },
    { $lookup: { from: "users", localField: "author", foreignField: "_id", as: "author" } },
    { $unwind: { path: "$author" } },
    { $project: { id: { $toString: "$_id" }, _id: 0, author: "$author.username", body: 1 } },
  ]).limit(perPage).toArray();
  return comments as Post['comments'];
};

async function getCommentsForPost(postId: string, page = 0) {
  const post = await findPostById(postId);
  const comments = await populateComments(post.comments, page);
  return comments;
}

export { createCommentInDB, populateComments, getCommentsForPost };