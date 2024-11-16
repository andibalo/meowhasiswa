import { SubthreadList } from 'components/subthread'
import { useState } from 'react';
import { useWindowDimensions } from 'react-native';
import { View } from 'tamagui'
import { TabView, SceneMap } from 'react-native-tab-view';
import { SearchBar, TopTabBar } from 'components/common';

const routes = [
  { key: 'first', title: 'Explore' },
  { key: 'second', title: 'Following' },
];

const renderScene = SceneMap({
  first: () => <SubthreadList title='Explore' />,
  second: () => <SubthreadList title='Following' />,
});

export default function HomeScreen() {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);

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
    </View>
  )
}
