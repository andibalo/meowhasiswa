import { AxiosResponse } from "axios";
import { IFetchSubThreadListQueryParams } from "types/request/subthread";
import { FetchSubThreadListAPIResponse } from "types/response/subthread";
import axiosInstance from "./axiosInstance";

export const fetchSubThreadList = async (
    payload: IFetchSubThreadListQueryParams
): Promise<AxiosResponse<FetchSubThreadListAPIResponse> | undefined> => {
    try {
        let params: Record<string, any> = {}

        if (payload.cursor) params.cursor = payload.cursor;
        if (payload.limit) params.limit = payload.limit;
        if (payload._q) params._q = payload._q;
        if (payload.isFollowing) params.is_following = payload.isFollowing;
        if (payload.includeUniversitySubthread) params.include_university_subthread = payload.includeUniversitySubthread;
        if (payload.shouldExcludeFollowing) params.should_exclude_following = payload.shouldExcludeFollowing;

        const res = await axiosInstance.get<FetchSubThreadListAPIResponse>(
            "/v1/subthread",
            {
                params,
            }
        );

        return res
    } catch (e) {
        console.log("Error fetchSubThreadList : ", e)
        throw e;
    }
};
