import PostModel from "./models/post.model";

interface Post extends Pick<PostModel, 'title' | 'subtitle' | 'author' | 'body' | 'read_time'> {
    id: string;
    tags: string[];
    comments: { author: string; body: string; }[];
    timestamp: number;
    likes: number;
}

interface PostFromAggregation extends Omit<Post, 'timestamp'> {
    timestamp: string;
}
  
interface GetPostsFilters {
    postId?: string;
    username?: string;
    tags?: string[];
}

interface CreatePostRequestBody extends NextApiRequest, Pick<Post, 'title' | 'subtitle' | 'body' | 'tags'> {
};
  

export { PostFromAggregation, GetPostsFilters, CreatePostRequestBody };
export default Post;