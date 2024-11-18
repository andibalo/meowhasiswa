import { useNavigation } from 'expo-router'
import { Pressable } from 'react-native'
import { Avatar, Separator, Text, View, XStack } from 'tamagui'
import { ISubThreadItem } from 'types/model'

const testData: ISubThreadItem[] = [
    {
        id: "c1a2f145-d7cb-4c2a-80e4-937de53697c1",
        name: "LoveLife",
        imageUrl: "https://registrasi.untar.ac.id/assets/images/logo_untar.png",
        followersCount: 123
    },
    {
        id: "7a1311cd-a25e-4270-84e7-7d37774502cf",
        name: "Perkuliahan",
        imageUrl: "https://registrasi.untar.ac.id/assets/images/logo_untar.png",
        followersCount: 123
    }
]

export default function SelectSubThreadScreen() {

    const navigation = useNavigation()

    const handleOnPressItem = (subthread: ISubThreadItem) => {
        //@ts-ignore
        navigation.navigate("thread/create-thread", {
            ...subthread
        })
    }

    return (
        <View flex={1} p={'$3'} pb="0" bg="$background">
            {
                testData.map(subthread => (
                    <View key={subthread.id}>
                        <Pressable onPress={() => handleOnPressItem(subthread)}>
                            <XStack alignItems="center">
                                <Avatar
                                    borderRadius={"$2"}
                                    borderWidth="$1"
                                    borderColor="$primary"
                                    marginRight="$2"
                                    size="$4"
                                >
                                    <Avatar.Image
                                        accessibilityLabel="Cam"
                                        src={subthread.imageUrl}
                                        objectFit="contain"
                                    />
                                    <Avatar.Fallback backgroundColor="$secondary" />
                                </Avatar>
                                <View>
                                    <Text fontWeight="bold">m/{subthread.name}</Text>
                                    <Text>{subthread.followersCount} followers</Text>
                                </View>
                            </XStack>
                        </Pressable>
                        <Separator my="$2" />
                    </View>
                ))
            }
        </View>
    )
}
