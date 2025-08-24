import { call, put, takeLatest } from "redux-saga/effects";
import { NOTIFICATION_API } from "../../utils/api";
import {
  fetchNotificationsStart,
  fetchNotificationsSuccess,
  fetchUnreadCountSuccess,
  markAsReadSuccess,
} from "../../slices/Notification/notificationSlice";
import fetcher from "../../services/fetcher";
import { notify } from "../../helpers/toast";

function* fetchNotifications({ payload }) {
  try {
    const { id } = payload;
    yield put(fetchNotificationsStart());
    const res = yield call(() => fetcher(`${NOTIFICATION_API.ALL(id)}`));
    yield put(fetchNotificationsSuccess(res?.data?.notifications));
  } catch (err) {
    notify.error("Error", err.message);
  }
}

function* fetchUnreadCount() {
  try {
    const res = yield call(() => fetcher(`${NOTIFICATION_API.UNREAD_COUNT}`));
    yield put(fetchUnreadCountSuccess(res.data.unread_count));
  } catch (err) {
    notify.error("Error", err.message);
  }
}

function* markAsRead({ payload }) {
  try {
    const { id } = payload;
    yield call(() =>
      fetcher(`${NOTIFICATION_API.MARK_AS_READ(id)}`, {
        method: "POST",
      })
    );
    yield put(markAsReadSuccess(payload));
  } catch (err) {
    notify.error("Error", err.message);
  }
}

export default function* notificationSaga() {
  yield takeLatest("FETCH_NOTIFICATIONS", fetchNotifications);
  yield takeLatest("FETCH_UNREAD_COUNT", fetchUnreadCount);
  yield takeLatest("MARK_AS_READ", markAsRead);
}
