import { IUniversity } from "./university";

export interface IUser {
    id: string;
    username: string;
    email: string;
    role: "USER" | "ADMIN";
    university_id?: string;
    university?: IUniversity;
    is_banned: boolean;
    is_email_verified: boolean;
    has_rate_university: boolean;
    reputation_points: number;
    created_by: string;
    created_at: string;
    updated_by: string | null;
    updated_at: string | null;
}

export interface IUserDevice {
    id: string;
    user_id: string;
    brand: string;
    type: string;
    model: string;
    notification_token: string;
    is_notification_active: boolean;
    created_by: string;
    created_at: string;
    updated_by: string | null;
    updated_at: string | null;
}