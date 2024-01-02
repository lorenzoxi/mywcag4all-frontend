import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import websiteSlice from "./websiteSlice";
import testSlice from "./testSlice";
import toolsSlice from "./slice.tools";
import rankingSlice from "./rankingSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import thunk from "redux-thunk";

const persistConfig = {
  key: "root",
  storage,
};

const reducers = combineReducers({
  auth: authSlice,
  website: websiteSlice,
  test: testSlice,
  tools: toolsSlice,
  ranking: rankingSlice,
});

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
});

export default store;
