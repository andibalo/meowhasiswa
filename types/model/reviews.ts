export interface IReview {
    id: number;
    universityName: string;
    created_at: string;
    department: string;
    title: string;
    body: string;
    pros: string[];
    cons: string[];
    rating: number;
}
  