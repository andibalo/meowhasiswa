import { Pressable } from 'react-native'
import { Text, View, XStack, Avatar } from 'tamagui'
import { ISubThread } from 'types/model/subthread'

interface ISelectSubThreadItemProps {
    subthread: ISubThread
    onPress: (subthread: ISubThread) => void
}

export const SelectSubThreadItem = (props: ISelectSubThreadItemProps) => {
    const subthread = props.subthread

    return (
        <View key={subthread.id}>
            <Pressable onPress={() => props.onPress(subthread)}>
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
                            src={subthread.image_url}
                            objectFit="contain"
                        />
                        <Avatar.Fallback backgroundColor="$secondary" />
                    </Avatar>
                    <View>
                        <Text fontWeight="bold">m/{subthread.name}</Text>
                        <Text>{subthread.followers_count} followers</Text>
                    </View>
                </XStack>
            </Pressable>
        </View>
    )
}