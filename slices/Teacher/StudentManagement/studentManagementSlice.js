import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  connectionRequests: [],
  pagination: null,
  loading: false,
  error: null,

  connectionCount: null,

  tuitionDetails: null,
  tuitionDetailsLoading: false,
  tuitionDetailsError: null,
};

const studentManagementSlice = createSlice({
  name: "studentManagement",
  initialState,
  reducers: {
    fetchConnectionRequestsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchConnectionRequestsSuccess: (state, { payload }) => {
      state.loading = false;
      state.connectionRequests = payload.requests;
      state.pagination = payload.pagination;
    },
    fetchConnectionRequestsFailure: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    // Action to disconnect a student
    disconnectStudentStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    disconnectStudentSuccess: (state, { payload }) => {
      state.loading = false;
      // Optionally remove the student from the state list
      state.connectionRequests = state.connectionRequests.filter(
        (req) => req.id !== payload.id
      );
    },
    disconnectStudentFailure: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    // connection count

    countConnectionsSuccess: (state, { payload }) => {
      state.connectionCount = payload;
    },

    // Tuition details actions

    fetchTuitionDetailsStart: (state) => {
      state.tuitionDetailsLoading = true;
      state.tuitionDetailsError = null;
    },
    fetchTuitionDetailsSuccess: (state, { payload }) => {
      state.tuitionDetailsLoading = false;
      state.tuitionDetails = payload; // the tuition details object
    },
    fetchTuitionDetailsFailure: (state, { payload }) => {
      state.tuitionDetailsLoading = false;
      state.tuitionDetailsError = payload;
    },
    clearTuitionDetails: (state) => {
      state.tuitionDetails = null;
      state.tuitionDetailsError = null;
      state.tuitionDetailsLoading = false;
    },
  },
});

export const {
  fetchConnectionRequestsStart,
  fetchConnectionRequestsSuccess,
  fetchConnectionRequestsFailure,

  disconnectStudentStart,
  disconnectStudentSuccess,
  disconnectStudentFailure,

  countConnectionsSuccess,

  fetchTuitionDetailsStart,
  fetchTuitionDetailsSuccess,
  fetchTuitionDetailsFailure,
  clearTuitionDetails,
} = studentManagementSlice.actions;

export default studentManagementSlice.reducer;
