import { ThreadItem } from './ThreadItem';
import { FlatList } from 'react-native';


export const ThreadList = () => {

    const testData = ['1', '2', '3', '4', '5']

    const renderPost = ({ item }) => (
        <ThreadItem post={item} />
    );

    return (
        <FlatList
            data={testData}
            renderItem={renderPost}
            keyExtractor={(item, index) => `thread-${index}`}
            onEndReachedThreshold={0.5}
            scrollEventThrottle={16}
            showsVerticalScrollIndicator={false}
        />
    )
}