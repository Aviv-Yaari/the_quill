import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '..';
import Post from '@/types/Post';
import { addCommentToPostReducers, getPostCommentsReducers, togglePostLikeReducers } from './posts.thunks';

export interface PostState {
  data: Post[] | null;
  addingCommentToPostID: string | null;
}

const initialState: PostState = {
  data: null,
  addingCommentToPostID: null
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    updatePosts: (state, action: PayloadAction<Post[]>) => {
      state.data = action.payload;
    },
    updatePost: (state, action: PayloadAction<Post>) => {
      const updatedPost = action.payload;
      state.data = state.data?.map(post => post.id === updatedPost.id ? updatedPost : post) || null;
    }
  },
  extraReducers: (builder) => {
    addCommentToPostReducers(builder);
    getPostCommentsReducers(builder);
    togglePostLikeReducers(builder);
  }
});

export const { updatePosts, updatePost } = postsSlice.actions;

export const selectPostsData = (state: RootState) => state.posts.data;
export const selectAddingCommentToPostID = (state: RootState) => state.posts.addingCommentToPostID;

export default postsSlice.reducer;