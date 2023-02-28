import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '..';

// Define a type for the slice state
interface GeneralState {
  error: string | null;
  isLoadingRoute: boolean;
}

// Define the initial state using that type
const initialState: GeneralState = {
  error: null,
  isLoadingRoute: false
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
    },
    routeChangeStart: (state) => {
      state.isLoadingRoute = true;
    },
    routeChangeEnd: (state) => {
      state.isLoadingRoute = false;
    }
  },
});

export const { raiseError, resetError, routeChangeStart, routeChangeEnd } = appSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectError = (state: RootState) => state.app.error;
export const selectIsLoadingRoute = (state: RootState) => state.app.isLoadingRoute;

export default appSlice.reducer;