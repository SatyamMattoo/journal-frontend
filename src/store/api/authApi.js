import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000/api/v1/users",
    headers: {
      "Content-Type": "application/json",
    },
  }),
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => {
        return {
          url: "/new",
          method: "POST",
          body: data,
          credentials: "include",
        };
      },
    }),
    login: builder.mutation({
      query: (data) => {
        return {
          url: "/login",
          method: "POST",
          body: data,
          credentials: "include",
        };
      },
    }),
    logout: builder.mutation({
      query: () => {
        return {
          url: "/logout",
          method: "POST",
          credentials: "include",
        };
      },
    }),
    sendResetMail: builder.mutation({
      query: (data) => {
        return {
          url: "/password/reset",
          method: "POST",
          body: data,
        };
      },
    }),
    getUserDetails: builder.query({
      query: () => {
        return {
          url: "/my",
          credentials: "include",
        };
      },
    }),
    resetPassword: builder.mutation({
      query: (data) => {
        return {
          method: "PUT",
          url: `/password/reset/${data.token}`,
          body: data,
          credentials: "include",
        };
      },
    }),

    //Admin
    createEditor: builder.mutation({
      query: (data) => {
        return {
          url: "/admin/createeditor",
          method: "POST",
          body: data,
          credentials: "include",
        };
      },
    }),
    deleteEditor: builder.mutation({
      query: (id) => {
        return {
          url: `/admin/deleteeditor/${id}`,
          method: "DELETE",
          credentials: "include",
        };
      },
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useSendResetMailMutation,
  useGetUserDetailsQuery,
  useResetPasswordMutation,
  //Admin
  useCreateEditorMutation,
  useDeleteEditorMutation,
} = authApi;
