import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '..';

// Define a type for the slice state
interface GeneralState {
  error: string | null;
}

// Define the initial state using that type
const initialState: GeneralState = {
  error: null,
};

export const appSlice = createSlice({
  name: 'app',
  // `createSlice` will infer the state type from the `initialState` argument
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

// Other code such as selectors can use the imported `RootState` type
export const selectError = (state: RootState) => state.app.error;

export default appSlice.reducer;