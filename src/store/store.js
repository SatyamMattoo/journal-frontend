import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./state/auth";
import { authApi } from "./api/authApi";
import articleReducer from "./state/article";
import { articleApi } from "./api/articleApi";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    article: articleReducer,
    [authApi.reducerPath]: authApi.reducer,
    [articleApi.reducerPath]: articleApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, articleApi.middleware),
});

