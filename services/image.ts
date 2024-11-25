
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
                    "Content-Type": "multipart/form-data"
                },
            }
        );

        return res
    } catch (e) {
        console.log("Error uploadImage : ", e)
        throw e;
    }
};