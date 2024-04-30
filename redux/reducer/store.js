import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";

import isLogged from "../slices/isLogged";
import catFav from "../slices/catFav";
import filter from "../slices/filter";

let persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["isLogged", "catFav"],
  // blacklist: ['isLogged'],
};

let rootReducer = combineReducers({
  isLogged: isLogged,
  catFav: catFav,
  filter: filter,
});

let persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
