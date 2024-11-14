import { FlatList } from 'react-native';
import { ReviewItem } from './ReviewItem';

export function ReviewList({
  ListHeaderComponent,
  contentContainerStyle,
  showsVerticalScrollIndicator,
  data,
}) {
  return (
    <FlatList
        data={data}
        renderItem={({ item }) => (
            <ReviewItem review={item} rating={item.rating || 4.5} />
        )}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={ListHeaderComponent}
        contentContainerStyle={contentContainerStyle}
        showsVerticalScrollIndicator={showsVerticalScrollIndicator}
    />
  );
}
