import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './baseQuery';
import { ICreateThreadRequest, IFetchThreadListQueryParams, IPostCommentRequest, IUpdateThreadRequest } from 'types/request/thread';
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
                if (qParams._q) params._q = qParams._q;
                if (qParams.isTrending) params.is_trending = qParams.isTrending;
                if (qParams.isUserFollowing) params.is_user_following = qParams.isUserFollowing;

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
                    return newItems;
                }
                if (currentCache.data && newItems.data) {
                    currentCache.data.threads.push(...newItems.data.threads);
                    currentCache.data.meta = newItems.data.meta;
                }
            },
            // Refetch when the page arg changes
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
        deleteThread: builder.mutation<APIResponse<any>, string>({
            invalidatesTags: ['Thread'],
            query: (threadId) => ({
                url: `/v1/thread/${threadId}`,
                method: "DELETE",
            }),
        }),
        updateThread: builder.mutation<APIResponse<any>, { threadId: string, updatedData: IUpdateThreadRequest }>({
            invalidatesTags: ['Thread'],
            query: ({ threadId, updatedData }) => {
                return {
                    url: `/v1/thread/${threadId}`,
                    method: "PATCH",
                    body: updatedData
                };
            }
        }),
        likeThread: builder.mutation<APIResponse<any>, string>({
            invalidatesTags: ['Thread'],
            query: (threadId) => {
                return {
                    url: `/v1/thread/like/${threadId}`,
                    method: "PATCH"
                };
            }
        }),
        dislikeThread: builder.mutation<APIResponse<any>, string>({
            invalidatesTags: ['Thread'],
            query: (threadId) => {
                return {
                    url: `/v1/thread/dislike/${threadId}`,
                    method: "PATCH"
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
    useLikeThreadMutation,
    useDislikeThreadMutation,
} = threadsApi;