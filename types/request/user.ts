
export interface ICreateUserDeviceRequest {
    userId: string;
    brand: string | null;
    type: string | null;
    model: string | null;
    notification_token: string;
    is_notification_active: boolean;
}

export interface IFetchUserDeviceQueryParams {
    user_id?: string;
    notification_token?: string
}
