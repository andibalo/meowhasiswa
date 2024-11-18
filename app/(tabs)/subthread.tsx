import { SubthreadList } from 'components/subthread'
import { useState } from 'react';
import { useWindowDimensions, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { View } from 'tamagui'
import { TabView, SceneMap } from 'react-native-tab-view';
import { SearchBar, TopTabBar } from 'components/common';
import { useRouter } from 'expo-router';

const routes = [
  { key: 'first', title: 'Explore' },
  { key: 'second', title: 'Following' },
];

const renderScene = SceneMap({
  first: () => <SubthreadList title='Explore' />,
  second: () => <SubthreadList title='Following' />,
});

export default function SubThreadScreen() {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const router = useRouter();

  const renderTabBar = (props) => (
    <TopTabBar {...props} />
  );

  return (
    <View flex={1} p={'$3'} pb="0" bg="$backgroundSoft">
      <View mb="$3">
        <SearchBar placeholder="Search Submeow" />
      </View>
      <TabView
        lazy
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
        onPress={() => router.push('/subthread/create-subthread')}
      >
        <FontAwesome name="plus" size={24} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  )
}
