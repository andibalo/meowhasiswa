export interface IUniversity {
    id: string;
    name: string;
    abbreviated_name: string;
    image_url: string;
    created_by: string;
    created_at: string;
    updated_by: string | null;
    updated_at: string | null;    
}

export interface IUniversityReview {
    id: string;
    user_id: string;
    username: string;
    university_id: string;
    university_abbreviated_name: string;
    university_image_url: string;
    title: string;
    content: string;
    university_major: string;
    facility_rating: number;
    student_organization_rating: number;
    social_environment_rating: number;
    education_quality_rating: number;
    price_to_value_rating: number;
    overall_rating: number;
    pros: string[]; 
    cons: string[]; 
    created_by: string;
    created_at: string;
    updated_by?: string | null; 
    updated_at?: string | null; 
}

export interface IUniversityReviewItem {
    id: string;
    university_image_url: string;
    university_abbreviated_name: string;
    created_at: string;
    university_major: string;
    title: string;
    content: string;
    pros: string[]; 
    cons: string[];
    overall_rating: number;
}

  