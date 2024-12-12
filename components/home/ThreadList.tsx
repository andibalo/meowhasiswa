import { ThreadItem } from './ThreadItem';
import { FlatList, RefreshControl } from 'react-native';
import { IThread } from '../../types/model';
import { Spinner, View } from 'tamagui';
import React, { useMemo } from 'react';

interface IThreadListProps {
    title: string;
    data: IThread[];
    handleLoadMore: () => void;
    isLoadingMore: boolean;
    onRefresh: () => void;
    isRefreshing?: boolean;
    currentUserId?: string;
    currentUserId2?: string;
    currentUserName2?: string;
    currentProfilePic2?: string;
    enableEditItem?: boolean;
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
    isLoadingMore,
    onRefresh,
    isRefreshing,
    currentUserId,
    currentUserId2,
    currentUserName2,
    currentProfilePic2,
    enableEditItem,
}: IThreadListProps) => {
    const renderPost = ({ item }: { item: IThread }) => (
        <View>
            <ThreadItem thread={item} currentUserId={currentUserId} enableEditItem={enableEditItem} currentUserId2={currentUserId2} currentUserName2={currentUserName2} currentProfilePic2={currentProfilePic2} />
            <View my="$2" />
        </View>
    )

    return (
        <FlatList
            data={data}
            renderItem={renderPost}
            keyExtractor={(item) => `thread-${title}-${item.id}`}
            onEndReachedThreshold={0.5}
            scrollEventThrottle={16}
            onEndReached={handleLoadMore}
            ListFooterComponent={renderFooterLoading(isLoadingMore)}
            showsVerticalScrollIndicator={false}
            refreshControl={
                <RefreshControl
                    refreshing={!!isRefreshing}
                    onRefresh={onRefresh}
                />
            }
            extraData={currentUserId} // Track current user to trigger re-renders
        />
    );
};