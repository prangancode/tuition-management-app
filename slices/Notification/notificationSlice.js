import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  unreadCount: 0,
  loading: false,
};

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    fetchNotificationsStart(state) {
      state.loading = true;
    },
    fetchNotificationsSuccess(state, action) {
      state.items = action.payload;
      state.loading = false;
    },
    fetchUnreadCountSuccess(state, action) {
      state.unreadCount = action.payload;
    },
    addNotification(state, action) {
      state.items.unshift(action.payload);
      state.unreadCount += 1;
    },
    markAsReadSuccess(state, action) {
      const id = action.payload;
      const notification = state.items.find((n) => n.id === id);
      if (notification) notification.read_at = new Date();
      state.unreadCount = state.items.filter((n) => !n.read_at).length;
    },
  },
});

export const {
  fetchNotificationsStart,
  fetchNotificationsSuccess,
  fetchUnreadCountSuccess,
  addNotification,
  markAsReadSuccess,
} = notificationSlice.actions;

export default notificationSlice.reducer;
