import { View, Text, Image } from 'tamagui'
import { ReviewList } from 'components/university'
import { FontAwesome } from '@expo/vector-icons' // Icon library for stars and bottom navigation icons

export default function UniversityScreen() {
  return (
    <View flex={1} padding={'$3'} backgroundColor="$white">
      {/* Header */}
      <View alignItems="center" marginBottom={'$3'}>
        <Text fontSize={35} color="$black">
          University
        </Text>
      </View>

      {/* University Info Section */}
      <View flexDirection="row" alignItems="center" marginBottom={'$3'}>
        <Image
          source={require('./assets/umn-logo.png')} // Replace with the path to your logo
          width={50}
          height={50}
          borderRadius={25}
        />
        <View marginLeft={'$3'}>
          <Text fontSize={16} fontWeight="bold" color="$black">
            UMN
          </Text>
          <Text fontSize={14} color="$gray">
            6 hours ago
          </Text>
          <Text fontSize={14} color="$gray">
            Informatika
          </Text>
        </View>
      </View>

      {/* Review List */}
      <ReviewList />

      {/* Bottom Navigation */}
      <View flexDirection="row" justifyContent="space-around" paddingVertical={'$3'} borderTopWidth={1} borderTopColor="$gray2">
        <FontAwesome name="home" size={20} color="#ccc" />
        <FontAwesome name="paw" size={20} color="#ccc" /> {/* "Submeow" icon */}
        <FontAwesome name="university" size={20} color="#000" /> {/* Selected "University" icon */}
        <FontAwesome name="user" size={20} color="#ccc" />
      </View>
    </View>
  )
}