import { call, delay, put, takeLatest, takeLeading } from "redux-saga/effects";
import * as SecureStore from "expo-secure-store";
import {
  loginStart,
  loginSuccess,
  loginFailure,
  registerStart,
  registerSuccess,
  registerFailure,
  signedOut,
} from "../../slices/Auth/authSlice";

import { AUTH_API } from "../../utils/api";
import fetcher from "../../services/fetcher";

// Optional purge ( wipe persisted storage on logout)
import { purgeStoredState } from "redux-persist";
import { authPersistConfig } from "../../store/persistConfig";
import { notify } from "../../helpers/toast";

// helpers
function* setToken(token) {
  try {
    yield call(SecureStore.setItemAsync, "authToken", token);
  } catch {}
}
function* clearToken() {
  try {
    yield call(SecureStore.deleteItemAsync, "authToken");
  } catch {}
}

// Login Saga
function* loginSaga({ payload }) {
  const { loginData, navigate } = payload || {};
  try {
    yield put(loginStart());

    const response = yield call(fetcher, AUTH_API.LOGIN, {
      method: "POST",
      body: loginData,
      auth: false,
    });

    const data = response?.data || response;

    if (!data?.token) {
      throw new Error(data?.message || "Login failed.");
    }

    // persist token for fetcher and keep in Redux (persisted slice)
    yield call(setToken, data.token);
    yield put(loginSuccess(data));

    notify.success("Login success", response?.message);

    // role-based redirect
    if (navigate) {
      const dest = data?.user?.role === "teacher" ? "/" : "/home";
      yield call(navigate, dest);
    }
  } catch (error) {
    const message = error.message || "Login failed.";
    notify.error("Login failed", message);
    yield put(loginFailure(message));
  }
}

// Registration Saga
function* registerSaga({ payload }) {
  const { registerData } = payload;
  try {
    yield put(registerStart());

    const response = yield call(fetcher, AUTH_API.REGISTER, {
      method: "POST",
      body: registerData,
      auth: false,
    });

    const data = response?.data || response;
    if (data?.status && data.status !== "success") {
      throw new Error(data.message || "Registration failed.");
    }

    yield put(registerSuccess(data));
    notify.success("Registration success", response?.message);
    // usually navigate handled in component after success
  } catch (error) {
    const message = error.message || "Registration failed.";
    notify.error("Registration failed", message);
    yield put(registerFailure(message));
  }
}

export function* logoutSaga({ payload }) {
  const { navigate, reason } = payload || {};

  // (optional) toast for UX clarity
  if (reason) {
    notify.error("Session expired", reason || "Please sign in again.");
    yield delay(250); // let the toast render before nav
  }

  // Clear device token + reset Redux state
  yield call(clearToken);
  yield put(signedOut());

  // OPTIONAL: wipe persisted state (hard reset)
  yield call(purgeStoredState, authPersistConfig);

  // Navigate back to Welcome
  if (typeof navigate === "function") {
    const dest = "/(auth)/welcome"; // or "/welcome"
    yield call(navigate, dest);
  }
}

// Root Auth Saga
export default function* authSaga() {
  yield takeLatest("LOGIN", loginSaga);
  yield takeLatest("REGISTER", registerSaga);
  yield takeLeading("LOGOUT", logoutSaga);
}
