import { FlatList } from 'react-native';
import { ReviewItem } from './ReviewItem';
import { IReview } from '../../types/model';

type ReviewListProps = {
  ListHeaderComponent: React.ComponentType | null;
  contentContainerStyle?: object;
  showsVerticalScrollIndicator?: boolean;
};

export function ReviewList({
  ListHeaderComponent,
  contentContainerStyle,
  showsVerticalScrollIndicator = false, // Default is false to hide scroll bar
}: ReviewListProps) {
  // Sample reviews data moved into ReviewList with updated `created_at`
  const data: IReview[] = [
    {
      id: 1,
      "university_image_url": "https://registrasi.untar.ac.id/assets/images/logo_untar.png",
      universityName: 'UMN',
      created_at: "2024-11-09T20:16:52.744793Z",
      department: 'Informatika',
      title: 'Nice',
      body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      pros: ['Lorem dawdawdaw', 'Ipsum dawdawdaw'],
      cons: ['Lorem dawdawdaw', 'Ipsum dawdawdaw'],
      rating: 4.5,
    },
    {
      id: 2,
      "university_image_url": "https://registrasi.untar.ac.id/assets/images/logo_untar.png",
      universityName: 'UBM',
      created_at: "2024-11-09T19:33:28.384301Z",
      department: 'Akuntansi',
      title: 'Overall good',
      body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      pros: ['Lorem dawdawdaw', 'Ipsum dawdawdaw'],
      cons: ['Lorem dawdawdaw', 'Ipsum dawdawdaw'],
      rating: 4,
    },
    // Add more reviews here as needed
  ];

  return (
    <FlatList
      data={data} // Data is now managed inside ReviewList
      renderItem={({ item }) => (
        <ReviewItem review={item} rating={item.rating || 4.5} />
      )}
      keyExtractor={(item) => item.id.toString()}
      ListHeaderComponent={ListHeaderComponent}
      contentContainerStyle={contentContainerStyle}
      showsVerticalScrollIndicator={false}
    />
  );
}