import { ThreadList } from 'components/home';
import { useState } from 'react';
import { useWindowDimensions, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { View } from 'tamagui';
import { TabView, SceneMap } from 'react-native-tab-view';
import { Error, Loading, NotFound, SearchBar, TopTabBar } from 'components/common';
import { useFetchThreadListQuery } from 'redux/api/thread';
import { useRouter } from 'expo-router';

interface ITabItemProps {
  title: string;
  query: string;
  isTrending: boolean
}

const routes = [
  { key: 'first', title: 'Trending' },
  { key: 'second', title: 'Latest' },
];

const renderScene = ({ query, index }) => SceneMap({
  first: () => <TabItem title='Trending' query={query} isTrending={index === 0} />,
  second: () => <TabItem title='Newest' query={query} isTrending={index === 0} />,
});

// TODO: Improve user experience, still lagging and need to show spinner
const TabItem = (props: ITabItemProps) => {
  const [cursor, setCursor] = useState("");

  const { data, error, isLoading, refetch } = useFetchThreadListQuery({
    cursor: cursor,
    limit: 10,
    isTrending: props.isTrending,
    isUserFollowing: true,
    _q: props.query
  });

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

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }

  return (
    <View flex={1}>
      {data && data.data?.threads && data.data?.threads.length > 0 ? (
        <ThreadList
          title={props.title}
          isLoading={isLoading}
          handleLoadMore={handleLoadMore}
          data={data.data.threads}
          onRefresh={onRefresh}
        />
      ) : (
        <NotFound description="Threads Not Found" />
      )}
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

  const handleSubmitSearch = () => {
    setQuery(searchInput)
  }

  const onChangeText = (data) => {
    setSearchInput(data)
  }

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
        renderScene={renderScene({ query, index })}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
      />
      <TouchableOpacity
        style={{
          position: 'absolute',
          bottom: 20,
          right: 20,
          backgroundColor: '#000000',
          width: 60,
          height: 60,
          borderRadius: 30,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => router.push('/thread/create-thread')}
      >
        <FontAwesome name="plus" size={24} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
}