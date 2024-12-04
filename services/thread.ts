import { AxiosResponse } from "axios";
import { IFetchThreadListQueryParams } from "types/request/thread";
import { FetchThreadListAPIResponse } from "types/response";
import axiosInstance from "./axiosInstance";

export const fetchThreadList = async (
    payload: IFetchThreadListQueryParams
): Promise<AxiosResponse<FetchThreadListAPIResponse> | undefined> => {
    try {
        let params: Record<string, any> = {}

        if (payload.cursor) params.cursor = payload.cursor;
        if (payload.limit) params.limit = payload.limit;
        if (payload.user_id) params.user_id = payload.user_id;
        if (payload._q) params._q = payload._q;
        if (payload.isTrending) params.is_trending = payload.isTrending;
        if (payload.isUserFollowing) params.is_user_following = payload.isUserFollowing;
        if (payload.includeUserActivity) params.include_user_activity = payload.includeUserActivity;

        const res = await axiosInstance.get<FetchThreadListAPIResponse>(
            "/v1/thread",
            {
                params,
            }
        );

        return res
    } catch (e) {
        console.log("Error fetchThreadList : ", e)
        throw e;
    }
};
