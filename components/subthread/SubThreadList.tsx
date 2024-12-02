import { SubThreadItem } from './SubThreadItem';
import { FlatList, RefreshControl } from 'react-native';
import { ISubThread } from '../../types/model'
import { Spinner } from 'tamagui';

interface ISubThreadListProps {
    title: string
    data: ISubThread[] | undefined
    handleLoadMore: () => void
    isLoadingMore: boolean
    onRefresh: () => void
    isRefreshing?: boolean
}

const renderFooterLoading = (loadingMore) => {
    if (!loadingMore) {
        return null;
    }

    return <Spinner size="large" color="$primary" mb="$3" />;
};

export const SubThreadList = (props: ISubThreadListProps) => {

    const renderPost = ({ item }) => (
        <SubThreadItem subthread={item} isFollowing={props.title === "Following"} />
    );

    return (
        <FlatList
            data={props.data}
            renderItem={renderPost}
            keyExtractor={(item, index) => `subthread-${props.title}-${item.id}`}
            onEndReachedThreshold={0.5}
            scrollEventThrottle={16}
            showsVerticalScrollIndicator={false}
            onEndReached={props.handleLoadMore}
            ListFooterComponent={renderFooterLoading(props.isLoadingMore)}
            refreshControl={
                <RefreshControl
                    refreshing={!!props.isRefreshing}
                    onRefresh={props.onRefresh}
                />
            }
        />
    )
}