import { API_BASE_URL } from "../base";

export const STUDENT_MANAGEMENT_API = {
  CONNECTIONS: `${API_BASE_URL}/connections`,
  COUNT_CONNECTIONS: `${API_BASE_URL}/connections/count`,
  ACTIVE_CONNECTED_STUDENTS: `${API_BASE_URL}/connection/my-accepted-requests`,
  PENDING_STUDENTS: `${API_BASE_URL}/connection/my-pending-requests`,
  DISCONNECT_STUDENT: (id) => `${API_BASE_URL}/connections/${id}/disconnect`,
};
