// store/apiSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  loading: false,
  error: null,
  isAuthenticated: false,

  // forgot password
  forgotLoading: false,
  forgotError: null,
  forgotSent: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, { payload }) => {
      state.loading = false;
      state.user = payload.user;
      state.token = payload.token;
      state.isAuthenticated = true;
    },
    loginFailure: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    registerStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    registerSuccess: (state, { payload }) => {
      state.loading = false;
      state.user = payload.user;
      state.token = payload.token;
      state.isAuthenticated = true;
    },
    registerFailure: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    signedOut: (state) => {
      state.loading = false;
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
    },

    // Forgot password
    forgotPasswordStart: (state) => {
      state.forgotLoading = true;
      state.forgotError = null;
      state.forgotSent = false;
    },
    forgotPasswordSuccess: (state) => {
      state.forgotLoading = false;
      state.forgotError = null;
      state.forgotSent = true;
    },
    forgotPasswordFailure: (state, { payload }) => {
      state.forgotLoading = false;
      state.forgotError = payload;
      state.forgotSent = false;
    },
    // optional clear (call on screen unmount if you like)
    clearForgotPasswordState: (state) => {
      state.forgotLoading = false;
      state.forgotError = null;
      state.forgotSent = false;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  signedOut,
  registerStart,
  registerSuccess,
  registerFailure,

  forgotPasswordStart,
  forgotPasswordSuccess,
  forgotPasswordFailure,
  clearForgotPasswordState,
} = authSlice.actions;

export default authSlice.reducer;
