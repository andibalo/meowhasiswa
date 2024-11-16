import { MessageSquare, ThumbsDown, ThumbsUp } from '@tamagui/lucide-icons'
import { Text, View, XStack, YStack, Avatar, Separator } from 'tamagui'
import { IThread } from 'types/model/thread'
import dayjs from 'dayjs'
interface SubmeowItemProps {
    thread: IThread
}

export const ThreadItem = (props: SubmeowItemProps) => {
    const thread = props.thread

    return (
        <View mb={'$3'} p={'$2'} bg={'$white1'} borderRadius={'$radius.4'} minHeight={300}>
            <YStack flex={1} justifyContent="space-between">
                <View>
                    <XStack p={'$3'} jc={"space-between"}>
                        <View>
                            <XStack alignItems="center">
                                <View mr={'$2'}>
                                    <Avatar borderRadius={'$2'} borderWidth="$1" borderColor="$primary" size="$4">
                                        <Avatar.Image
                                            accessibilityLabel="Cam"
                                            src={thread.university_image_url}
                                            objectFit="contain"
                                        />
                                        <Avatar.Fallback backgroundColor="$secondary" />
                                    </Avatar>
                                </View>
                                <YStack gap="$1">
                                    <XStack gap="$2">
                                        <Text color="$primary" fontWeight="bold">{thread.university_abbreviated_name}</Text>
                                        <Text color="$secondary">{thread.username}</Text>
                                    </XStack>
                                    <XStack gap="$2" alignItems="center">
                                        <Text color="$primary" fontSize="$3">{dayjs(thread.created_at).format("YYYY-MM-DD")}</Text>
                                        <View bg="#4E96EB" px="$2" py="$1" borderRadius="$1">
                                            <Text color="white" fontSize="$2">{`m/${thread.subthread_name}`}</Text>
                                        </View>
                                    </XStack>
                                </YStack>
                            </XStack>
                        </View>
                    </XStack>
                    <YStack pr={'$3'} pl={'$3'} pb={'$1.5'} gap="$1">
                        <Text color="$primary" fontSize={'$6'} fontWeight="bold" >
                            {thread.title}
                        </Text>
                        <Text color="$primary">
                            {thread.content}
                        </Text>
                    </YStack>
                    <View px="$3">
                        <Separator marginVertical="$2" />
                    </View>
                    <View p={'$3'} pt={'$1.5'} pb={'$1.5'}>
                        <Text color="$primary">TLDR</Text>
                    </View>
                    <View p={'$3'} pt={'$1.5'}>
                        <Text color="$primary">{thread.content_summary}</Text>
                    </View>
                </View>
                <XStack pl={'$3'} pr={'$3'} pb={'$3'} gap={'$5'}>
                    <XStack ai={'center'}>
                        <ThumbsUp />
                        <Text ml={'$2'}>{thread.like_count}</Text>
                    </XStack>
                    <XStack ai={'center'}>
                        <ThumbsDown />
                        <Text ml={'$2'}>{thread.dislike_count}</Text>
                    </XStack>
                    <XStack ai={'center'}>
                        <MessageSquare />
                        <Text ml={'$2'}>{thread.comment_count}</Text>
                    </XStack>
                </XStack>
            </YStack>
        </View>
    )
}