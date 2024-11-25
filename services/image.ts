
import axiosInstance from "./axiosInstance";
import { AxiosResponse } from "axios";
import { IUploadImageRequest } from "types/request/image";
import { UploadImageAPIResponse } from "types/response";

export const uploadImage = async (
    payload: IUploadImageRequest
): Promise<AxiosResponse<UploadImageAPIResponse> | undefined> => {

    const formData = new FormData();

    formData.append('image', {
        uri: payload.uri,
        name: payload.fileName,
        type: payload.type,
    } as any);

    try {
        const res = await axiosInstance.post<UploadImageAPIResponse>(
            "/v1/image/upload",
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFuZGkudXNtYW5Ac3R1ZGVudC51bW4uYWMuaWQiLCJpZCI6ImYzY2I4NTM1LTk5NzctNGExYy04NzRhLTJjMGUxYmVkNTAzZCIsInJvbGUiOiJVU0VSIiwidXNlcm5hbWUiOiJpbmNvbnNpc3RlbmNlIn0.3nfOIkVqTJTHbv_6VG1zOG6n3SAk9QIq5U49GOx7mLw"
                },
            }
        );

        return res
    } catch (e) {
        console.log("Error uploadImage : ", e)
        throw e;
    }
};