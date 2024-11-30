import { FlatList, RefreshControl } from 'react-native';
import { ReviewItem } from './ReviewItem';
import { IUniversityReview } from '../../types/model';
import { Spinner, View } from 'tamagui';

interface IUniversityReviewListProps {
  data: IUniversityReview[];
  handleLoadMore: () => void
  isLoadingMore: boolean
  onRefresh: () => void
  isRefreshing?: boolean
}

const renderFooterLoading = (loadingMore: boolean) => {
  if (!loadingMore) {
      return null;
  }

  return <Spinner size="large" color="$primary" mb="$3" />;
};

export function ReviewList({
  data,
  handleLoadMore,
  isLoadingMore,
  onRefresh,
  isRefreshing
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
      onEndReachedThreshold={0.5}
      scrollEventThrottle={16}
      showsVerticalScrollIndicator={false}
      onEndReached={handleLoadMore}
      ListFooterComponent={renderFooterLoading(isLoadingMore)}
      refreshControl={
          <RefreshControl
              refreshing={!!isRefreshing}
              onRefresh={onRefresh}
          />
      }
    />
  );
}
