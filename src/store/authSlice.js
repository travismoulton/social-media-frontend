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

    authSuccess: (state, action) => {
      console.log(action.payload);
      const { user } = action.payload;
      state.user = user;
      state.error = false;
      state.loading = false;
      state.inAuth = false;
    },

    authFail: (state, action) => {
      state.error = action.error;
      state.loading = false;
      state.inAuth = false;
      state.user = null;
    },

    authLogout: (state, action) => {
      state.error = null;
      state.loading = false;
      state.user = null;
      state.inAuth = false;
    },

    authReset: (state, action) => {
      state.error = null;
      state.loading = false;
      state.user = null;
      state.inAuth = false;
    },
  },
});

export default authSlice.reducer;

export const { authStart, authSuccess, authFail, authLogout, authReset } =
  authSlice.actions;
