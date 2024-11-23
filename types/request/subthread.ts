export interface IFetchSubThreadListQueryParams {
    _q?: string
    limit?: number;
    cursor?: string;
    includeUniversitySubthread?: boolean
    isFollowing?: boolean
    shouldExcludeFollowing?: boolean
}
