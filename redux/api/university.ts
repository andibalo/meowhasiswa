import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";
import { IFetchUniversityReviewListQueryParams } from "types/request/university";
import { FetchUniversityReviewListAPIResponse } from "types/response/university";

export const universityApi = createApi({
    reducerPath: "university",
    baseQuery: baseQuery,
    tagTypes: ["University"],
    endpoints: (builder) => ({
      fetchUniversityReviewList: builder.query<FetchUniversityReviewListAPIResponse, IFetchUniversityReviewListQueryParams>({
        providesTags: ["University"],
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

  export const { useFetchUniversityReviewListQuery } = universityApi;
