import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";
import { IFetchUniversityReviewListQueryParams, ICreateUniversityReviewRequest } from "types/request/university";
import { FetchUniversityReviewListAPIResponse } from "types/response/university";
import { APIResponse } from "types/response";

export const universityApi = createApi({
    reducerPath: "university",
    baseQuery: baseQuery,
    tagTypes: ["University"],
    endpoints: (builder) => ({
      createUniversityReview: builder.mutation<APIResponse<any>, ICreateUniversityReviewRequest>({
        invalidatesTags: ['University'],
        query: (body) => {
            return {
                url: `/v1/university/rate/${body.university_id}`,
                method: "POST",
                body:{
                  title:body.title,
                  content:body.content,
                  facility_rating:body.facility_rating,
                  student_organization_rating:body.student_organization_rating,
                  university_major:body.university_major,
                  social_environment_rating:body.social_environment_rating,
                  education_quality_rating:body.education_quality_rating,
                  price_to_value_rating:body.price_to_value_rating,
                  pros:body.pros,
                  cons:body.cons
                }
            }
        },
      }),
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

  export const { useFetchUniversityReviewListQuery, useCreateUniversityReviewMutation } = universityApi;
