import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '..';
import Post from '@/types/Post';
import { togglePostLikeReducers } from './posts.thunks';

export interface PostState {
  data: Post[] | null;
}

const initialState: PostState = {
  data: null
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    updatePosts: (state, action: PayloadAction<Post[]>) => {
      state.data = action.payload;
    }
  },
  extraReducers: (builder) => {
    togglePostLikeReducers(builder);
  }
});

export const { updatePosts } = postsSlice.actions;

export const selectPostsData = (state: RootState) => state.posts.data;

export default postsSlice.reducer;