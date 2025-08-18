import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  activeConnections: [],
  pagination: {},
  error: null,

  submitting: false,
  submitError: null,
  submitSuccess: false,

  specificStudentEvents: [],
  specificStudentEventsLoading: false,
  specificStudentEventsError: null,
};

const scheduleTuitionEventsSlice = createSlice({
  name: "scheduleTuitionEvents",
  initialState,
  reducers: {
    fetchActiveConnectionsStudentsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchActiveConnectionsStudentsSuccess(state, action) {
      state.loading = false;
      state.activeConnections = action.payload?.requests;
      state.pagination = action.payload?.pagination;
    },
    fetchActiveConnectionsStudentsFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // Submitting tuition events
    submitTuitionEventsStart(state) {
      state.submitting = true;
      state.submitError = null;
      state.submitSuccess = false;
    },
    submitTuitionEventsSuccess(state) {
      state.submitting = false;
      state.submitSuccess = true;
    },
    submitTuitionEventsFailure(state, action) {
      state.submitting = false;
      state.submitError = action.payload;
    },

    fetchSpecificStudentEventsStart(state) {
      state.specificStudentEvents = [];
      state.specificStudentEventsLoading = true;
      state.specificStudentEventsError = null;
    },
    fetchSpecificStudentEventsSuccess(state, action) {
      state.specificStudentEventsLoading = false;
      state.specificStudentEvents = action.payload;
    },
    fetchSpecificStudentEventsFailure(state, action) {
      state.specificStudentEvents = [];
      state.specificStudentEventsLoading = false;
      state.specificStudentEventsError = action.payload;
    },
  },
});

export const {
  fetchActiveConnectionsStudentsStart,
  fetchActiveConnectionsStudentsSuccess,
  fetchActiveConnectionsStudentsFailure,

  submitTuitionEventsStart,
  submitTuitionEventsSuccess,
  submitTuitionEventsFailure,

  fetchSpecificStudentEventsStart,
  fetchSpecificStudentEventsSuccess,
  fetchSpecificStudentEventsFailure,
} = scheduleTuitionEventsSlice.actions;

export default scheduleTuitionEventsSlice.reducer;
