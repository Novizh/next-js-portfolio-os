import { configureStore } from "@reduxjs/toolkit";

import auth from "stores/auth/authSlice";
import user from "stores/user/userSlice";

let storeRef: AppStore | null = null;

export const makeStore = () =>
  configureStore({
    reducer: {
      auth,
      user,
    },
    devTools: process.env.NODE_ENV !== "production",
  });

export const setStore = (store: AppStore) => {
  storeRef = store;
};

export const getStore = () => storeRef;

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
