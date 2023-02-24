import PostModel from "./models/post.model";

interface Post extends Pick<PostModel, 'title' | 'subtitle' | 'author' | 'body' | 'read_time'> {
    id: string;
    tags: string[];
    comments: { author: string; body: string; }[];
    timestamp: number;
    likes: number;
}

export default Post;