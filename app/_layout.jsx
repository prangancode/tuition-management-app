import { Slot } from "expo-router";
import "./global.css";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import store, { persistor } from "../store/store";
import Toast from "react-native-toast-message";
import toastConfig, { TOAST_OPTIONS } from "../utils/toastConfig";

const RootLayout = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Slot />
        <Toast config={toastConfig} {...TOAST_OPTIONS} />
      </PersistGate>
    </Provider>
  );
};

export default RootLayout;
