import { IReview } from "types/model";
import { APIResponse, IPaginationMeta } from "./common";

interface IFetchUniversityReviewListData {
    university_ratings: IReview[];
    meta: IPaginationMeta;
}

export type FetchUniversityReviewListAPIResponse = APIResponse<IFetchUniversityReviewListData>;
