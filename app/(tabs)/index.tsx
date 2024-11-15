import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { View, Input, Text, YStack, Button, XStack, styled, TextArea } from 'tamagui';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { ThreadList } from 'components/home';
import { SearchBar, TopTabBar } from 'components/common';
import { TabView, SceneMap } from 'react-native-tab-view';
import { useWindowDimensions } from 'react-native';

const routes = [
  { key: 'first', title: 'Trending' },
  { key: 'second', title: 'Latest' },
];

const renderScene = SceneMap({
  first: () => <ThreadList title='Trending' />,
  second: () => <ThreadList title='Newest' />,
});

export default function HomeScreen() {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);

  const renderTabBar = (props) => (
    <TopTabBar {...props} />
  );
  const router = useRouter();

  const blankSpace = () => <View></View>;


  return (
    <View flex={1} backgroundColor="#FFFFFF" padding={'$3'}>
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
      {/* Bottom-right button to open the modal */}
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
        onPress={() => router.push('/newThread/NewThreadScreen')} // Navigate to new thread modal
      >
        <FontAwesome name="plus" size={24} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
}