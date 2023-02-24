import { Document, ObjectId, WithId } from "mongodb";

interface PostModel extends WithId<Document> {
    _id: ObjectId;
    title: string;
    subtitle: string;
    author: string;
    body: string;
    tags: ObjectId[];
    read_time: number;
    likes: ObjectId[];
    comments: ObjectId[];
}

export default PostModel;