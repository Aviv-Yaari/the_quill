import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '..';

interface GeneralState {
  error: string | null;
  isLoadingRoute: boolean;
}

const initialState: GeneralState = {
  error: null,
  isLoadingRoute: false
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

export const selectError = (state: RootState) => state.app.error;
export const selectIsLoadingRoute = (state: RootState) => state.app.isLoadingRoute;

export default appSlice.reducer;