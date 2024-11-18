import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from './baseQuery'
import { ICreateThreadRequest, IFetchThreadListQueryParams } from 'types/request/thread'
import { APIResponse, FetchThreadByIdAPIResponse, FetchThreadListAPIResponse } from 'types/response'

export const threadsApi = createApi({
    reducerPath: "threads",
    baseQuery: baseQuery,
    tagTypes: ['Thread'],
    endpoints: (builder) => ({
        createThread: builder.mutation<APIResponse<any>, ICreateThreadRequest>({
            invalidatesTags: ['Thread'],
            query: (body) => {
                return {
                    url: "/v1/thread",
                    method: "POST",
                    body
                }
            },
        }),
        fetchThreadList: builder.query<FetchThreadListAPIResponse, IFetchThreadListQueryParams>({
            providesTags: ['Thread'],
            query: (qParams) => {

                let params: Record<string, any> = {}

                if (qParams.cursor) {
                    params.cursor = qParams.cursor
                }

                if (qParams.limit) {
                    params.limit = qParams.limit
                }

                if (qParams.username) {
                    params.username = qParams.username;
                }

                return {
                    url: "/v1/thread",
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
                    return newItems
                }

                if (currentCache.data && newItems.data) {
                    currentCache.data.threads.push(...newItems.data.threads);
                    currentCache.data.meta = newItems.data.meta
                }
            },
            // Refetch when the page arg changes
            forceRefetch({ currentArg, previousArg }) {
                return currentArg !== previousArg;
            }
        }),
        fetchThreadById: builder.query<FetchThreadByIdAPIResponse, string>({
            providesTags: (result, error, threadId) => {
                return [{ type: "Thread", id: threadId }]
            },
            query: (threadId) => {
                return {
                    url: `/v1/thread/${threadId}`,
                    method: "GET"
                }
            },
        }),
    }),
})

export const { useFetchThreadListQuery, useFetchThreadByIdQuery, useCreateThreadMutation } = threadsApi
