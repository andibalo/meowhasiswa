import { View, Image, YStack, Text } from 'tamagui'

interface INotFoundProps {
    description: string
}

export const NotFound = (props: INotFoundProps) => {

    return (
        <View flex={1} bg="white" alignItems="center" justifyContent="center" >
            <YStack gap="$3" justifyContent="center" >
                <Image
                    source={require("../../assets/images/not-found.jpg")}
                    height={250}
                    objectFit="contain"
                />
                <Text fontSize="$8" textAlign="center">
                    {props.description}
                </Text>
            </YStack>
        </View>
    )
}