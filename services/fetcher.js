// React Native / Expo-friendly fetcher
import * as SecureStore from "expo-secure-store";

const DEFAULT_TIMEOUT = 15000; // 15s

function buildUrl(url, params) {
  if (!params) return url;
  const usp = new URLSearchParams(params).toString();
  if (!usp) return url;
  return url + (url.includes("?") ? "&" : "?") + usp;
}

async function getAuthToken() {
  try {
    return await SecureStore.getItemAsync("authToken");
  } catch {
    return null;
  }
}

/** ========= NEW: pluggable callbacks ========= */
let onUnauthorized; // (err) => void | Promise<void>
export function setOnUnauthorized(fn) {
  onUnauthorized = fn;
}
/** =========================================== */

const fetcher = async (url, options = {}) => {
  const method = (options.method || "GET").toUpperCase();
  const isFormData = options.body instanceof FormData;
  const timeout = options.timeout ?? DEFAULT_TIMEOUT;
  const useAuth = options.auth !== false; // opt-out with { auth: false }
  const params = options.params;

  const finalUrl = buildUrl(url, params);

  const headers = {
    Accept: "application/json",
    ...(isFormData ? {} : { "Content-Type": "application/json" }),
    ...(options.headers || {}),
  };

  if (useAuth) {
    const token = await getAuthToken();
    if (token) headers.Authorization = `Bearer ${token}`;
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);

  try {
    const res = await fetch(finalUrl, {
      ...options,
      method,
      headers,
      // do not send a body for GET
      body:
        method === "GET"
          ? undefined
          : isFormData
            ? options.body
            : options.body != null
              ? JSON.stringify(options.body)
              : undefined,
      signal: controller.signal,
    });

    const text = await res.text();
    let data;
    try {
      data = text ? JSON.parse(text) : null;
    } catch {
      // not JSON — return raw text
      data = text;
    }

    if (!res.ok) {
      const message =
        (data && (data.message || data.error || data.detail)) ||
        `Request failed with status ${res.status}`;
      const err = new Error(message);
      err.status = res.status;
      err.data = data;

      // ========= NEW: trigger global unauthorized handler =========
      if (
        [401, 403, 419, 440].includes(res.status) &&
        typeof onUnauthorized === "function"
      ) {
        // fire-and-forget; don't await to keep fetcher's surface the same
        try {
          onUnauthorized(err);
        } catch {}
      }
      // ============================================================

      throw err;
    }

    return data; // keep same shape your sagas expect
  } catch (err) {
    // err.name === 'AbortError' on timeout
    if (err.name === "AbortError") {
      const to = new Error("Request timed out");
      to.status = 408;
      throw to;
    }
    throw err;
  } finally {
    clearTimeout(timer);
  }
};

export default fetcher;
