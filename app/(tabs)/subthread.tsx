import { SubThreadList } from 'components/subthread'
import { useEffect, useMemo, useState } from 'react';
import { useWindowDimensions } from 'react-native';
import { View } from 'tamagui'
import { TabView, SceneMap } from 'react-native-tab-view';
import { Error, Fab, Loading, NotFound, SearchBar, TopTabBar } from 'components/common';
import { useRouter } from 'expo-router';
import { ISubThread } from 'types/model';
import { useFetchUserProfileQuery } from 'redux/api';
import { ROLE_ADMIN } from 'constants/common';
import { fetchSubThreadList } from 'services/subthread';

const routes = [
  { key: 'first', title: 'Explore' },
  { key: 'second', title: 'Following' },
];

interface ITabItemProps {
  title: string
  tabIndex: number
  query: string
}

const TabItem = (props: ITabItemProps) => {
  const [cursor, setCursor] = useState("");
  const [subThreads, setSubThreads] = useState<ISubThread[]>([])
  const [endOfDataReached, setEndOfDataReached] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [error, setError] = useState("")

  const fetchSubThreads = async (cursor) => {
    try {
      const response = await fetchSubThreadList({
        cursor: cursor,
        limit: 5,
        isFollowing: props.tabIndex === 1,
        shouldExcludeFollowing: props.tabIndex === 0,
        _q: props.query
      });

      const respData = response?.data.data

      if (respData) {

        setSubThreads((prevItems) => [...prevItems, ...respData.subthreads]);

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
    await fetchSubThreads("")
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
    setSubThreads([]);
    fetchSubThreads("");
  };

  const handleLoadMore = async (cursor) => {
    if (isLoading || isLoadingMore || endOfDataReached) {
      return
    }

    setIsLoadingMore(true)
    await fetchSubThreads(cursor)
    setIsLoadingMore(false)
  };

  if (isLoading) {
    return <Loading />
  }

  if (error) {
    return <Error />
  }

  if (!subThreads || subThreads.length === 0) {
    return <NotFound description='SubMeow Not Found' />
  }

  return (
    <View flex={1}>
      <SubThreadList
        title={props.title}
        data={subThreads}
        handleLoadMore={() => handleLoadMore(cursor)}
        isLoadingMore={isLoading}
        onRefresh={onRefresh}
      />
    </View>
  );
};

export default function SubThreadScreen() {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const router = useRouter();

  const [searchInput, setSearchInput] = useState("")
  const [query, setQuery] = useState("")

  const { data: userData, error: fetchUserProfileError } = useFetchUserProfileQuery()

  const renderScene = useMemo(
    () =>
      SceneMap({
        first: () => <TabItem title='Explore' tabIndex={index} query={query} />,
        second: () => <TabItem title="Following" tabIndex={index} query={query} />,
      }),
    [index, query]
  );

  const handleSubmitSearch = () => {
    setQuery(searchInput)
  }

  const onChangeText = (data) => {
    setSearchInput(data)
  }

  const renderTabBar = (props) => (
    <TopTabBar {...props} />
  );

  if (fetchUserProfileError) {
    return <Error />
  }

  return (
    <View flex={1} p={'$3'} pb="0" bg="$backgroundSoft">
      <View mb="$3">
        <SearchBar
          placeholder="Search Submeow"
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
      {
        userData?.data?.role === ROLE_ADMIN && <Fab onPress={() => router.push('/subthread/create-subthread')} />
      }
    </View>
  )
}
