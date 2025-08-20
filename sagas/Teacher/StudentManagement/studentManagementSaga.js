import { call, put, takeLatest } from "redux-saga/effects";
import {
  fetchConnectionRequestsStart,
  fetchConnectionRequestsSuccess,
  fetchConnectionRequestsFailure,
  disconnectStudentStart,
  disconnectStudentSuccess,
  disconnectStudentFailure,
  countConnectionsSuccess,
} from "../../../slices/Teacher/StudentManagement/studentManagementSlice";

import { STUDENT_MANAGEMENT_API } from "../../../utils/api";
import fetcher from "../../../services/fetcher";
import { notify } from "../../../helpers/toast";

// Worker Saga with dynamic filtering
function* fetchConnectionRequestsSaga(action) {
  try {
    yield put(fetchConnectionRequestsStart());

    const { filters = {} } = action.payload || {};

    const queryParams = new URLSearchParams(filters).toString();

    const response = yield call(() =>
      fetcher(`${STUDENT_MANAGEMENT_API.CONNECTIONS}?${queryParams}`, {
        method: "GET",
      })
    );

    const { requests, pagination } = response.data;

    yield put(fetchConnectionRequestsSuccess({ requests, pagination }));
  } catch (error) {
    const message = error.message || "Something went wrong.";
    yield put(fetchConnectionRequestsFailure(message));
    notify.error("Student connections", message);
    yield put(loginFailure(message));
  }
}

// Worker saga to disconnect a student
function* disconnectStudentSaga(action) {
  try {
    yield put(disconnectStudentStart());

    const response = yield call(() =>
      fetcher(STUDENT_MANAGEMENT_API.DISCONNECT_STUDENT(action.payload.id), {
        method: "PATCH",
      })
    );

    yield put(disconnectStudentSuccess({ id: action.payload.id }));
    notify.success("Student disconnect", response?.message);
  } catch (error) {
    const message = error.message || "Failed to disconnect student.";
    yield put(disconnectStudentFailure(message));
    yield put(setToastAlert({ type: "error", message }));
  }
}

// worker saga to count the connections

function* countConnectionsSaga() {
  try {
    const response = yield call(() =>
      fetcher(STUDENT_MANAGEMENT_API.COUNT_CONNECTIONS, {
        method: "GET",
      })
    );

    yield put(countConnectionsSuccess(response?.data?.connection_count));
  } catch (error) {
    const message = error?.message || "Failed to check connection status.";
    notify.error("Count connection", message);
  }
}

// Watcher Saga
export default function* studentManagementSaga() {
  yield takeLatest("FETCH_CONNECTION_REQUESTS", fetchConnectionRequestsSaga);
  yield takeLatest("DISCONNECT_STUDENT", disconnectStudentSaga);
  yield takeLatest("CONNECTION_COUNT", countConnectionsSaga);
}
