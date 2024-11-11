import { View, Text, Image } from 'tamagui'
import { ReviewList } from 'components/university'
import { FontAwesome } from '@expo/vector-icons'

export default function UniversityScreen() {
  return (
    <View flex={1} padding={'$3'} backgroundColor="$white">
      <View alignItems="center" marginBottom={'$3'}>
        <Text fontSize={35} color="$black">
          University
        </Text>
      </View>

      <View flexDirection="row" alignItems="center" marginBottom={'$3'}>
        <Image
          source={require('./assets/placeholder.png')}
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
    </View>
  )
}
