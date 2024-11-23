import { SubThreadList } from 'components/subthread'
import { useState } from 'react';
import { useWindowDimensions, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { View } from 'tamagui'
import { TabView, SceneMap } from 'react-native-tab-view';
import { Error, Loading, NotFound, SearchBar, TopTabBar } from 'components/common';
import { useRouter } from 'expo-router';
import { useFetchSubThreadListQuery } from 'redux/api/subthread';
import { ISubThread } from 'types/model';
import { useFetchUserProfileQuery } from 'redux/api';
import { ROLE_ADMIN } from 'constants/common';

const routes = [
  { key: 'first', title: 'Explore' },
  { key: 'second', title: 'Following' },
];

interface ITabItemProps {
  title: string
  data: ISubThread[] | undefined
  handleLoadMore: () => void
  isLoading: boolean
  onRefresh: () => void
  isRefreshing?: boolean
  error: any
}

interface IRenderSceneProps {
  data: ISubThread[] | undefined
  handleLoadMore: () => void
  isLoading: boolean
  onRefresh: () => void
  isRefreshing?: boolean
  error: any
}

const TabItem = (props: ITabItemProps) => {

  if (props.isLoading) {
    return <Loading />
  }

  if (props.error) {
    return <Error />
  }

  if (!props.data || (props.data && props.data.length === 0)) {
    return <NotFound description='SubMeow Not Found' />
  }

  return (
    <View flex={1}>
      <SubThreadList
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

const renderScene = (props: IRenderSceneProps) => SceneMap({
  first: () => <TabItem
    title='Explore'
    data={props.data}
    handleLoadMore={props.handleLoadMore}
    isLoading={props.isLoading}
    onRefresh={props.onRefresh}
    isRefreshing={props.isRefreshing}
    error={props.error}
  />,
  second: () => <TabItem
    title='Following'
    data={props.data}
    handleLoadMore={props.handleLoadMore}
    isLoading={props.isLoading}
    onRefresh={props.onRefresh}
    isRefreshing={props.isRefreshing}
    error={props.error}
  />,
});

export default function SubThreadScreen() {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const router = useRouter();

  const [cursor, setCursor] = useState("");
  const [searchInput, setSearchInput] = useState("")
  const [query, setQuery] = useState("")

  const { data, error, isLoading, refetch } = useFetchSubThreadListQuery({
    cursor: cursor,
    limit: 10,
    isFollowing: index === 1,
    shouldExcludeFollowing: index === 0,
    _q: query
  });

  const { data: userData, error: fetchUserProfileError } = useFetchUserProfileQuery()

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
        renderScene={renderScene({
          data: data?.data?.subthreads,
          handleLoadMore,
          isLoading,
          onRefresh,
          error
        })}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
      />
      {
        userData?.data?.role === ROLE_ADMIN && <TouchableOpacity
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
          onPress={() => router.push('/subthread/create-subthread')}
        >
          <FontAwesome name="plus" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      }
    </View>
  )
}
