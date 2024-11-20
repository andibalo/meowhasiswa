export interface IFetchThreadListQueryParams {
    limit?: number;
    cursor?: string;
    user_id?: string;
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