import { configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import { MMKVStorage } from "redux-persist-mmkv-storage";
import reducer from "./reducer";

// Create an MMKV storage instance
const storage = new MMKVStorage();

// Persist configuration
const persistConfig = {
  key: "root", // Root-level key for storage
  storage, // Use MMKV storage instance
  timeout: 0, // Optional: Prevent timeout during rehydration
};

// Middleware configuration
const middlewareConfig = {
  serializableCheck: false, // Ignore non-serializable data warnings
  immutableCheck: false,
};

// Wrap your root reducer with persistReducer
const persistedReducer = persistReducer(persistConfig, reducer);

// Configure and export the Redux store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware(middlewareConfig),
});

export default store;
