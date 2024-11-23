import { ThreadItem } from './ThreadItem';
import { FlatList, RefreshControl } from 'react-native';
import { IThread } from '../../types/model';
import { Spinner, View } from 'tamagui';

interface IThreadListProps {
    title: string;
    data: IThread[];
    handleLoadMore: () => void;
    isLoading: boolean;
    onRefresh: () => void;
    isRefreshing?: boolean;
    currentUserId: string;
}

const renderFooterLoading = (loadingMore: boolean) => {
    if (!loadingMore) {
        return null;
    }

    return <Spinner size="large" color="$primary" mb="$3" />;
};

export const ThreadList = ({
    title,
    data,
    handleLoadMore,
    isLoading,
    onRefresh,
    isRefreshing,
    currentUserId,
    }: IThreadListProps) => {
    const renderPost = ({ item }: { item: IThread }) => (
        <View>
        <ThreadItem thread={item} currentUserId={currentUserId} />
        <View my="$2" />
        </View>
    );

    return (
        <FlatList
        data={data}
        renderItem={renderPost}
        keyExtractor={(item) => `thread-${title}-${item.id}`}
        onEndReachedThreshold={0.5}
        scrollEventThrottle={16}
        onEndReached={handleLoadMore}
        ListFooterComponent={renderFooterLoading(isLoading)}
        showsVerticalScrollIndicator={false}
        refreshControl={
            <RefreshControl
            refreshing={!!isRefreshing}
            onRefresh={onRefresh}
            />
        }
        />
    );
};
