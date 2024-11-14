import { ThreadList } from 'components/home'
import { useState } from 'react';
import { useWindowDimensions } from 'react-native';
import { View } from 'tamagui'
import { TabView, SceneMap } from 'react-native-tab-view';
import { SearchBar, TopTabBar } from 'components/common';

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
  )
}
