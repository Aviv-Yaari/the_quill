import { ActionReducerMapBuilder, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { UserState } from "./user.slice";

export const verifyUserFromToken = createAsyncThunk('user/verifyUserFromTokenStatus', async () => {
  const res = await axios.post("/api/auth/verify");
  return res.data as string; // should return the username
});
  
export const verifyUserFromTokenReducers = (builder: ActionReducerMapBuilder<UserState>) => {
  builder.addCase(verifyUserFromToken.fulfilled, (state, action) => {
    state.username = action.payload;
  });
};

export const login = createAsyncThunk('user/loginStatus', async (data: { username: string, password: string }) => {
  const { username, password } = data;
  const res = await axios.post("/api/auth/login", { username, password });
  return { token: res.data as string, username };
});
    
export const loginReducers = (builder: ActionReducerMapBuilder<UserState>) => {
  builder.addCase(login.fulfilled, (state, action) => {
    state.username = action.payload.username;
  });
};