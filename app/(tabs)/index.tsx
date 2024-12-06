import { ThreadList } from 'components/home';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useWindowDimensions } from 'react-native';
import { View } from 'tamagui';
import { TabView, SceneMap } from 'react-native-tab-view';
import { Error, Fab, Loading, NotFound, SearchBar, TopTabBar } from 'components/common';
import { useRouter } from 'expo-router';
import { IThread } from 'types/model';
import { fetchThreadList } from 'services/thread';
import { useFetchUserProfileQuery } from 'redux/api';

interface ITabItemProps {
  title: string
  tabIndex: number
  query: string
}

const routes = [
  { key: 'first', title: 'Trending' },
  { key: 'second', title: 'Latest' },
];

const TabItem = (props: ITabItemProps) => {
  const { data: profData, error: profError, isLoading: profLoading } = useFetchUserProfileQuery();
  const [cursor, setCursor] = useState("");
  const [threads, setThreads] = useState<IThread[]>([])
  const [endOfDataReached, setEndOfDataReached] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [error, setError] = useState("")

  const currentUserId2 = profData?.data?.id;
  const currentUserName2 = profData?.data?.username;
  const currentProfilePic2 = profData?.data?.university?.image_url;

  const fetchThreads = async (cursor) => {
    try {
      const response = await fetchThreadList({
        cursor: cursor,
        limit: 5,
        isTrending: props.tabIndex === 0,
        isUserFollowing: true,
        includeUserActivity: true,
        _q: props.query
      });

      const respData = response?.data.data

      if (respData) {

        setThreads((prevItems) => [...prevItems, ...respData.threads]);

        let nextCursor = respData.meta.next_cursor

        if (!nextCursor) {
          setEndOfDataReached(true)
        }

        if (nextCursor !== "") {
          setCursor(nextCursor);
        }
      }

    } catch (error) {
      setError(error)
    }
  };

  const loadInitialData = async () => {
    setIsLoading(true)
    await fetchThreads("")
    setIsLoading(false)
  }

  useEffect(() => {
    loadInitialData()
  }, [props.query])

  const onRefresh = async () => {
    if (isLoading || isLoadingMore) {
      return;
    }

    setEndOfDataReached(false)
    setThreads([]);
    fetchThreads("");
  };

  const handleLoadMore = async (cursor) => {
    if (isLoading || isLoadingMore || endOfDataReached) {
      return
    }

    setIsLoadingMore(true)
    await fetchThreads(cursor)
    setIsLoadingMore(false)
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }

  if (!threads || threads.length === 0) {
    return <NotFound description='Threads Not Found' />
  }

  return (
    <View flex={1}>
      <ThreadList
        title={props.title}
        data={threads}
        handleLoadMore={() => handleLoadMore(cursor)}
        isLoadingMore={isLoadingMore}
        onRefresh={onRefresh}
        currentUserId2={currentUserId2}
        currentUserName2={currentUserName2}
        currentProfilePic2={currentProfilePic2}
      />
    </View>
  );
};

export default function HomeScreen() {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [searchInput, setSearchInput] = useState("")
  const [query, setQuery] = useState("")

  const router = useRouter();

  const renderTabBar = (props) => (
    <TopTabBar {...props} />
  );

  const handleSubmitSearch = useCallback(() => {
    setQuery(searchInput)
  }, [searchInput])

  const onChangeText = (data) => {
    setSearchInput(data)
  }

  const renderScene = useMemo(
    () =>
      SceneMap({
        first: () => <TabItem title="Trending" tabIndex={index} query={query} />,
        second: () => <TabItem title="Latest" tabIndex={index} query={query} />,
      }),
    [index, query]
  );

  return (
    <View flex={1} p="$3" pb="0" bg="$backgroundSoft">
      <View mb="$3">
        <SearchBar
          placeholder="Search Thread"
          value={searchInput}
          onChangeText={(data) => onChangeText(data)}
          onSubmitEditing={() => handleSubmitSearch()}
        />
      </View>
      <TabView
        lazy
        renderTabBar={renderTabBar}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
      />
      <Fab onPress={() => router.push('/thread/create-thread')} />
    </View>
  );
}