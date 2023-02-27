import clientPromise from "@/utils/mongodb";
import { ObjectId } from "mongodb";
import userMock from '@/mocks/user.mock.json';

/**
 * Creates a comment in the database
 */
async function createCommentInDB(postId: string, body: string) {
  const client = await clientPromise;
  const db = client.db("main");

  const author = new ObjectId(userMock.id); // TODO: Use the user from jwt
  let result = await db.collection("comments").insertOne({ author, post: new ObjectId(postId), body });
  if (!result.acknowledged) {
    throw 'Couldnt add comment';
  }
  //   result = await db.collection("posts") // TODO: Modify the matching post to add the comment id there
  return result.insertedId;
}

export { createCommentInDB };