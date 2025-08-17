import { configureStore } from "@reduxjs/toolkit";
const createSagaMiddleware = require("redux-saga").default;
import { persistReducer, persistStore } from "redux-persist";

import rootSaga from "../sagas/rootSaga";
import authReducer from "../slices/Auth/authSlice";
import connectStudentsReducer from "../slices/Teacher/ConnectStudents/connectStudentSlice";
import { authPersistConfig } from "./persistConfig";

const sagaMiddleware = createSagaMiddleware();

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer, // only this is persisted
    connectStudents: connectStudentsReducer,
  },
  middleware: (getDefault) =>
    getDefault({
      serializableCheck: {
        // Ignore redux-persist actions
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/FLUSH",
          "persist/PAUSE",
          "persist/PURGE",
          "persist/REGISTER",
        ],
        ignoredActionPaths: ["payload.navigate"],
      },
    }).concat(sagaMiddleware),
});

export const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export default store;
