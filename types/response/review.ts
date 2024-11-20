import { IReview } from "types/model";
import { APIResponse, IPaginationMeta } from "./common";

interface IFetchReviewListData {
    university_ratings: IReview[];
    meta: IPaginationMeta;
}

export type FetchReviewListAPIResponse = APIResponse<IFetchReviewListData>;
