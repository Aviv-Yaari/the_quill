import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '..';

interface GeneralState {
  error: string | null;
}

const initialState: GeneralState = {
  error: null
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    raiseError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    resetError: (state) => {
      state.error = null;
    }
  },
});

export const { raiseError, resetError } = appSlice.actions;

export const selectError = (state: RootState) => state.app.error;

export default appSlice.reducer;