import { UserToken } from "@/types/User";
import { ActionReducerMapBuilder, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { UserState } from "./user.slice";

export const verifyUserFromToken = createAsyncThunk('user/verifyUserFromTokenStatus', async () => {
  const res = await axios.post("/api/auth/verify");
  return res.data as UserToken; // should return the username
});
  
export const verifyUserFromTokenReducers = (builder: ActionReducerMapBuilder<UserState>) => {
  builder.addCase(verifyUserFromToken.fulfilled, (state, action) => {
    state.username = action.payload.username;
  });
};

export const login = createAsyncThunk('user/loginStatus', async (data: { username: string, password: string }) => {
  const { username, password } = data;
  const res = await axios.post("/api/auth/login", { username, password });
  return { token: res.data as string, username };
});
    
export const loginReducers = (builder: ActionReducerMapBuilder<UserState>) => {
  builder.addCase(login.pending, (state, action) => {
    state.isLoading = true;
  });
  builder.addCase(login.fulfilled, (state, action) => {
    state.username = action.payload.username;
    state.isLoading = false;
  });
  builder.addCase(login.rejected, (state) => {
    state.isLoading = false;
  });
};

export const logout = createAsyncThunk('user/logoutStatus', async () => {
  await axios.post("/api/auth/logout");
});
    
export const logoutReducers = (builder: ActionReducerMapBuilder<UserState>) => {
  builder.addCase(logout.pending, (state) => {
    state.isLoading = true;
  });
  builder.addCase(logout.rejected, (state) => {
    state.isLoading = false;
  });
  builder.addCase(logout.fulfilled, (state) => {
    state.username = null;
    state.isLoading = false;
  });
};