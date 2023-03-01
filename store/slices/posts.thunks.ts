import Post from "@/types/Post";
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