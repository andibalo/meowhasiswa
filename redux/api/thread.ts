import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from './baseQuery'
import { IFetchThreadListQueryParams } from 'types/request/thread'
import { FetchThreadListAPIResponse } from 'types/response'

export const threadsApi = createApi({
    reducerPath: "threads",
    baseQuery: baseQuery,
    endpoints: (builder) => ({
        fetchThreadList: builder.query<FetchThreadListAPIResponse, IFetchThreadListQueryParams>({
            query: (qParams) => {

                let params: Record<string, any> = {}

                if (qParams.cursor) {
                    params.cursor = qParams.cursor
                }

                if (qParams.limit) {
                    params.limit = qParams.limit
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
            merge: (currentCache, newItems) => {
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
    }),
})

export const { useFetchThreadListQuery } = threadsApi