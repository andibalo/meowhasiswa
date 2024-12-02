export interface IFetchThreadListQueryParams {
    limit?: number;
    cursor?: string;
    user_id?: string;
    _q?: string
    isTrending?: boolean
    isUserFollowing?: boolean
    includeUserActivity?: boolean
}

export interface ICreateThreadRequest {
    subthread_id: string;
    title: string;
    content: string;
    content_summary: string;
}

export interface IUpdateThreadRequest {
    title: string;
    content: string;
    content_summary: string;
}

export interface IPostCommentRequest {
    threadId: string;
    content: string;
}

export interface ILikeCommentRequest {
    commentId: string;
    threadId: string;
    isReply: boolean;
}

export interface IDislikeCommentRequest {
    commentId: string;
    threadId: string;
    isReply: boolean;
}

export interface IReplyCommentRequest {
    commentId: string;
    threadId: string;
    content: string;
}