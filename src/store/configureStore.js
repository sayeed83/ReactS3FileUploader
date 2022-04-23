import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import api from "./middleware/api";
import reducer from "./reducer";
import { persistStore, persistReducer } from "redux-persist";
import { createLogger } from "redux-logger";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['entities', 'auth', 'dashboard', 'loan', 'lookup', 'agency', 'financiers', 'upload', 'checkEmail', 'userList', 'today', 'legal','trackLegal', 'notificationList', 'dataExportList','teleCaller'], //Things u want to persist
  blacklist: [], //Things u dont
};

// Middleware: Redux Persist Persisted Reducer
const persistedReducer = persistReducer(persistConfig, reducer)

const middleware = [
  ...getDefaultMiddleware({
    immutableCheck: false,
    serializableCheck: false,
    thunk: true,
  }),
  createLogger(),
  api,
];

const store = configureStore({
  reducer: persistedReducer,
  middleware,
  devTools: process.env.NODE_ENV !== "production",
});

let persistor = persistStore(store);

export { store, persistor };
