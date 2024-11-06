import { ReviewItem } from './ReviewItem';
import { FlatList } from 'react-native';


export const ReviewList = () => {

    const testData = ['1', '2', '3', '4', '5']

    const renderPost = ({ item }) => (
        <ReviewItem />
    );

    return (
        <FlatList
            data={testData}
            renderItem={renderPost}
            keyExtractor={(item, index) => `review-uni-${index}`}
            onEndReachedThreshold={0.5}
            scrollEventThrottle={16}
            showsVerticalScrollIndicator={false}
        />
    )
}