import clientPromise from "@/utils/mongodb";
import { ObjectId } from "mongodb";
import userMock from '@/mocks/user.mock.json';
import Post from "@/types/Post";

/**
 * Creates a comment in the database
 */
async function createCommentInDB(postId: string, body: string) {
  const client = await clientPromise;
  const db = client.db("main");
  const author = new ObjectId(userMock.id); // TODO: Use the user from jwt

  // TODO: Check about doing this in a transaction

  // Create a new comment:
  const { insertedId } = await db.collection("comments").insertOne({ author, post: new ObjectId(postId), body });
  if (!insertedId) throw 'Couldnt add comment';

  // Assign the comment to the post:
  const { value } = await db.collection("posts").findOneAndUpdate({ _id: new ObjectId(postId) }, { $addToSet: { comments: insertedId as any } });  // TODO: check about the types error here
  if (value) return insertedId;

  // Assign to post didn't work, rollback (remove the created post):
  const { lastErrorObject } = await db.collection("comments").findOneAndDelete({ _id: insertedId });
  if (!lastErrorObject?.n) throw 'Coudlnt assign comment to post, Couldnt delete the newly created comment';
  
  throw 'Coudlnt assign comment to post';
}

const populateComments = async (commentIds: ObjectId[]) => {
  const client = await clientPromise;
  const db = client.db("main");
  const comments = await db.collection("comments").aggregate([
    { $lookup: { from: "users", localField: "author", foreignField: "_id", as: "author" } },
    { $unwind: { path: "$author" } },
    { $match: { _id: { $in: commentIds } } },
    { $project: { id: { $toString: "$_id" }, _id: 0, author: "$author.username", body: 1 } },
  ]).toArray();
  return comments as Post['comments'];
};

export { createCommentInDB, populateComments };