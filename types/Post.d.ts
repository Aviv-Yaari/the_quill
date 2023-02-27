import PostModel from "./models/post.model";

interface Post extends Pick<PostModel, 'title' | 'subtitle' | 'author' | 'body' | 'read_time'> {
    id: string;
    tags: string[];
    comments: { author: string; body: string; }[];
    timestamp: number;
    likes: number;
    isLikedByUser: boolean;
}

interface PostFromAggregation extends Omit<Post, 'timestamp' | 'comments'> {
    comments_combined: {
        authors: string[];
        bodies: string[];
    };
    timestamp: string;
}
  
interface GetPostsFilters {
    postId?: string | null;
    username?: string | null;
    tags?: string[] | null;
    keywords?: string | null;
}

interface CreatePostRequestBody extends NextApiRequest, Pick<Post, 'title' | 'subtitle' | 'body' | 'tags'> {
};
  

export { PostFromAggregation, GetPostsFilters, CreatePostRequestBody };
export default Post;