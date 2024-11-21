import { ThreadList } from 'components/home';
import { useState } from 'react';
import { useWindowDimensions, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { View } from 'tamagui';
import { TabView, SceneMap } from 'react-native-tab-view';
import { Error, Loading, NotFound, SearchBar, TopTabBar } from 'components/common';
import { useFetchThreadListQuery } from 'redux/api/thread';
import { IThread } from 'types/model';
import { useRouter } from 'expo-router';

const testData: IThread[] = [
  {
    "id": "625468c0-0034-4554-a51f-96f8f68aa44e",
    "user_id": "f3cb8535-9977-4a1c-874a-2c0e1bed503d",
    "username": "inconsistence",
    "university_abbreviated_name": "UMN",
    "university_image_url": "https://registrasi.untar.ac.id/assets/images/logo_untar.png",
    "subthread_id": "c1a2f145-d7cb-4c2a-80e4-937de53697c1",
    "subthread_name": "LoveLife",
    "subthread_color": "#FFC0CB",
    "title": "My first love",
    "content": "this is a description",
    "content_summary": "this is a summary",
    "is_active": true,
    "like_count": 1,
    "dislike_count": 0,
    "comment_count": 1,
    "created_by": "andi.usman@student.umn.ac.id",
    "created_at": "2024-11-08T09:41:03.12703Z",
    "updated_by": null,
    "updated_at": null
  }
]

const routes = [
  { key: 'first', title: 'Trending' },
  { key: 'second', title: 'Latest' },
];

const renderScene = SceneMap({
  first: () => <TabItem title='Trending' />,
  second: () => <TabItem title='Newest' />,
});

const TabItem = (props: { title: string }) => {
  const [cursor, setCursor] = useState("");

  const enableAPIIntegration = process.env.EXPO_PUBLIC_ENABLE_API_INTEGRATION;

  if (enableAPIIntegration === "0") {
    return (
      <View>
        <ThreadList
          title={props.title}
          isLoading={false}
          handleLoadMore={() => null}
          data={testData}
          isRefreshing={false}
          onRefresh={() => null}
        />
      </View>
    );
  }

  // TODO: ADD QUERY TRENDING AND NEWEST
  const { data, error, isLoading } = useFetchThreadListQuery({
    cursor: cursor,
    limit: 10
  });

  const onRefresh = () => {
    setCursor("");
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
    return <Loading />
  }

  if (error) {
    return <Error />
  }

  return (
    <View flex={1}>
      {
        data && data.data?.threads && data.data?.threads.length > 0 ?
          <ThreadList
            title={props.title}
            isLoading={isLoading}
            handleLoadMore={handleLoadMore}
            data={data.data.threads}
            onRefresh={onRefresh}
          />
          :
          <NotFound description='Threads Not Found' />
      }
    </View>
  );
};

export default function HomeScreen() {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const router = useRouter();

  const renderTabBar = (props) => (
    <TopTabBar {...props} />
  );

  return (
    <View flex={1} p={'$3'} pb="0" bg="$backgroundSoft">
      <View mb="$3">
        <SearchBar placeholder="Search Thread" />
      </View>
      <TabView
        renderTabBar={renderTabBar}
        navigationState={{ index, routes }}
        renderScene={renderScene}
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