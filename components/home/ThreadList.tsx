import { ThreadItem } from './ThreadItem';
import { FlatList, RefreshControl } from 'react-native';
import { IThread } from '../../types/model'
import { Spinner, View } from 'tamagui';
interface IThreadListProps {
    title: string
    data: IThread[]
    handleLoadMore: () => void
    isLoading: boolean
    onRefresh: () => void
    isRefreshing?: boolean
}

const renderFooterLoading = (loadingMore) => {
    if (!loadingMore) {
        return null;
    }

    return <Spinner size="large" color="$primary" mb="$3" />;
};


export const ThreadList = (props: IThreadListProps) => {

    const renderPost = ({ item }) => (
        <View>
            <ThreadItem thread={item} />
            <View my="$2" />
        </View>
    );

    return (
        <FlatList
            data={props.data}
            renderItem={renderPost}
            keyExtractor={(item) => `thread-${props.title}-${item.id}`}
            onEndReachedThreshold={0.5}
            scrollEventThrottle={16}
            onEndReached={props.handleLoadMore}
            ListFooterComponent={renderFooterLoading(props.isLoading)}
            showsVerticalScrollIndicator={false}
            refreshControl={
                <RefreshControl
                    refreshing={!!props.isRefreshing}
                    onRefresh={props.onRefresh}
                />
            }
        />
    )
}