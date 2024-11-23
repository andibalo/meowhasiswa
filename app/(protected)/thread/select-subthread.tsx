import { Error, Loading, NotFound } from 'components/common'
import { SelectSubThreadList } from 'components/subthread'
import { useNavigation } from 'expo-router'
import { useState } from 'react'
import { useFetchSubThreadListQuery } from 'redux/api'
import { View } from 'tamagui'
import { ISubThread } from 'types/model'


export default function SelectSubThreadScreen() {
    const navigation = useNavigation()
    const [cursor, setCursor] = useState("");

    const { data, error, isLoading, refetch } = useFetchSubThreadListQuery({
        cursor: cursor,
        limit: 10,
        includeUniversitySubthread: true,
    });

    const subthreads = data?.data?.subthreads

    const onRefresh = () => {
        refetch()
    };

    const handleLoadMore = () => {
        if (data?.data) {
            let nextCursor = data.data.meta.next_cursor;

            if (nextCursor !== "") {
                setCursor(nextCursor);
            }
        }
    };

    const handleOnPressItem = (subthread: ISubThread) => {
        //@ts-ignore
        navigation.navigate("thread/create-thread", {
            id: subthread.id,
            name: subthread.name,
            imageUrl: subthread.image_url,
            followersCount: subthread.followers_count
        })
    }

    if (isLoading) {
        return <Loading />
    }

    if (error) {
        return <Error />
    }

    if (!subthreads || (subthreads && subthreads.length === 0)) {
        return <NotFound description='SubMeow Not Found' />
    }

    return (
        <View flex={1} p={'$3'} pb="0" bg="$background">
            <SelectSubThreadList
                data={subthreads}
                handleLoadMore={handleLoadMore}
                isLoading={isLoading}
                onRefresh={onRefresh}
                onItemPress={handleOnPressItem}
            />
        </View>
    )
}
