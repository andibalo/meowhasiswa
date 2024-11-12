import { View, Text, Image, Input } from 'tamagui'
import { ReviewList } from 'components/university'
import { FontAwesome } from '@expo/vector-icons'

export default function UniversityScreen() {
  const rating = 4.6;

  return (
    <View flex={1} padding={'$3'} backgroundColor="$white">
      {/* University Header */}
      <View alignItems="center" marginBottom={'$3'}>
        <Text fontSize={35} color="$black">
          University
        </Text>
      </View>

      {/* University Info Section */}
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

      {/* Rating and Review Section */}
      <View marginBottom={'$3'}>
        <Text fontSize={18} fontWeight="bold" color="$black" marginBottom={'$1'}>
          Nice
        </Text>
        <View flexDirection="row" alignItems="center">
          {/* Star Rating */}
          <View flexDirection="row">
            {Array.from({ length: 5 }, (_, index) => {
              const isHalfStar = rating - index === 0.5;
              const isFullStar = index < Math.floor(rating);
              return (
                <FontAwesome
                  key={index}
                  name={isFullStar ? "star" : isHalfStar ? "star-half-full" : "star-o"}
                  size={20}
                  color="#FFD700"
                />
              );
            })}
          </View>
          <Text fontSize={16} marginLeft={'$2'} color="$black">
            {rating}/5
          </Text>
        </View>
        <Text fontSize={14} color="$gray" marginTop={'$1'}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Text>
      </View>

      {/* Pros and Cons Section */}
      <View marginBottom={'$3'}>
        <Text fontSize={16} fontWeight="bold" color="$black" marginBottom={'$1'}>
          Pros
        </Text>
        <View marginBottom={'$2'}>
          <Text fontSize={14} color="$black">
            • Lorem dawdawdaw
          </Text>
          <Text fontSize={14} color="$black">
            • Ipsum dawdawdawa
          </Text>
        </View>
        <Text fontSize={16} fontWeight="bold" color="$black" marginBottom={'$1'}>
          Cons
        </Text>
        <View marginBottom={'$2'}>
          <Text fontSize={14} color="$black">
            • Lorem dawdwad
          </Text>
          <Text fontSize={14} color="$black">
            • Ipsum dawdwadwa
          </Text>
        </View>
      </View>

      {/* Divider Line */}
      <View height={1} backgroundColor="$grayLight" marginBottom={'$3'} />

      {/* Review List */}
      <ReviewList />
    </View>
  )
}