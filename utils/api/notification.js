import { API_BASE_URL } from "./base";

export const NOTIFICATION_API = {
  MARK_AS_READ: (id) =>
    `${API_BASE_URL}/admin/notifications/${id}/mark-as-read`,
  UNREAD_COUNT: `${API_BASE_URL}/admin/notifications/unread-count`,

  ALL: (id) => `${API_BASE_URL}/users/${id}/notifications`,
};
