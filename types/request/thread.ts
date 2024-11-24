export interface IFetchThreadListQueryParams {
    limit?: number;
    cursor?: string;
    user_id?: string;
    _q?: string
    isTrending?: boolean
    isUserFollowing?: boolean
}

export interface ICreateThreadRequest {
    subthread_id: string;
    title: string;
    content: string;
    content_summary: string;
}

export interface IPostCommentRequest {
    threadId: string;
    content: string;
}

export interface ILikeThreadRequest {
    threadId: string;
    like_count: number;
}

export interface IDislikeThreadRequest {
    threadId: string;
    dislike_count: number;
}