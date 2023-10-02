import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const articleApi = createApi({
  reducerPath: "articleApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://hpuejournal.onrender.com/api/v1" }),
  endpoints: (builder) => ({
    //Published Articles
    getPublishedArticles: builder.query({
      query: () => "/articles/published",
    }),

    //All Volumes
    getAllVolumes: builder.query({
      query: () => "/volumes/all",
    }),

    //Articles for a Issue
    getArticlesForIssue: builder.query({
      query: (data) =>
        `/articles/volume/${data.volumeNumber}/${data.issueNumber}`,
    }),

    //List of editors
    getEditors: builder.query({
      query: () => "/articles/editors",
    }),

    submitArticle: builder.mutation({
      query: (data) => {
        return {
          method: "POST",
          url: "/articles/submit",
          body: data,
          credentials: "include",
        };
      },
    }),
    getArticleProgress: builder.mutation({
      query: (data) => {
        return {
          method: "POST",
          url: `/articles/track`,
          body: data,
          credentials: "include",
        };
      },
    }),
    //Admin
    //Get Submitted Articles
    getSubmittedArticles: builder.query({
      query: () => {
        return {
          url: "/articles/admin/submitted",
          credentials: "include",
        };
      },
    }),
    getReadyToPublishArticles: builder.query({
      query: () => {
        return {
          url: "/articles/admin/readytopublish",
          credentials: "include",
        };
      },
    }),
    assignArticle: builder.mutation({
      query: (data) => {
        return {
          url: `/articles/admin/assigneditor/${data.articleId}/${data.editorId}`,
          method: "POST",
          credentials: "include",
        };
      },
    }),
    publishArticle: builder.mutation({
      query: (id) => {
        return {
          url: `/articles/admin/publisharticle/${id}`,
          method: "PUT",
          credentials: "include",
        };
      },
    }),

    //Editor
    getAssignedArticles: builder.query({
      query: () => {
        return {
          url: "/articles/editor/assigned",
          credentials: "include",
        };
      },
    }),
    sendArticleToAdmin: builder.mutation({
      query: (id) => {
        return {
          method: "PUT",
          url: `articles/editor/sendtopublish/${id}`,
          credentials: "include",
        };
      },
    }),
    sendForResubmission: builder.mutation({
      query: (data) => {
        return {
          method: "PUT",
          url: `articles/editor/resubmission/${data.id}`,
          body: data,
          credentials: "include",
        };
      },
    }),

    //anouncements
    createAnnouncement: builder.mutation({
      query: (data) => {
        return {
          method: "POST",
          url: "/announcements/admin/create",
          body: data,
          credentials: "include",
        };
      },
    }),
    deleteAnnouncement: builder.mutation({
      query: (id) => {
        return {
          method: "DELETE",
          url: `/announcements/admin/delete/${id}`,
          credentials: "include",
        };
      },
    }),
    getAnnouncement: builder.query({
      query: () => "/announcements/all",
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetPublishedArticlesQuery,
  useGetAllVolumesQuery,
  useGetArticlesForIssueQuery,
  useGetEditorsQuery,
  useSubmitArticleMutation,
  useGetArticleProgressMutation,
  //Admin
  useGetSubmittedArticlesQuery,
  useGetReadyToPublishArticlesQuery,
  useAssignArticleMutation,
  usePublishArticleMutation,
  //Editor
  useGetAssignedArticlesQuery,
  useSendArticleToAdminMutation,
  useSendForResubmissionMutation,
  //Announcements
  useCreateAnnouncementMutation,
  useDeleteAnnouncementMutation,
  useGetAnnouncementQuery,
} = articleApi;
