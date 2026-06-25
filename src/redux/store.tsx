import { configureStore } from "@reduxjs/toolkit";
import { loginApi } from "../pages/Login/Login.services";
import { onboardHireApi } from "../layouts/ManagerDashboard/OnboardHire/OnboardHire.services";
import authReducer from "./authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [loginApi.reducerPath]: loginApi.reducer,
    [onboardHireApi.reducerPath]: onboardHireApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(loginApi.middleware)
      .concat(onboardHireApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;