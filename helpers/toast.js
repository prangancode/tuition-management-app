import Toast from "react-native-toast-message";

export const notify = {
  success: (title, msg) =>
    Toast.show({ type: "success", text1: title, text2: msg }),
  error: (title, msg) =>
    Toast.show({ type: "error", text1: title, text2: msg }),
  info: (title, msg) => Toast.show({ type: "info", text1: title, text2: msg }),
};
