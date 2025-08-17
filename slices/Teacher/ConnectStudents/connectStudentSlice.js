import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  studentDetails: null,
  loading: false,
  error: null,

  tuitionDetails: null,
  tuitionDetailsLoading: false,
  tuitionDetailsError: null,

  tuitionDetailsSubmitting: false,
  tuitionDetailsSubmitError: null,

  connectionStatus: null,
  connectionStatusLoading: false,
  connectionStatusError: null,
};

const connectStudentSlice = createSlice({
  name: "findStudent",
  initialState,
  reducers: {
    findStudentStart: (state) => {
      state.loading = true;
      state.error = null;
      state.studentDetails = null;
    },
    findStudentSuccess: (state, { payload }) => {
      state.loading = false;
      state.studentDetails = payload;
    },
    findStudentFailure: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    clearFoundStudent: (state) => {
      state.studentDetails = null;
      state.loading = false;
      state.error = null;
    },

    // send connection request

    sendConnectionRequestStart: (state) => {
      state.loading = true;
    },
    sendConnectionRequestSuccess: (state) => {
      state.loading = false;
    },
    sendConnectionRequestFailure: (state) => {
      state.loading = false;
    },

    // submit tuition details
    submitTuitionDetailsStart: (state) => {
      state.tuitionDetailsSubmitting = true;
      state.tuitionDetailsSubmitError = null;
    },
    submitTuitionDetailsSuccess: (state) => {
      state.tuitionDetailsSubmitting = false;
    },
    submitTuitionDetailsFailure: (state, { payload }) => {
      state.tuitionDetailsSubmitting = false;
      state.tuitionDetailsSubmitError = payload;
    },

    // fetch tuition details reducers

    fetchTuitionDetailsStart: (state) => {
      state.tuitionDetailsLoading = true;
      state.tuitionDetailsError = null;
      state.tuitionDetails = null;
    },
    fetchTuitionDetailsSuccess: (state, { payload }) => {
      state.tuitionDetailsLoading = false;
      state.tuitionDetails = payload;
    },
    fetchTuitionDetailsFailure: (state, { payload }) => {
      state.tuitionDetailsLoading = false;
      state.tuitionDetailsError = payload;
    },
    clearTuitionDetails: (state) => {
      state.tuitionDetails = null;
      state.tuitionDetailsLoading = false;
      state.tuitionDetailsError = null;
    },

    // connection status

    checkConnectionStatusStart: (state) => {
      state.connectionStatusLoading = true;
      state.connectionStatusError = null;
      state.connectionStatus = null;
    },
    checkConnectionStatusSuccess: (state, { payload }) => {
      state.connectionStatusLoading = false;
      state.connectionStatus = payload; // expected: 'accepted', 'pending', etc.
    },
    checkConnectionStatusError: (state, { payload }) => {
      state.connectionStatusLoading = false;
      state.connectionStatusError = payload;
    },
    clearConnectionStatus: (state) => {
      state.connectionStatus = null;
      state.connectionStatusLoading = false;
      state.connectionStatusError = null;
    },
  },
});

export const {
  findStudentStart,
  findStudentSuccess,
  findStudentFailure,
  clearFoundStudent,

  submitTuitionDetailsStart,
  submitTuitionDetailsSuccess,
  submitTuitionDetailsFailure,

  fetchTuitionDetailsStart,
  fetchTuitionDetailsSuccess,
  fetchTuitionDetailsFailure,
  clearTuitionDetails,

  checkConnectionStatusStart,
  checkConnectionStatusSuccess,
  checkConnectionStatusError,
  clearConnectionStatus,

  sendConnectionRequestStart,
  sendConnectionRequestFailure,
  sendConnectionRequestSuccess,
} = connectStudentSlice.actions;

export default connectStudentSlice.reducer;
