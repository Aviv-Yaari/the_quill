import { Document, ObjectId, WithId } from "mongodb";
import { TagIdAndTitle } from "./Tag";

interface Post extends WithId<Document> {
    _id: ObjectId | string;
    title: string;
    subtitle: string;
    author: string;
    body: string;
    timestamp: number;
    tags: TagIdAndTitle[];
    image_url: string;
    read_time: number;
    likes: number;
    comments: Comment[];
}

interface PostToCreate extends Pick<Post, 'title' | 'subtitle', 'body'> {
    /** IDs of the tags */
    tags: string[];
}

interface Comment {
    author: string;
    body: string;
    timestamp: number;
}

export default Post;
export { Comment, PostToCreate };