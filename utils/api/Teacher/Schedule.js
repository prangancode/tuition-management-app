import { API_BASE_URL } from "../base";

export const SCHEDULE_API = {
  ACTIVE_CONNECTED_STUDENTS: `${API_BASE_URL}/connection/my-accepted-requests`,
  CREATE_TUITION_EVENT: `${API_BASE_URL}/tuition-events`,
  FETCH_SPECIFIC_TEACHER_STUDENT_EVENTS: (studentId) =>
    `${API_BASE_URL}/tuition-events/student?student_id=${studentId}`,
};
