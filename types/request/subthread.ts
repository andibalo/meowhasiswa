export interface IFetchSubThreadListQueryParams {
    _q?: string
    limit?: number;
    cursor?: string;
    includeUniversitySubthread?: boolean
    isFollowing?: boolean
    shouldExcludeFollowing?: boolean
}

export interface ICreateSubThreadRequest {
    name: string;
    description: string;
    image_url: string;
    label_color: string;
    is_university_subthread?: boolean;
    university_id?: string
}