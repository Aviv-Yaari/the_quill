import Post from "@/types/Post";
import PostComment from "@/types/PostComment";
import { ActionReducerMapBuilder, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { PostState } from "./posts.slice";

export const togglePostLike = createAsyncThunk('posts/togglePostLikeStatus', async (post: Post, thunkAPI) => {
  const res = await axios.patch(`/api/post/${post.id}/${post.isLikedByUser ? 'unlike' : 'like'}`);
  return res.data as Post;
});

export const togglePostLikeReducers = (builder: ActionReducerMapBuilder<PostState>) => {
  builder.addCase(togglePostLike.fulfilled, (state, action) => {
    const updatedPost = action.payload;
    state.data = state.data?.map(post => post.id === updatedPost.id ? updatedPost : post) || null;
  });
};

interface AddCommentData {
  body: string;
  postId: string;
}
export const addCommentToPost = createAsyncThunk('posts/addCommentToPostStatus', async (data: AddCommentData, thunkApi) => {
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