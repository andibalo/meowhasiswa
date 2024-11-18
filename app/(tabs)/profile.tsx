import { useState } from 'react';
import { View, Text, Avatar } from 'tamagui';
import { TabView, SceneMap } from 'react-native-tab-view';
import { useWindowDimensions } from 'react-native';
import { Error, Loading, NotFound, TopTabBar } from 'components/common';
import { ThreadList } from 'components/home';
import { useFetchUserProfileQuery, useFetchThreadListQuery } from 'redux/api';
import dayjs from 'dayjs';
import { SettingsTab } from 'components/profile';

const routes = [
  { key: 'first', title: 'Profile' },
  { key: 'second', title: 'Post' },
  { key: 'third', title: 'Settings' },
];

const PostTab = ({ username }: { username: string }) => {
  const [cursor, setCursor] = useState("");

  const { data, error, isLoading } = useFetchThreadListQuery({
    cursor,
    limit: 10,
    username,
  });

  const onRefresh = () => {
    setCursor("");
  };

  const handleLoadMore = () => {
    if (data?.data) {
      const nextCursor = data.data.meta.next_cursor;
      if (nextCursor) {
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

  // Ensure data.data.threads exists and is an array before accessing length
  const threads = data?.data?.threads;

  return (
    <View flex={1}>
      {Array.isArray(threads) && threads.length > 0 ? (
        <ThreadList
          title="User's Posts"
          isLoading={isLoading}
          handleLoadMore={handleLoadMore}
          data={threads}
          onRefresh={onRefresh}
        />
      ) : (
        <NotFound description="No posts found for this user" />
      )}
    </View>
  );
};

const renderScene = (username: string) =>
  SceneMap({
    first: () => <Text>Profile Content</Text>,
    second: () => <PostTab username={username} />,
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
        renderScene={renderScene(userProfile.username)}
        onIndexChange={setIndex}
        initialLayout={{ width }}
      />
    </View>
  );
}