import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./state/auth";
import articleReducer from "./state/article";
import { authApi } from "./api/authApi";
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
