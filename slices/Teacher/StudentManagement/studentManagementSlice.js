import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  connectionRequests: [],
  pagination: null,
  loading: false,
  error: null,

  connectionCount: null,
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
} = studentManagementSlice.actions;

export default studentManagementSlice.reducer;
