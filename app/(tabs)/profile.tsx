import React, { useState } from 'react';
import { View, Text, Image } from 'tamagui';
import { NavigationContainer } from '@react-navigation/native';
import { TabView, SceneMap } from 'react-native-tab-view';
import { useWindowDimensions } from 'react-native';
import { SearchBar, TopTabBar } from 'components/common';

const routes = [
  { key: 'first', title: 'Profile' },
  { key: 'second', title: 'Post' },
  { key: 'third', title: 'Comments'}
];

const renderScene = SceneMap({
  first: () => <Text>Profile Content</Text>,
  second: () => <Text>Post Content</Text>,
  third: () => <Text>Comments Content</Text>,
});

export default function ProfileScreen() {
  const { width } = useWindowDimensions();
  const [index, setIndex] = useState(0);

  return (
    <NavigationContainer>
      <View flex={1} padding="$4" backgroundColor="$primary">
        <View flexDirection="row" alignItems="center" justifyContent="space-between" marginBottom="$4" borderBottomWidth={1} borderBottomColor="#cccccc" paddingBottom="$3">
          <View flexDirection="row" alignItems="center">
            <Image
              source={require('assets/images/placeholder.png')}
              width={50}
              height={50}
              borderRadius={25}
              marginRight="$2"
            />
            <View>
              <Text fontSize={16} fontWeight="bold" color="$primary">
                UMN <Text fontSize={14} color="$secondary">username12</Text>
              </Text>
              <Text fontSize={14} color="$primary">Informatika</Text>
            </View>
          </View>
          <Text fontSize={14} color="$primary">
            Joined Oktober 2024
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
    </NavigationContainer>
  );
}
