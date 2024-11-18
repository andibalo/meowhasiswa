import { useState } from 'react';
import { View, Text, Avatar } from 'tamagui';
import { TabView, SceneMap } from 'react-native-tab-view';
import { useWindowDimensions } from 'react-native';
import { Error, Loading, NotFound, TopTabBar } from 'components/common';
import { useFetchUserProfileQuery } from 'redux/api';
import dayjs from 'dayjs'
import { SettingsTab } from 'components/profile';

const routes = [
  { key: 'first', title: 'Profile' },
  { key: 'second', title: 'Post' },
  { key: 'third', title: 'Settings' }
];

const renderScene = SceneMap({
  first: () => <Text>Profile Content</Text>,
  second: () => <Text>Post Content</Text>,
  third: () => <SettingsTab/>,
});

export default function ProfileScreen() {
  const { width } = useWindowDimensions();
  const [index, setIndex] = useState(0);

  const { data, error, isLoading } = useFetchUserProfileQuery()

  if (isLoading) {
    return <Loading />
  }

  if (error) {
    return <Error />
  }

  return (
    data?.data ? 
    <View flex={1} padding="$4" bg="$backgroundSoft">
      <View bg="$background" borderRadius="$2" flexDirection="row" alignItems="center" justifyContent="space-between" marginBottom="$4" p="$3">
        <View flexDirection="row" alignItems="center">
          <Avatar
            borderRadius={"$2"}
            borderWidth="$1"
            borderColor="$primary"
            marginRight="$2"
            size="$5"
          >
            <Avatar.Image
              accessibilityLabel="Profile Picture"
              src={data.data.university?.image_url}
              objectFit="contain"
            />
            <Avatar.Fallback backgroundColor="$secondary" />
          </Avatar>
          <View>
            <Text fontSize={16} fontWeight="bold" color="$primary">
              UMN <Text fontSize={14} color="$secondary">{data.data.username}</Text>
            </Text>
            <Text fontSize={14} color="$primary">Informatika</Text>
          </View>
        </View>
        <Text fontSize="$3" color="$primary">
          Joined {dayjs(data.data.created_at).format("MMM YYYY")}
        </Text>
      </View>
      <TabView
        lazy
        renderTabBar={(props) => <TopTabBar {...props} />}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width }}
      />
    </View>
    :
    <NotFound description="User Not Found" />
  );
}
