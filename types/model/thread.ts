export interface IThread {
    id: string;
    user_id: string;
    username: string;
    university_abbreviated_name: string;
    university_image_url: string;
    subthread_id: string;
    subthread_name: string;
    subthread_color: string;
    title: string;
    content: string;
    content_summary: string;
    is_active: boolean;
    like_count: number;
    dislike_count: number;
    comment_count: number;
    created_by: string;
    created_at: string;
    updated_by: string | null;
    updated_at: string | null;
}