import { FlatList, RefreshControl } from 'react-native';
import { ISubThread } from '../../types/model'
import { Separator, Spinner, View } from 'tamagui';
import { SelectSubThreadItem } from './SelectSubThreadItem';

interface ISelectSubThreadListProps {
    data: ISubThread[] | undefined
    handleLoadMore: () => void
    isLoading: boolean
    onRefresh: () => void
    isRefreshing?: boolean
    onItemPress: (subthread: ISubThread) => void
}

const renderFooterLoading = (loadingMore) => {
    if (!loadingMore) {
        return null;
    }

    return <Spinner size="large" color="$primary" mb="$3" />;
};

export const SelectSubThreadList = (props: ISelectSubThreadListProps) => {

    const renderPost = ({ item }) => (
        <View>
            <SelectSubThreadItem subthread={item} onPress={props.onItemPress} />
            <Separator my="$2" />
        </View>
    );

    return (
        <FlatList
            data={props.data}
            renderItem={renderPost}
            keyExtractor={(item, index) => `subthread-${item.id}`}
            onEndReachedThreshold={0.5}
            scrollEventThrottle={16}
            showsVerticalScrollIndicator={false}
            onEndReached={props.handleLoadMore}
            ListFooterComponent={renderFooterLoading(props.isLoading)}
            refreshControl={
                <RefreshControl
                    refreshing={!!props.isRefreshing}
                    onRefresh={props.onRefresh}
                />
            }
        />
    )
}