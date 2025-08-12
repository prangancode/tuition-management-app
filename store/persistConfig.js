import AsyncStorage from "@react-native-async-storage/async-storage";

export const authPersistConfig = {
  key: "auth",
  storage: AsyncStorage,
  blacklist: ["loading", "error"],
};
