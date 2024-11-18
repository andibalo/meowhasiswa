import { View, Image, YStack, Text } from 'tamagui'

export const Error = () => {

    return (
        <View flex={1} bg="$background" alignItems="center" justifyContent="center" >
            <YStack gap="$3" justifyContent="center" >
                <Image
                    source={require("../../assets/images/error.jpg")}
                    height={260}
                    objectFit="contain"
                />
                <Text fontSize="$8" textAlign="center">
                    Something Went Wrong.
                </Text>
            </YStack>
        </View>
    )
}