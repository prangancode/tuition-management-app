// sagas/Teacher/ConnectStudent/connectStudentSaga.js
import { call, put, takeLatest } from "redux-saga/effects";

import { CONNECT_STUDENT_API } from "../../../utils/api";

import {
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
  sendConnectionRequestSuccess,
  sendConnectionRequestStart,
  sendConnectionRequestFailure,
} from "../../../slices/Teacher/ConnectStudents/connectStudentSlice";
import fetcher from "../../../services/fetcher";

// Worker Saga
function* findStudentSaga(action) {
  try {
    yield put(findStudentStart());

    const response = yield call(() =>
      fetcher(CONNECT_STUDENT_API.FIND_STUDENT_DETAILS, {
        method: "POST",
        body: {
          custom_id: action.payload.custom_id,
        },
      })
    );

    yield put(findStudentSuccess(response?.data?.details));
  } catch (error) {
    const message = error?.message || "Failed to connect student.";
    yield put(clearFoundStudent());
    yield put(findStudentFailure(message));
  }
}

// worker saga to handle tuition details submission

function* submitTuitionDetailsSaga(action) {
  try {
    yield put(submitTuitionDetailsStart());

    const response = yield call(() =>
      fetcher(CONNECT_STUDENT_API.CREATE_TUITION_DETAILS, {
        method: "POST",
        body: action.payload,
      })
    );

    yield put(submitTuitionDetailsSuccess());

    const { teacher_id, student_id } = action.payload;
    yield call(fetchTuitionDetailsSaga, {
      payload: {
        teacherId: teacher_id,
        studentId: student_id,
      },
    });
  } catch (error) {
    const message = error?.message || "Failed to submit tuition details.";
    yield put(submitTuitionDetailsFailure(message));
  }
}

// worker saga to fetch tuition details of a student and teacher using their IDs

function* fetchTuitionDetailsSaga(action) {
  try {
    const { teacherId, studentId } = action.payload;
    yield put(fetchTuitionDetailsStart());

    const response = yield call(() =>
      fetcher(CONNECT_STUDENT_API.FETCH_TUITION_DETAILS(teacherId, studentId), {
        method: "GET",
      })
    );

    yield put(fetchTuitionDetailsSuccess(response?.data?.tuition_details));
  } catch (error) {
    const message = error?.message || "Failed to fetch tuition details.";
    yield put(clearTuitionDetails());
    yield put(fetchTuitionDetailsFailure(message));
  }
}

// worker saga to make connection request to a student
function* sendConnectionRequestSaga(action) {
  try {
    const { student_id, custom_id, tuition_details_id } = action.payload;

    yield put(sendConnectionRequestStart());

    const response = yield call(() =>
      fetcher(CONNECT_STUDENT_API.CREATE_CONNECTION_REQUEST, {
        method: "POST",
        body: {
          custom_id,
          tuition_details_id,
        },
      })
    );

    yield put(sendConnectionRequestSuccess());

    // fetching connection status saga
    yield call(checkConnectionStatusSaga, { payload: { student_id } });
  } catch (error) {
    const message = error?.message || "Failed to send connection request.";
    yield put(sendConnectionRequestFailure());
  }
}

// worker saga to check connection status with a student

function* checkConnectionStatusSaga(action) {
  try {
    yield put(checkConnectionStatusStart());
    const { student_id } = action.payload;

    const response = yield call(() =>
      fetcher(CONNECT_STUDENT_API.CHECK_CONNECTION_STATUS, {
        method: "POST",
        body: {
          student_id,
        },
      })
    );

    yield put(checkConnectionStatusSuccess(response?.data?.status));
  } catch (error) {
    yield put(checkConnectionStatusError(error?.message));
    yield put(clearConnectionStatus());
  }
}

// Watcher Saga
export default function* connectStudentSaga() {
  yield takeLatest("FIND_STUDENT", findStudentSaga);
  yield takeLatest("SUBMIT_TUITION_DETAILS", submitTuitionDetailsSaga);
  yield takeLatest("FETCH_TUITION_DETAILS", fetchTuitionDetailsSaga);
  yield takeLatest("SEND_CONNECTION_REQUEST", sendConnectionRequestSaga);
  yield takeLatest("CHECK_CONNECTION_STATUS", checkConnectionStatusSaga);
}
