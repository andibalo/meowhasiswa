import { Text, View, Image } from 'tamagui'

export default function ProfileScreen() {
  return (
    <View flex={1} backgroundColor="$white" padding={20}>
      <View alignItems="center" marginBottom={10}>
        <Text fontSize={35} color="$black" paddingLeft={10}>
          Profile
        </Text>
      </View>

      <View flexDirection="row" justifyContent="space-between" alignItems="center" paddingVertical={10} borderBottomWidth={1} borderBottomColor="$gray">
        <View flexDirection="row" alignItems="center">
          <Image
            source={require('./assets/placeholder.png')}
            width={50}
            height={50}
            borderRadius={25}
          />
          <View marginLeft={10}>
            <Text fontSize={16} color="$black" fontWeight="bold">
              Kampus
            </Text>
            <Text fontSize={14} color="$gray">
              Username
            </Text>
            <Text fontSize={14} color="$gray">
              Prodi
            </Text>
          </View>
        </View>

        <Text fontSize={14} color="$gray">
          Joined Date
        </Text>
      </View>

      <View flexDirection="row" justifyContent="center" marginVertical={10}>
        <Text fontSize={16} fontWeight="bold" marginHorizontal={20} textDecorationLine="underline">
          Profile
        </Text>
        <Text fontSize={16} marginHorizontal={20} color="$gray">
          Posts
        </Text>
        <Text fontSize={16} marginHorizontal={20} color="$gray">
          Comments
        </Text>
      </View>
    </View>
  )
}
