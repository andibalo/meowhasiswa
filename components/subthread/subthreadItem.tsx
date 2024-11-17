import { Button, Text, View, XStack, YStack, Avatar, } from 'tamagui'
import { ISubThread } from 'types/model/subthread'
interface SubThreadItemProps {
    Subthread: ISubThread
}

export const SubthreadItem = (props: SubThreadItemProps) => {
    const Subthread = props.Subthread

    return (
        <View mb={'$3'} p={'$2'} bg={'$white1'} borderRadius={'$radius.4'} minHeight={120}>
            <XStack  p={'$3'} jc={"space-between"}>
                <XStack flex={1} alignItems="center">
                    <View mr={'$2'}>
                        <Avatar borderRadius={'$2'} borderWidth="$1" borderColor="$primary" size="$4">
                            <Avatar.Image
                                accessibilityLabel="Cam"
                                src={Subthread.university_image_url}
                                objectFit="contain"
                            />
                            <Avatar.Fallback backgroundColor="$secondary" />
                        </Avatar>
                    </View>
                    <View flex={1}>
                        <XStack flex={1} justifyContent='space-between'>
                            <Text color="$primary" fontWeight="bold">m/{Subthread.subthread_name}</Text>
                            <Button bg="$backgroundSoft" padding="$1" borderRadius="$3" width={100} height={24} >
                                <Text fontSize="$2"> Follow </Text>
                            </Button>
                        </XStack>
                        <XStack gap="$2" alignItems="center">
                            <Text color="$primary" fontSize="$3">{Subthread.subthread_follower}</Text>
                        </XStack>
                    </View>
                </XStack>
            </XStack>
            <YStack pr={'$3'} pl={'$3'} pb={'$1.5'} gap="$1">
                <Text color="$primary">
                    {Subthread.subthread_description}
                </Text>
            </YStack>
        </View>
    )
}