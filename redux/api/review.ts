import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";
import { IFetchReviewListQueryParams } from "types/request/review";
import { FetchReviewListAPIResponse } from "types/response/review";

export const reviewApi = createApi({
    reducerPath: "university_ratings",
    baseQuery: baseQuery,
    tagTypes: ["Review"],
    endpoints: (builder) => ({
      fetchReviewList: builder.query<FetchReviewListAPIResponse, IFetchReviewListQueryParams>({
        providesTags: ["Review"],
        query: (qParams) => {
          let params: Record<string, any> = {};

          if (qParams.cursor) {
            params.cursor = qParams.cursor;
          }

          if (qParams.limit) {
            params.limit = qParams.limit;
          }

          return {
            url: "/v1/university/ratings",
            params,
            method: "GET",
          };
        },

        // Only have one cache entry because the arg always maps to one string
        serializeQueryArgs: ({ endpointName }) => {
          return endpointName;
        },

        // Always merge incoming data to the cache entry
        merge: (currentCache, newItems, { arg }) => {
          if (arg.cursor === "") {
            return newItems;
          }

          if (currentCache.data && newItems.data) {
            currentCache.data.university_ratings.push(...newItems.data.university_ratings);
            currentCache.data.meta = newItems.data.meta;
          }
        },

        // Refetch when the page arg changes
        forceRefetch({ currentArg, previousArg }) {
          return currentArg !== previousArg;
        },
      }),
    }),
  });

  export const { useFetchReviewListQuery } = reviewApi;
