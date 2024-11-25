import { ISubThread } from "types/model";
import { APIResponse, IPaginationMeta } from "./common";

interface IFetchSubThreadListData {
    subthreads: ISubThread[];
    meta: IPaginationMeta;
}

export type FetchSubThreadListAPIResponse = APIResponse<IFetchSubThreadListData>;

interface IFetchSubThreadByIdData {
    subthread: ISubThread;
}

export type FetchSubThreadByIdAPIResponse = APIResponse<IFetchSubThreadByIdData>;
