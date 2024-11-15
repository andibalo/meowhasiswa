import { ThreadList } from 'components/home'
import { useState } from 'react';
import { useWindowDimensions } from 'react-native';
import { View, Text } from 'tamagui'
import { TabView, SceneMap } from 'react-native-tab-view';
import { SearchBar, TopTabBar } from 'components/common';
import { useFetchThreadListQuery } from 'redux/api/thread';
import { IThread } from 'types/model';

const testData: IThread[] = [
  {
    "id": "e0b2e510-0492-479c-abb4-f1c9a044806a",
    "user_id": "f3cb8535-9977-4a1c-874a-2c0e1bed503d",
    "username": "inconsistence",
    "university_abbreviated_name": "UMN",
    "university_image_url": "https://registrasi.untar.ac.id/assets/images/logo_untar.png",
    "subthread_id": "7a1311cd-a25e-4270-84e7-7d37774502cf",
    "subthread_name": "Perkuliahan",
    "subthread_color": "#00FFFF",
    "title": "TEST DATA",
    "content": "kuliah description description",
    "content_summary": "this is a summary",
    "is_active": true,
    "like_count": 0,
    "dislike_count": 0,
    "comment_count": 0,
    "created_by": "andi.usman@student.umn.ac.id",
    "created_at": "2024-11-09T20:16:52.744793Z",
    "updated_by": null,
    "updated_at": null
  },
  {
    "id": "f943486f-f534-49a6-8d5d-0b456b226f18",
    "user_id": "f3cb8535-9977-4a1c-874a-2c0e1bed503d",
    "username": "inconsistence",
    "university_abbreviated_name": "UMN",
    "university_image_url": "https://registrasi.untar.ac.id/assets/images/logo_untar.png",
    "subthread_id": "c1a2f145-d7cb-4c2a-80e4-937de53697c1",
    "subthread_name": "LoveLife",
    "subthread_color": "#FFC0CB",
    "title": "My third love",
    "content": "this is a description",
    "content_summary": "this is a summary",
    "is_active": true,
    "like_count": 0,
    "dislike_count": 0,
    "comment_count": 0,
    "created_by": "andi.usman@student.umn.ac.id",
    "created_at": "2024-11-09T19:33:28.384301Z",
    "updated_by": null,
    "updated_at": null
  },
  {
    "id": "3940cf54-4ae3-47ee-b8e6-e344206e6d9a",
    "user_id": "f3cb8535-9977-4a1c-874a-2c0e1bed503d",
    "username": "inconsistence",
    "university_abbreviated_name": "UMN",
    "university_image_url": "https://pacificgarden.co.id/wp-content/uploads/2021/10/Logo-UBM-Universitas-Bunda-Mulia-Original-1024x744.png",
    "subthread_id": "c1a2f145-d7cb-4c2a-80e4-937de53697c1",
    "subthread_name": "LoveLife",
    "subthread_color": "#FFC0CB",
    "title": "My second love",
    "content": "this is a description",
    "content_summary": "this is a summary",
    "is_active": true,
    "like_count": 0,
    "dislike_count": 0,
    "comment_count": 0,
    "created_by": "andi.usman@student.umn.ac.id",
    "created_at": "2024-11-09T19:33:24.5118Z",
    "updated_by": null,
    "updated_at": null
  },
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
  const [cursor, setCursor] = useState("")
  const enableAPIIntegration = process.env.EXPO_PUBLIC_ENABLE_API_INTEGRATION

  if (enableAPIIntegration === "0") {
    return (
      <View pb="$3">
        <ThreadList title={props.title} isLoading={false} handleLoadMore={() => null} data={testData} />
      </View>
    )
  }

  // TODO: ADD QUERY TRENDING AND NEWEST
  const { data, error, isLoading } = useFetchThreadListQuery({
    cursor: cursor,
    limit: 10
  })

  const handleLoadMore = () => {
    if (data?.data) {
      let nextCursor = data.data.meta.next_cursor

      if (nextCursor != "") {
        setCursor(nextCursor)
      }
    }
  }

  // TODO: IMPROVE ERROR AND NOT FOUND UI
  if (error) {
    return <Text>Error</Text>
  }

  return (
    <View pb="$3">
      {
        data && data.data?.threads && data.data?.threads.length > 0 ?
          <ThreadList title={props.title} isLoading={isLoading} handleLoadMore={handleLoadMore} data={data.data.threads} />
          :
          <Text>Not Found</Text>
      }
    </View>
  )
}

export default function HomeScreen() {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);

  const renderTabBar = (props) => (
    <TopTabBar {...props} />
  );

  return (
    <View flex={1} p={'$3'} pb="0" bg="$backgroundSoft">
      <View mb="$3">
        <SearchBar placeholder="Search Thread" />
      </View>
      <TabView
        lazy
        renderTabBar={renderTabBar}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
      />
    </View>
  );
}