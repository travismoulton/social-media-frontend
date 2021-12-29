import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  error: null,
  loading: false,
  user: null,
  inAuth: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authStart: (state, action) => {
      state.error = false;
      state.loading = true;
      state.inAuth = true;
    },
    // authSuccess: {
    //   reducer(state, action) {
    //     const { user } = action.payload;
    //   },
    // },
    authSuccess: (state, action) => {
      const { user } = action.payload;
      state.user = user;
      state.error = false;
      state.loading = false;
      state.inAuth = false;
    },
  },
});

export default authSlice.reducer;

export const { authStart, authSuccess } = authSlice.actions;
