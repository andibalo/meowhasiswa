import React from 'react';
import { View, Input } from 'tamagui';
import { FontAwesome } from '@expo/vector-icons';
import { ReviewList } from 'components/university';
import { SearchBar, TopTabBar } from 'components/common';

export default function UniversityScreen() {
  return (
    <View flex={1} padding={'$3'} backgroundColor="#FFFFFF">
      <View mb="$3">
        <SearchBar placeholder="Search University" />
      </View>
      <View flex={1} backgroundColor="#FFFFFF" mb={'$3'} p={'$3'} borderRadius={'$4'}>
        <ReviewList
          ListHeaderComponent={() => <View />} // You can add a header component if needed
          contentContainerStyle={{ paddingTop: 16 }}
          showsVerticalScrollIndicator={true}
        />
      </View>
    </View>
  );
}