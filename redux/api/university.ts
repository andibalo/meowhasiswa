import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";
import { IFetchUniversityReviewListQueryParams, ICreateUniversityReviewRequest, IUpdateUniversityReviewRequest } from "types/request/university";
import { FetchUniversityReviewByIDAPIResponse, FetchUniversityReviewListAPIResponse } from "types/response/university";
import { APIResponse } from "types/response";
import { userApi } from './user'

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
          body: {
            title: body.title,
            content: body.content,
            facility_rating: body.facility_rating,
            student_organization_rating: body.student_organization_rating,
            university_major: body.university_major,
            social_environment_rating: body.social_environment_rating,
            education_quality_rating: body.education_quality_rating,
            price_to_value_rating: body.price_to_value_rating,
            pros: body.pros,
            cons: body.cons
          }
        }
      },
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;

          dispatch(userApi.util.invalidateTags(['User']));
        } catch (error) {
          console.error('Error updating resource:', error);
        }
      },
    }),
    editUniversityReview: builder.mutation<APIResponse<any>, IUpdateUniversityReviewRequest>({
      invalidatesTags: (result, error, req) => {
        return [{ type: "University", id: req.university_review_id }];
      },
      query: (req) => {
        return {
          url: `/v1/university/rating/${req.university_review_id}`,
          method: "PATCH",
          body: {
            university_id: req.university_id,
            title: req.title,
            content: req.content,
            facility_rating: req.facility_rating,
            student_organization_rating: req.student_organization_rating,
            university_major: req.university_major,
            social_environment_rating: req.social_environment_rating,
            education_quality_rating: req.education_quality_rating,
            price_to_value_rating: req.price_to_value_rating,
            pros: req.pros,
            cons: req.cons
          }
        }
      },
    }),
    fetchUniversityReviewList: builder.query<FetchUniversityReviewListAPIResponse, IFetchUniversityReviewListQueryParams>({
      providesTags: ["University"],
      query: (qParams) => {
        let params: Record<string, any> = {};

        if (qParams.cursor) params.cursor = qParams.cursor;
        if (qParams.limit) params.limit = qParams.limit;
        if (qParams._q) params._q = qParams._q;

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
    }),
    fetchUniversityReviewById: builder.query<FetchUniversityReviewByIDAPIResponse, string>({
      providesTags: (result, error, uniReviewId) => {
        return [{ type: "University", id: uniReviewId }];
      },
      query: (uniReviewId) => {
        return {
          url: `/v1/university/rating/${uniReviewId}`,
          method: "GET"
        };
      },
    }),
  }),
});

export const {
  useFetchUniversityReviewListQuery,
  useCreateUniversityReviewMutation,
  useFetchUniversityReviewByIdQuery,
  useEditUniversityReviewMutation
} = universityApi;
