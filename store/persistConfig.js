import SecureStoreStorage from "./secureStoreStorage";

export const authPersistConfig = {
  key: "auth",
  storage: SecureStoreStorage,
  // If you want to avoid storing transient fields:
  // blacklist: ["loading", "error"],
  // If you prefer not to persist token (since we also save it as "authToken"),
  // uncomment this (but then hydrate carefully):
  // blacklist: ["token", "loading", "error"],
};
