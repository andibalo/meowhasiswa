import { useState } from 'react';
import { View, Text, Avatar } from 'tamagui';
import { TabView, SceneMap } from 'react-native-tab-view';
import { useWindowDimensions } from 'react-native';
import { Error, Loading, NotFound, TopTabBar } from 'components/common';
import { useFetchUserProfileQuery } from 'redux/api';
import dayjs from 'dayjs';
import { ProfileTab, SettingsTab, UserThreadTab } from 'components/profile';

const routes = [
  { key: 'first', title: 'Profile' },
  { key: 'second', title: 'Post' },
  { key: 'third', title: 'Settings' },
];

const renderScene = (user_id: string) =>
  SceneMap({
    first: () => <ProfileTab/>,
    second: () => <UserThreadTab user_id={user_id} />,
    third: () => <SettingsTab />,
  });

export default function ProfileScreen() {
  const { width } = useWindowDimensions();
  const [index, setIndex] = useState(0);

  const { data, error, isLoading } = useFetchUserProfileQuery();

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }

  const userProfile = data?.data;

  if (!userProfile) {
    return <NotFound description="User Not Found" />;
  }

  return (
    <View flex={1} padding="$4" bg="$backgroundSoft">
      <View
        bg="$background"
        borderRadius="$2"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        marginBottom="$4"
        p="$3"
      >
        <View flexDirection="row" alignItems="center">
          <Avatar
            borderRadius="$2"
            borderWidth="$1"
            borderColor="$primary"
            marginRight="$2"
            size="$5"
          >
            <Avatar.Image
              accessibilityLabel="Profile Picture"
              src={userProfile.university?.image_url}
              objectFit="contain"
            />
            <Avatar.Fallback backgroundColor="$secondary" />
          </Avatar>
          <View>
            <Text fontSize={16} fontWeight="bold" color="$primary">
              {userProfile.university?.abbreviated_name}{" "}
              <Text fontSize={14} color="$secondary">
                {userProfile.username}
              </Text>
            </Text>
            <Text fontSize={14} color="$primary">
              Informatika
            </Text>
          </View>
        </View>
        <Text fontSize="$3" color="$primary">
          Joined {dayjs(userProfile.created_at).format("MMM YYYY")}
        </Text>
      </View>
      <TabView
        lazy
        renderTabBar={(props) => <TopTabBar {...props} />}
        navigationState={{ index, routes }}
        renderScene={renderScene(userProfile.id)}
        onIndexChange={setIndex}
        initialLayout={{ width }}
      />
    </View>
  );
}
