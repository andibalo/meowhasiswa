export interface ISubThread {
    id: string;
    name: string;
    followers_count: string;
    description: string;
    image_url: string;
    label_color: string;
    university_id: string | null;
    is_university_subthread: string,
    created_by: string;
    created_at: string;
    updated_by: string | null;
    updated_at: string | null;
}

export interface ISubThreadItem {
    id: string;
    name: string;
    imageUrl: string;
    followersCount: number
}