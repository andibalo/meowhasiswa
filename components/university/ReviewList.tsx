import { FlatList } from 'react-native';
import { ReviewItem } from './ReviewItem';
import { IReview } from '../../types/model';

interface IReviewListProps {
  data: IReview[]; // Corrected the prop name to match the usual plural form
  ListHeaderComponent?: React.ComponentType | null; // Made optional for flexibility
  contentContainerStyle?: object;
  showsVerticalScrollIndicator?: boolean;
}

export function ReviewList({
  data,
  ListHeaderComponent,
  contentContainerStyle,
  showsVerticalScrollIndicator = false, // Default is false to hide scroll bar
}: IReviewListProps) {
  // Sample reviews data moved into ReviewList with updated created_at
  const testData: IReview[] = [
    {
      id: "e0b2e510-0492-479c-abb4-f1c9a044806a",
      user_id: "user123",
      username: "JohnDoe",
      university_id: "university123",
      university_image_url: "https://registrasi.untar.ac.id/assets/images/logo_untar.png",
      university_abbreviated_name: 'UMN',
      created_at: "2024-11-09T20:16:52.744793Z",
      created_by: "admin123", // Added created_by
      university_major: 'Informatika',
      title: 'Nice',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      pros: ['Lorem dawdawdaw', 'Ipsum dawdawdaw'],
      cons: ['Lorem dawdawdaw', 'Ipsum dawdawdaw'],
      overall_rating: 4.5,
      facility_rating: 4.0,
      student_organization_rating: 4.2,
      social_environment_rating: 4.8,
      education_quality_rating: 4.7,
      price_to_value_rating: 4.3,
    },
    {
      id: "f943486f-f534-49a6-8d5d-0b456b226f18",
      user_id: "user456",
      username: "JaneSmith",
      university_id: "university456",
      university_image_url: "https://registrasi.untar.ac.id/assets/images/logo_untar.png",
      university_abbreviated_name: 'UBM',
      created_at: "2024-11-09T19:33:28.384301Z",
      created_by: "admin456", // Added created_by
      university_major: 'Akuntansi',
      title: 'Overall good',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      pros: ['Lorem dawdawdaw', 'Ipsum dawdawdaw'],
      cons: ['Lorem dawdawdaw', 'Ipsum dawdawdaw'],
      overall_rating: 4.0,
      facility_rating: 3.8,
      student_organization_rating: 4.0,
      social_environment_rating: 4.1,
      education_quality_rating: 4.2,
      price_to_value_rating: 3.9,
    },
  ];

  // Combine testData with passed reviews for demonstration
  const combinedReviews = [...testData, ...data];

  return (
    <FlatList
      data={combinedReviews} // Use combined reviews
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={ListHeaderComponent}
      contentContainerStyle={contentContainerStyle}
      showsVerticalScrollIndicator={showsVerticalScrollIndicator} // Dynamic value from props
    />
  );
}
