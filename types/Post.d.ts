import { Document, WithId } from "mongodb";

interface Post extends WithId<Document> {
    title: string;
    subtitle: string;
    author: string;
    body: string;
    timestamp: number;
    tags: string[];
    image_url: string;
    read_time: number;
    likes: number;
    comments: Comment[]
}

interface Comment {
    author: string;
    body: string;
    timestamp: number;
}

export default Post;
export { Comment };