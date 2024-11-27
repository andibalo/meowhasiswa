import { ThreadList } from 'components/home';
import { useState } from 'react';
import { useWindowDimensions } from 'react-native';
import { View } from 'tamagui';
import { TabView, SceneMap } from 'react-native-tab-view';
import { Error, Fab, Loading, NotFound, SearchBar, TopTabBar } from 'components/common';
import { useFetchThreadListQuery } from 'redux/api/thread';
import { useRouter } from 'expo-router';
import { IThread } from 'types/model';

interface ITabItemProps {
  title: string;
  data: IThread[] | undefined
  handleLoadMore: () => void
  isLoading: boolean
  onRefresh: () => void
  isRefreshing?: boolean
  error: any
}

interface IRenderSceneProps {
  data: IThread[] | undefined
  handleLoadMore: () => void
  isLoading: boolean
  onRefresh: () => void
  isRefreshing?: boolean
  error: any
}

const routes = [
  { key: 'first', title: 'Trending' },
  { key: 'second', title: 'Latest' },
];

const renderScene = (props: IRenderSceneProps) => SceneMap({
  first: () => <TabItem title='Trending'
    data={props.data}
    handleLoadMore={props.handleLoadMore}
    isLoading={props.isLoading}
    onRefresh={props.onRefresh}
    isRefreshing={props.isRefreshing}
    error={props.error}
  />,
  second: () => <TabItem title='Newest'
    data={props.data}
    handleLoadMore={props.handleLoadMore}
    isLoading={props.isLoading}
    onRefresh={props.onRefresh}
    isRefreshing={props.isRefreshing}
    error={props.error}
  />,
});

// TODO: Improve user experience, still lagging and need to show spinner
const TabItem = (props: ITabItemProps) => {

  if (props.isLoading) {
    return <Loading />;
  }

  if (props.error) {
    return <Error />;
  }

  if (!props.data || (props.data && props.data.length === 0)) {
    return <NotFound description='Threads Not Found' />
  }

  return (
    <View flex={1}>
      <ThreadList
        title={props.title}
        data={props.data}
        handleLoadMore={props.handleLoadMore}
        isLoading={props.isLoading}
        onRefresh={props.onRefresh}
        isRefreshing={props.isRefreshing}
      />
    </View>
  );
};

export default function HomeScreen() {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [searchInput, setSearchInput] = useState("")
  const [query, setQuery] = useState("")
  const [cursor, setCursor] = useState("");

  const { data, error, isLoading, refetch } = useFetchThreadListQuery({
    cursor: cursor,
    limit: 10,
    isTrending: index === 0,
    isUserFollowing: true,
    _q: query
  });

  const router = useRouter();

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

  const handleSubmitSearch = () => {
    setQuery(searchInput)
  }

  const onChangeText = (data) => {
    setSearchInput(data)
  }

  const renderTabBar = (props) => (
    <TopTabBar {...props} />
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
        renderScene={renderScene({
          data: data?.data?.threads,
          handleLoadMore,
          isLoading,
          onRefresh,
          error
        })}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
      />
      <Fab onPress={() => router.push('/thread/create-thread')} />
    </View>
  );
}