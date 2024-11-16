import { ThreadItem } from './ThreadItem';
import { FlatList } from 'react-native';
import { IThread } from '../../types/model'
import { Spinner } from 'tamagui';

interface IThreadListProps {
    title: string
    data: IThread[]
    handleLoadMore: () => void
    isLoading: boolean
}

const renderFooterLoading = (loadingMore) => {
    if (!loadingMore) {
      return null;
    }

    return <Spinner size="large" color="$primary" />;
  };


export const ThreadList = (props: IThreadListProps) => {

    const renderPost = ({ item }) => (
        <ThreadItem thread={item} />
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
        />
    )
}