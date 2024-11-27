
import axiosInstance from "./axiosInstance";
import { AxiosResponse } from "axios";
import { ICreateUserDeviceRequest, IFetchUserDeviceQueryParams } from "types/request/user";
import { APIResponse, FetchUserDeviceAPIResponse } from "types/response";

export const getUserDevice = async (
    payload: IFetchUserDeviceQueryParams
): Promise<AxiosResponse<FetchUserDeviceAPIResponse> | undefined> => {
    try {
        const res = await axiosInstance.get<FetchUserDeviceAPIResponse>(
            "/v1/user/device",
            {
                params: {
                    notification_token: payload.notification_token
                }
            }
        );

        return res
    } catch (e) {
        console.log("Error getUserDevice : ", e)
        throw e;
    }
};

export const saveUserDevice = async (
    payload: ICreateUserDeviceRequest
): Promise<AxiosResponse<APIResponse<any>> | undefined> => {
    try {
        const res = await axiosInstance.post<APIResponse<any>>(
            `/v1/user/device/${payload.userId}`,
            {
                brand: payload.brand,
                type: payload.type,
                model: payload.model,
                notification_token: payload.notification_token,
                is_notification_active: payload.is_notification_active,
            }
        );

        return res
    } catch (e) {
        console.log("Error saveUserDevice : ", e)
        throw e;
    }
};