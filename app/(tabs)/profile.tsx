import React, { useState } from 'react';
import { View, Text, Image } from 'tamagui';
import { NavigationContainer } from '@react-navigation/native';
import { TabView, SceneMap } from 'react-native-tab-view';
import { useWindowDimensions } from 'react-native'; // For handling layout dimensions
import { SearchBar, TopTabBar } from 'components/common'; // Import your custom components


// Placeholder components for tabs
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
  const [index, setIndex] = useState(0); // Manage the active tab index

  return (
    <NavigationContainer>
      <View flex={1} padding="$4" backgroundColor="#ffffff">
        {/* User Info Section */}
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
              <Text fontSize={16} fontWeight="bold" color="#030303">
                UMN <Text fontSize={14} color="#C5C5C5">username12</Text>
              </Text>
              <Text fontSize={14} color="#030303">Informatika</Text>
            </View>
          </View>
          <Text fontSize={14} color="#030303">
            Joined Oktober 2024
          </Text>
        </View>

        {/* Material Top Tabs */}
        <TabView
          lazy
          renderTabBar={(props) => <TopTabBar {...props} />}
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width }} // Set the initial layout based on screen width
        />
      </View>
    </NavigationContainer>
  );
}
