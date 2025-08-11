import { API_BASE_URL } from "../base";

export const CONNECT_STUDENT_API = {
  FIND_STUDENT_DETAILS: `${API_BASE_URL}/student-details`,
  CREATE_TUITION_DETAILS: `${API_BASE_URL}/tuition-details`,
  FETCH_TUITION_DETAILS: (teacherId, studentId) =>
    `${API_BASE_URL}/tuition-details/teacher/${teacherId}/student/${studentId}`,

  CREATE_CONNECTION_REQUEST: `${API_BASE_URL}/connection/send`,
  CHECK_CONNECTION_STATUS: `${API_BASE_URL}/connection/check-connection-status`,
};
