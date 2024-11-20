export interface IFetchReviewListQueryParams {
    limit?: number;   
    cursor?: string;  
}

export interface ICreateReviewRequest {
    title: string;
    content: string;
    university_major: string;
    facility_rating: number;
    pros: string[]; 
    cons: string[];
}