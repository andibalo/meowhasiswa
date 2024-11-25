import { APIResponse } from "./common";

interface IUploadImageData {
    URL: string;
    Name: string;
    ETag: string;
    VersionID: string;
    MegaBytes: number;
    ContentType: string;
    Tags: string;
    Bucket: string;
}

export type UploadImageAPIResponse = APIResponse<IUploadImageData>;