import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '..';
import { loginReducers, verifyUserFromTokenReducers } from './user.thunks';

export interface UserState {
  username: string | null;
}

const initialState: UserState = {
  username: null
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
  },
  extraReducers(builder) {
    verifyUserFromTokenReducers(builder);
    loginReducers(builder);
  },
});

export const {  } = userSlice.actions;

export const selectUsername = (state: RootState) => state.user.username;

export default userSlice.reducer;