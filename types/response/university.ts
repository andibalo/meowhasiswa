import { IUniversityReview } from "types/model";
import { APIResponse, IPaginationMeta } from "./common";

interface IFetchUniversityReviewListData {
    university_ratings: IUniversityReview[];
    meta: IPaginationMeta;
}

export type FetchUniversityReviewListAPIResponse = APIResponse<IFetchUniversityReviewListData>;

export type FetchUniversityReviewByIDAPIResponse = APIResponse<IUniversityReview>;
