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

export interface IFollowSubThreadRequest {
    subthread_id: string;
    user_id: string;
}

export interface IUnfollowSubThreadRequest {
    subthread_id: string;
    user_id: string;
}

export interface IUpdateSubThreadRequest {
    name: string;
    description: string;
    image_url: string;
    label_color: string;
    is_university_subthread?: boolean;
    university_id?: string
}