export interface IFetchUniversityReviewListQueryParams {
    limit?: number;   
    cursor?: string;  
}

export interface ICreateUniversityReviewRequest {
    title: string;
    content: string;
    university_major: string;
    facility_rating: number;
    pros: string[]; 
    cons: string[];
}