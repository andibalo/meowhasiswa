import { ThreadList } from 'components/home';
import { View, Input } from 'tamagui';
import { FontAwesome } from '@expo/vector-icons';

export default function HomeScreen() {
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
        placeholder="Placeholder. Search goes here later."
        placeholderTextColor="#FFFFFF"
        backgroundColor="transparent"
        flex={1}
        borderWidth={0}
      />
    </View>
  );

  const blankSpace = () => (
    <View></View>
  )

  return (
    <View flex={1} p={'$3'} pb={'$0'} backgroundColor="#FFFFFF">
      {/* Render the fixed search bar above the ThreadList */}
      {renderSearchBar()}
      
      {/* Pass ListHeaderComponent and contentContainerStyle to ThreadList */}
      <ThreadList
        ListHeaderComponent={blankSpace} // Ensure ListHeaderComponent is passed here
        contentContainerStyle={{ paddingTop: 16 }} // Adjust spacing for the list
      />
    </View>
  );
}