export interface IFetchThreadListQueryParams {
    limit?: number;
    cursor?: string;
    username?: string;
}

export interface ICreateThreadRequest {
    subthread_id: string;
    title: string;
    content: string;
    content_summary: string;
}