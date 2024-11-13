import { View, Text, Image, Input, ScrollView } from 'tamagui';
import { FontAwesome } from '@expo/vector-icons';

export default function UniversityScreen() {
  const rating = 4.6;

  return (
    <View flex={1} padding={'$3'} backgroundColor="#FFFFFF">
      {/* Search Input */}
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
          color="#FFFFFF"
          flex={1}
          borderWidth={0}
        />
      </View>
      <ScrollView>
        {/* Review Card */}
        {[1, 2].map((item, index) => (
          <View key={index} marginBottom={'$3'}>
            {/* University Info Section */}
            <View flexDirection="row" alignItems="center" marginBottom={'$2'}>
              <Image
                source={require('assets/images/placeholder.png')}
                width={50}
                height={50}
                borderRadius={25}
              />
              <View marginLeft={'$3'}>
                <Text fontSize={16} fontWeight={'bold'} color="#030303">
                  UMN
                </Text>
                <Text fontSize={12} color="#030303">
                  6 hours ago
                </Text>
              </View>
            </View>
            <Text fontSize={12} color="#C5C5C5" marginBottom={'$2'}>
              Informatika
            </Text>

            {/* Rating and Review Section */}
            <View marginBottom={'$3'}>
              <Text fontSize={24} fontWeight="bold" color="#030303" marginBottom={'$1'}>
                {index === 0 ? "Nice" : "Overall good"}
              </Text>
              <View flexDirection="row" alignItems="center">
                {/* Star Rating */}
                <View flexDirection="row">
                  {Array.from({ length: 5 }, (_, i) => {
                    const isHalfStar = rating - i === 0.5;
                    const isFullStar = i < Math.floor(rating);
                    return (
                      <FontAwesome
                        key={i}
                        name={isFullStar ? "star" : isHalfStar ? "star-half-full" : "star-o"}
                        size={24}
                        color="#FFD700"
                      />
                    );
                  })}
                </View>
                <Text fontSize={24} marginLeft={'$2'} color="#030303" fontWeight="bold">
                  {rating}
                </Text>
              </View>
              <Text fontSize={14} color="#030303" marginTop={'$1'}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </Text>
            </View>

            {/* Pros and Cons Section */}
            <View marginBottom={'$3'}>
              <Text fontSize={16} fontWeight="bold" color="#030303" marginBottom={'$1'}>
                Pros
              </Text>
              <View marginBottom={'$2'}>
                <Text fontSize={14} color="#030303">
                  • Lorem dawdawdaw
                </Text>
                <Text fontSize={14} color="#030303">
                  • Ipsum dawdawdawa
                </Text>
              </View>
              <Text fontSize={16} fontWeight="bold" color="#030303" marginBottom={'$1'}>
                Cons
              </Text>
              <View marginBottom={'$2'}>
                <Text fontSize={14} color="#030303">
                  • Lorem dawdwad
                </Text>
                <Text fontSize={14} color="#030303">
                  • Ipsum dawdwadwa
                </Text>
              </View>
            </View>

            {/* Divider Line */}
            <View height={2} backgroundColor="#030303" marginBottom={'$3'} opacity={1} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}