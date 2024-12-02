import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './baseQuery';
import { FetchSubThreadByIdAPIResponse, FetchSubThreadListAPIResponse } from 'types/response/subthread';
import { ICreateSubThreadRequest, IFetchSubThreadListQueryParams, IFollowSubThreadRequest, IUnfollowSubThreadRequest } from 'types/request/subthread';
import { APIResponse } from 'types/response';

export const subThreadsApi = createApi({
    reducerPath: "subthreads",
    baseQuery: baseQuery,
    tagTypes: ['SubThread'],
    endpoints: (builder) => ({
        createSubThread: builder.mutation<APIResponse<any>, ICreateSubThreadRequest>({
            invalidatesTags: ['SubThread'],
            query: (body) => {
                return {
                    url: "/v1/subthread",
                    method: "POST",
                    body
                }
            },
        }),
        fetchSubThreadList: builder.query<FetchSubThreadListAPIResponse, IFetchSubThreadListQueryParams>({
            providesTags: ['SubThread'],
            query: (qParams) => {
                let params: Record<string, any> = {}

                if (qParams.cursor) params.cursor = qParams.cursor;
                if (qParams.limit) params.limit = qParams.limit;
                if (qParams._q) params._q = qParams._q;
                if (qParams.isFollowing) params.is_following = qParams.isFollowing;
                if (qParams.includeUniversitySubthread) params.include_university_subthread = qParams.includeUniversitySubthread;
                if (qParams.shouldExcludeFollowing) params.should_exclude_following = qParams.shouldExcludeFollowing;

                return {
                    url: "/v1/subthread",
                    params,
                    method: "GET"
                }
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
                    currentCache.data.subthreads.push(...newItems.data.subthreads);
                    currentCache.data.meta = newItems.data.meta;
                }
            },
            // Refetch when the page arg changes
            forceRefetch({ currentArg, previousArg }) {
                return currentArg !== previousArg;
            }
        }),
        fetchSubThreadById: builder.query<FetchSubThreadByIdAPIResponse, string>({
            providesTags: (result, error, subThreadId) => {
                return [{ type: "SubThread", id: subThreadId }];
            },
            query: (subThreadId) => {
                return {
                    url: `/v1/subthread/${subThreadId}`,
                    method: "GET"
                };
            },
        }),
        followSubThread: builder.mutation<APIResponse<any>, IFollowSubThreadRequest>({
            invalidatesTags: ['SubThread'],
            query: (body) => {
                return {
                    url: "/v1/subthread/follow",
                    method: "POST",
                    body
                }
            },
        }),
        unFollowSubThread: builder.mutation<APIResponse<any>, IUnfollowSubThreadRequest>({
            invalidatesTags: ['SubThread'],
            query: (body) => {
                return {
                    url: "/v1/subthread/unfollow",
                    method: "PATCH",
                    body
                }
            },
        }),
    }),
});

export const { useFetchSubThreadListQuery, useFetchSubThreadByIdQuery, useCreateSubThreadMutation, useFollowSubThreadMutation, useUnFollowSubThreadMutation } = subThreadsApi;