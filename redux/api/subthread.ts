import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './baseQuery';
import { ICreateThreadRequest } from 'types/request/thread';
import { APIResponse } from 'types/response';
import { FetchSubThreadListAPIResponse } from 'types/response/subthread';
import { IFetchSubThreadListQueryParams } from 'types/request/subthread';

export const subThreadsApi = createApi({
    reducerPath: "subthreads",
    baseQuery: baseQuery,
    tagTypes: ['SubThread'],
    endpoints: (builder) => ({
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
    }),
});

export const { useFetchSubThreadListQuery } = subThreadsApi;