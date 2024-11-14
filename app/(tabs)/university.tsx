import { View, Text, Input, ScrollView } from 'tamagui';
import { FontAwesome } from '@expo/vector-icons';
import { ReviewList } from 'components/university'; // Import ReviewList component

export default function UniversityScreen() {
  // Sample reviews data
  const data = [
    {
      id: 1,
      universityName: 'UMN',
      timeAgo: '6 hours ago',
      department: 'Informatika',
      title: 'Nice',
      body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      pros: ['Lorem dawdawdaw', 'Ipsum dawdawdaw'],
      cons: ['Lorem dawdawdaw', 'Ipsum dawdawdaw'],
      rating: 4.5,
    },
    {
      id: 2,
      universityName: 'UBM',
      timeAgo: '2 days ago',
      department: 'Akuntansi',
      title: 'Overall good',
      body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      pros: ['Lorem dawdawdaw', 'Ipsum dawdawdaw'],
      cons: ['Lorem dawdawdaw', 'Ipsum dawdawdaw'],
      rating: 4,
    },
    // Add more reviews here as needed
  ];

  // Search bar
  const renderSearchBar = () => (
    <View
      flexDirection="row"
      alignItems="center"
      backgroundColor="#595959"
      borderRadius={'$2'}
      paddingHorizontal={'$2'}
      paddingVertical={'$1'}
      marginBottom={'$3'}
    >
      <FontAwesome name="search" size={16} color="#FFFFFF" style={{ marginRight: 8, marginLeft: 10 }} />
      <Input
        placeholder="Search for reviews..."
        placeholderTextColor="#FFFFFF"
        backgroundColor="transparent"
        color="#FFFFFF"
        flex={1}
        borderWidth={0}
      />
    </View>
  );

  const RenderTabScreen = () => (
    <View flex={1} backgroundColor="#FFFFFF">
      <ReviewList
        data={data}
        ListHeaderComponent={() => <View />}
        contentContainerStyle={{ paddingTop: 16 }}
        showsVerticalScrollIndicator={true}
      />
    </View>
  );

  return (
    <View flex={1} padding={'$3'} backgroundColor="#FFFFFF">
      {renderSearchBar()}
      <RenderTabScreen />
    </View>
  );
}