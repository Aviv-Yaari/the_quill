import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '..';
import { loginReducers, logoutReducers, verifyUserFromTokenReducers } from './user.thunks';

export interface UserState {
  username: string | null;
  isLoading: boolean;
}

const initialState: UserState = {
  username: null,
  isLoading: false
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
  },
  extraReducers(builder) {
    verifyUserFromTokenReducers(builder);
    loginReducers(builder);
    logoutReducers(builder);
  },
});

export const selectUsername = (state: RootState) => state.user.username;
export const selectIsLoading = (state: RootState) => state.user.isLoading;

export default userSlice.reducer;