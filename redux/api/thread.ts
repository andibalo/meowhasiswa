import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './baseQuery';
import { ICreateThreadRequest, IDislikeCommentRequest, IFetchThreadListQueryParams, ILikeCommentRequest, IPostCommentRequest, IReplyCommentRequest, IUpdateThreadRequest } from 'types/request/thread';
import { APIResponse, FetchThreadByIdAPIResponse, FetchThreadCommentsAPIResponse, FetchThreadListAPIResponse } from 'types/response';

export const threadsApi = createApi({
    reducerPath: "threads",
    baseQuery: baseQuery,
    tagTypes: ['Thread', "Comment"],
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
                if (qParams.includeUserActivity) params.include_user_activity = qParams.includeUserActivity;

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
        fetchThreadComments: builder.query<FetchThreadCommentsAPIResponse, string>({
            providesTags: (result, error, threadId) => {
                return [{ type: "Comment", id: threadId }];
            },
            query: (threadId) => {

                return {
                    url: `/v1/thread/comment/${threadId}`,
                    method: "GET"
                }
            },
        }),
        postComment: builder.mutation<APIResponse<any>, IPostCommentRequest>({
            invalidatesTags: (result, error, { threadId }) => [{ type: "Thread" }, { type: "Comment", id: threadId }],
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
            invalidatesTags: (result, error, threadId) => {
                return [{ type: "Thread", id: threadId }];
            },
            query: (threadId) => {
                return {
                    url: `/v1/thread/like/${threadId}`,
                    method: "PATCH"
                };
            }
        }),
        dislikeThread: builder.mutation<APIResponse<any>, string>({
            invalidatesTags: (result, error, threadId) => {
                return [{ type: "Thread", id: threadId }];
            },
            query: (threadId) => {
                return {
                    url: `/v1/thread/dislike/${threadId}`,
                    method: "PATCH"
                };
            }
        }),
        likeComment: builder.mutation<APIResponse<any>, ILikeCommentRequest>({
            invalidatesTags: (result, error, req) => [{ type: "Comment", id: req.threadId }],
            query: (req) => {
                return {
                    url: `/v1/thread/comment/like/${req.commentId}`,
                    body: {
                        thread_id: req.threadId,
                        is_reply: req.isReply
                    },
                    method: "PATCH"
                };
            }
        }),
        dislikeComment: builder.mutation<APIResponse<any>, IDislikeCommentRequest>({
            invalidatesTags: (result, error, req) => [{ type: "Comment", id: req.threadId }],
            query: (req) => {
                return {
                    url: `/v1/thread/comment/dislike/${req.commentId}`,
                    body: {
                        thread_id: req.threadId,
                        is_reply: req.isReply
                    },
                    method: "PATCH"
                };
            }
        }),
       replyComment: builder.mutation<APIResponse<any>, IReplyCommentRequest>({
            invalidatesTags: (result, error, req) => [{ type: "Comment", id: req.threadId }],
            query: (req) => {
                return {
                    url: `/v1/thread/comment/reply/${req.commentId}`,
                    body: {
                        thread_id: req.threadId,
                        content: req.content
                    },
                    method: "POST"
                };
            }
        }),
    }),
});

export const {
    useFetchThreadListQuery,
    useFetchThreadByIdQuery,
    useFetchThreadCommentsQuery,
    useCreateThreadMutation,
    usePostCommentMutation,
    useDeleteThreadMutation,
    useUpdateThreadMutation,
    useLikeThreadMutation,
    useDislikeThreadMutation,
    useDislikeCommentMutation,
    useLikeCommentMutation,
    useReplyCommentMutation
} = threadsApi;