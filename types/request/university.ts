export interface IFetchUniversityReviewListQueryParams {
    limit?: number;   
    cursor?: string;  
    _q?: string
}

export interface ICreateUniversityReviewRequest {
    title: string;
    content: string;
    university_id: string;
    facility_rating: number;
    student_organization_rating: number;
    university_major: string;
    social_environment_rating: number;
    education_quality_rating: number;
    price_to_value_rating: number;
    pros: string[]; 
    cons: string[];
}