import { Document, ObjectId, WithId } from "mongodb";

interface CommentModel extends WithId<Document> {
    author: ObjectId;
    post: ObjectId;
    body: string;
}