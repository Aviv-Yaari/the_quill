import Post from "@/types/Post";
import PostComment from "@/types/PostComment";
import { ActionReducerMapBuilder, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { PostState } from "./posts.slice";

export const togglePostLike = createAsyncThunk('posts/togglePostLikeStatus', async (post: Post, thunkAPI) => {
  const likeOrUnlike = post.isLikedByUser ? 'unlike' : 'like';
  await axios.patch(`/api/post/${post.id}/${likeOrUnlike}`);
  return { postId: post.id, likeOrUnlike };
});

export const togglePostLikeReducers = (builder: ActionReducerMapBuilder<PostState>) => {
  builder.addCase(togglePostLike.fulfilled, (state, action) => {
    const { postId, likeOrUnlike } = action.payload;
    const post = state.data?.find(p => p.id === postId);
    if (!post) {
      return;
    }
    if (likeOrUnlike === 'like') {
      post.likes ++;
      post.isLikedByUser = true;
    }
    else {
      post.likes --;
      post.isLikedByUser = false;
    }
  });
};

interface AddCommentData {
  body: string;
  postId: string;
}
export const addCommentToPost = createAsyncThunk('posts/addCommentToPostStatus', async (data: AddCommentData) => {
  const { body, postId } = data;
  const res = await axios.post("/api/comment", { body, post_id: postId });
  return { comment: res.data as PostComment, postId };
});

export const addCommentToPostReducers = (builder: ActionReducerMapBuilder<PostState>) => {
  builder.addCase(addCommentToPost.pending, (state) => {
    state.isAddCommentLoading = true;
  });
  builder.addCase(addCommentToPost.fulfilled, (state, action) => {
    const { comment, postId } = action.payload;
    // add the new created comment to top of comments
    state.data = state.data?.map(post => post.id === postId ? { ...post, comments: [comment, ...post.comments] } : post) || null;
    state.isAddCommentLoading = false;
  });
};

interface GetCommentsData {
  postId: string;
  page: number;
}

export const getPostComments = createAsyncThunk('posts/getPostCommentsStatus', async (data: GetCommentsData) => {
  const { postId, page = 0 } = data;
  const res = await axios.get('/api/comment', { params: { postId, page } });
  const comments = res.data as PostComment[];
  return { comments, postId };
});

export const getPostCommentsReducers = (builder: ActionReducerMapBuilder<PostState>) => {
  builder.addCase(getPostComments.fulfilled, (state, action) => {
    const { postId, comments } = action.payload;
    state.data = state.data?.map(post => post.id === postId ? { ...post, comments: [...post.comments, ...comments] } : post) || null;
  });
};