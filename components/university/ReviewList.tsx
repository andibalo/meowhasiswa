import { FlatList } from 'react-native';
import { ReviewItem } from './ReviewItem';
import { IUniversityReview } from '../../types/model';
import { View } from 'tamagui';

interface IUniversityReviewListProps {
  data: IUniversityReview[];
  contentContainerStyle?: object;
  showsVerticalScrollIndicator?: boolean;
}

export function ReviewList({
  data,
  contentContainerStyle,
  showsVerticalScrollIndicator = false,
}: IUniversityReviewListProps) {

  const renderUniversityReview = ({ item }: { item: IUniversityReview }) => (
    <View>
      <ReviewItem review={item} />
      <View my="$2" />
    </View>
  );

  return (
    <FlatList
      data={data}
      renderItem={renderUniversityReview}
      keyExtractor={(item) => item.id}
      contentContainerStyle={contentContainerStyle}
      showsVerticalScrollIndicator={showsVerticalScrollIndicator}
    />
  );
}
