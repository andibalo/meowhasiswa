import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './baseQuery';
import { ICreateThreadRequest, IFetchThreadListQueryParams, IPostCommentRequest } from 'types/request/thread';
import { APIResponse, FetchThreadByIdAPIResponse, FetchThreadListAPIResponse } from 'types/response';

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
                if (qParams.cursor) params.cursor = qParams.cursor;
                if (qParams.limit) params.limit = qParams.limit;
                if (qParams.user_id) params.user_id = qParams.user_id;
                return {
                    url: "/v1/thread",
                    params,
                    method: "GET"
                }
            },
            serializeQueryArgs: ({ endpointName }) => {
                return endpointName;
            },
            merge: (currentCache, newItems, { arg }) => {
                if (arg.cursor === "") {
                    return newItems;
                }
                if (currentCache.data && newItems.data) {
                    currentCache.data.threads.push(...newItems.data.threads);
                    currentCache.data.meta = newItems.data.meta;
                }
            },
            forceRefetch({ currentArg, previousArg }) {
                return currentArg !== previousArg;
            }
        }),
        fetchThreadById: builder.query<FetchThreadByIdAPIResponse, string>({
            providesTags: (result, error, threadId) => {
                return [{ type: "Thread", id: threadId }];
            },
            query: (threadId) => {
                return {
                    url: `/v1/thread/${threadId}`,
                    method: "GET"
                };
            },
        }),
        postComment: builder.mutation<APIResponse<any>, IPostCommentRequest>({
            invalidatesTags: (result, error, { threadId }) => [{ type: 'Thread', id: threadId }],
            query: ({ threadId, content }) => {
                return {
                    url: `/v1/thread/comment/${threadId}`,
                    method: "POST",
                    body: { content }
                };
            }
        }),
        deleteThread: builder.mutation<APIResponse<{ success: boolean }>, string>({
            invalidatesTags: (result, error, threadId) => [{ type: 'Thread', id: threadId }],
            query: (threadId) => ({
                url: `/v1/thread/${threadId}`,
                method: "DELETE",
            }),
        }),
        updateThread: builder.mutation<APIResponse<any>, { threadId: string, updatedData: ICreateThreadRequest }>({
            invalidatesTags: (result, error, { threadId }) => [{ type: 'Thread', id: threadId }],
            query: ({ threadId, updatedData }) => {
                return {
                    url: `/v1/thread/${threadId}`,
                    method: "PATCH",
                    body: updatedData
                };
            }
        }),
    }),
});

export const { 
    useFetchThreadListQuery, 
    useFetchThreadByIdQuery, 
    useCreateThreadMutation, 
    usePostCommentMutation,
    useDeleteThreadMutation,
    useUpdateThreadMutation,
} = threadsApi;