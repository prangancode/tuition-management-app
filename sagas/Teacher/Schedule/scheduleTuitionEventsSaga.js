// sagas/Teacher/Schedule/scheduleTuitionEventsSaga.js
import {
  call,
  put,
  takeLatest,
  all,
  take,
  fork,
  cancel,
  delay,
} from "redux-saga/effects";
import { SCHEDULE_API } from "../../../utils/api";
import fetcher from "../../../services/fetcher";

import {
  fetchActiveConnectionsStudentsFailure,
  fetchActiveConnectionsStudentsStart,
  fetchActiveConnectionsStudentsSuccess,
  fetchSpecificStudentEventsFailure,
  fetchSpecificStudentEventsStart,
  fetchSpecificStudentEventsSuccess,
  submitTuitionEventsFailure,
  submitTuitionEventsStart,
  submitTuitionEventsSuccess,
} from "../../../slices/Teacher/Schedule/scheduleTuitionEventsSlice";
import { notify } from "../../../helpers/toast";

// Active connections (supports per_page, page, search)
function* fetchActiveConnectionsStudentSaga(action) {
  try {
    yield put(fetchActiveConnectionsStudentsStart());

    const { filters = {} } = action.payload || {};
    const per_page = filters.per_page ?? 5;
    const page = filters.page ?? 1;
    const search = (filters.search ?? "").toString().trim();

    const params = new URLSearchParams({
      per_page: String(per_page),
      page: String(page),
    });
    if (search) params.set("search", search);

    const url = `${
      SCHEDULE_API.ACTIVE_CONNECTED_STUDENTS
    }?${params.toString()}`;

    const response = yield call(() => fetcher(url, { method: "GET" }));

    const { requests, pagination } = response.data;

    yield put(fetchActiveConnectionsStudentsSuccess({ requests, pagination }));
  } catch (error) {
    const message = error?.message || "Failed to fetch active students.";
    yield put(fetchActiveConnectionsStudentsFailure(message));
    notify.error("Active students", message);
  }
}

/**
 * Debounced (and cancellable) search watcher for active students.
 * - Debounces FETCH_ACTIVE_CONNECTION_STUDENTS_SEARCH by 400ms
 * - Cancels pending debounce when CANCEL_ACTIVE_STUDENTS_SEARCH arrives
 */
function* debouncedActiveStudentsSearchWatcher() {
  let task;
  while (true) {
    const action = yield take([
      "FETCH_ACTIVE_CONNECTION_STUDENTS_SEARCH",
      "CANCEL_ACTIVE_STUDENTS_SEARCH",
    ]);

    // cancel any pending debounce task
    if (task) {
      yield cancel(task);
      task = null;
    }

    if (action.type === "FETCH_ACTIVE_CONNECTION_STUDENTS_SEARCH") {
      task = yield fork(function* () {
        yield delay(400);
        yield call(fetchActiveConnectionsStudentSaga, action);
      });
    }
  }
}

// ---- Submit tuition events
function* submitTuitionEventsSaga(action) {
  try {
    yield put(submitTuitionEventsStart());

    const { setIsModalOpen, ...submitPayload } = action.payload;

    const response = yield call(() =>
      fetcher(SCHEDULE_API.CREATE_TUITION_EVENT, {
        method: "POST",
        body: submitPayload,
      })
    );

    yield put(submitTuitionEventsSuccess());
    notify.success("Tuition event", response?.message);

    // refresh events list for that student
    yield put({
      type: "FETCH_SPECIFIC_STUDENT_EVENTS",
      payload: { student_id: action.payload.student_id },
    });

    if (typeof setIsModalOpen === "function") {
      yield call(setIsModalOpen, false);
    }
  } catch (error) {
    const message = error?.message || "Failed to submit tuition details.";
    yield put(submitTuitionEventsFailure(message));
    notify.error("Tuition event", message);
  }
}

// ---- Fetch events for a specific student
function* fetchSpecificStudentEventsSaga(action) {
  try {
    yield put(fetchSpecificStudentEventsStart());

    const response = yield call(() =>
      fetcher(
        SCHEDULE_API.FETCH_SPECIFIC_TEACHER_STUDENT_EVENTS(
          action.payload.student_id
        ),
        { method: "GET" }
      )
    );

    yield put(fetchSpecificStudentEventsSuccess(response.data.events));
  } catch (error) {
    const message = error?.message || "Failed to fetch events.";
    yield put(fetchSpecificStudentEventsFailure(message));
    notify.error("Student events", message);
  }
}

//  Root saga: running all watchers concurrently
export default function* scheduleTuitionEventsSaga() {
  yield all([
    // Instant loads (initial, pagination)
    takeLatest(
      "FETCH_ACTIVE_CONNECTION_STUDENTS",
      fetchActiveConnectionsStudentSaga
    ),

    // Debounced search (cancellable)
    debouncedActiveStudentsSearchWatcher(),

    // Other flows
    takeLatest("SUBMIT_TUITION_EVENTS", submitTuitionEventsSaga),
    takeLatest("FETCH_SPECIFIC_STUDENT_EVENTS", fetchSpecificStudentEventsSaga),
  ]);
}
