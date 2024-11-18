import { View } from 'tamagui';
import { ReviewList } from 'components/university';
import { SearchBar } from 'components/common';

export default function UniversityScreen() {
  return (
    <View flex={1} p={'$3'} pb="0" bg="$backgroundSoft">
      <View mb="$3">
        <SearchBar placeholder="Search University" />
      </View>
      <View flex={1} bg="#ffffff" p={'$3'} pb="0">
        <ReviewList
          ListHeaderComponent={() => <View />}
          contentContainerStyle={{ paddingTop: 16 }}
          showsVerticalScrollIndicator={true}
        />
      </View>
    </View>
  );
}