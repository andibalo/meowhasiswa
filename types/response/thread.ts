import { IThread } from "types/model";
import { APIResponse, IPaginationMeta } from "./common";

interface IFetchThreadListData {
    threads: IThread[];
    meta: IPaginationMeta;
}

export type FetchThreadListAPIResponse = APIResponse<IFetchThreadListData>;