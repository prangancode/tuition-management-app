import { Platform, StatusBar } from "react-native";
import { BaseToast, ErrorToast } from "react-native-toast-message";

// Global defaults you can reuse in your root
export const TOAST_OPTIONS = {
  position: "top",
  // status bar height on Android so it doesn’t overlap
  topOffset:
    (Platform.OS === "android" ? StatusBar.currentHeight || 0 : 0) + 64,
  visibilityTime: 2800, // 2.8s
};

const text1Style = { fontSize: 16, fontWeight: "700" };
const text2Style = { fontSize: 14, color: "#111827" };
const baseStyle = { borderLeftWidth: 4, minHeight: 64 };
const contentStyle = { paddingHorizontal: 14 };

const toastConfig = {
  success: (props) => (
    <BaseToast
      {...props}
      style={[baseStyle, { borderLeftColor: "#10B981" }]}
      contentContainerStyle={contentStyle}
      text1Style={text1Style}
      text2Style={text2Style}
    />
  ),
  error: (props) => (
    <ErrorToast
      {...props}
      style={[baseStyle, { borderLeftColor: "#EF4444" }]}
      text1Style={text1Style}
      text2Style={text2Style}
    />
  ),
  info: (props) => (
    <BaseToast
      {...props}
      style={[baseStyle, { borderLeftColor: "#3B82F6" }]}
      contentContainerStyle={contentStyle}
      text1Style={text1Style}
      text2Style={text2Style}
    />
  ),
};

export default toastConfig;
