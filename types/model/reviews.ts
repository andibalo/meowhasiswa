export interface IReview {
    id: number;
    universityName: string;
    timeAgo: string;
    department: string;
    title: string;
    body: string;
    pros: string[];
    cons: string[];
    rating: number;
}
  